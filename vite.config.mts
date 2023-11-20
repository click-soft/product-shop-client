import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

// export default defineConfig({
// 	plugins: [react(), svgrPlugin()],
// 	server: {
// 		port: 3001,
// 	},
// 	resolve: {
// 		alias: {
// 			"@": path.resolve(__dirname, "./src"),
// 		},
// 	},
// });
