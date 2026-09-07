import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function codeSyncPlugin(): Plugin {
  return {
    name: 'code-sync-plugin',
    configureServer(server) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/sync-to-codebase' && req.method === 'POST') {
          try {
            const chunks: Buffer[] = [];
            req.on('data', (chunk: Buffer) => chunks.push(chunk));
            req.on('end', async () => {
              try {
                const bodyStr = Buffer.concat(chunks).toString('utf-8');
                const parsed = JSON.parse(bodyStr);
                const { influencers, articles } = parsed;

                if (!Array.isArray(influencers)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ error: 'Invalid influencers format' }));
                }

                const publicImagesDir = path.resolve(process.cwd(), 'public/images');
                if (!fs.existsSync(publicImagesDir)) {
                  fs.mkdirSync(publicImagesDir, { recursive: true });
                }

                // Helper to save base64 data to file
                let imageCounter = 0;
                const processImageUrl = (url: string, prefix: string): string => {
                  if (!url || typeof url !== 'string' || !url.startsWith('data:image/')) {
                    return url;
                  }
                  const match = url.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
                  if (!match) return url;

                  let ext = match[1].toLowerCase();
                  if (ext === 'jpeg') ext = 'jpg';
                  const base64Data = match[2];
                  const timestamp = Date.now();
                  const filename = `uploaded_${prefix}_${timestamp}_${++imageCounter}.${ext}`;
                  const filePath = path.join(publicImagesDir, filename);

                  fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
                  return `/images/${filename}`;
                };

                const updatedInfluencers = influencers.map((inf: any) => {
                  const safeId = (inf.id || inf.name || 'creator').replace(/[^a-zA-Z0-9_-]/g, '_');
                  const avatar = processImageUrl(inf.avatar, `${safeId}_avatar`);
                  const coverImage = processImageUrl(inf.coverImage, `${safeId}_cover`);
                  const galleryImages = Array.isArray(inf.galleryImages)
                    ? inf.galleryImages.map((img: string, idx: number) => processImageUrl(img, `${safeId}_g${idx}`))
                    : [];

                  return {
                    ...inf,
                    avatar,
                    coverImage,
                    galleryImages
                  };
                });

                // Update src/data/mockData.ts
                const mockDataPath = path.resolve(process.cwd(), 'src/data/mockData.ts');
                let mockDataContent = fs.readFileSync(mockDataPath, 'utf-8');

                const markerStart = 'export const INITIAL_INFLUENCERS: Influencer[] = ';
                const markerEnd = '\nexport const MAGAZINE_ARTICLES';

                const startIdx = mockDataContent.indexOf(markerStart);
                const endIdx = mockDataContent.indexOf(markerEnd);

                if (startIdx !== -1 && endIdx !== -1) {
                  const jsonStr = JSON.stringify(updatedInfluencers, null, 2);
                  mockDataContent =
                    mockDataContent.substring(0, startIdx + markerStart.length) +
                    jsonStr +
                    ';' +
                    mockDataContent.substring(endIdx);
                  fs.writeFileSync(mockDataPath, mockDataContent, 'utf-8');
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: true,
                    message: '성공적으로 src/data/mockData.ts 및 public/images에 영구 저장되었습니다.',
                    updatedInfluencers
                  })
                );
              } catch (err: any) {
                console.error('Error handling /api/sync-to-codebase body', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), codeSyncPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
