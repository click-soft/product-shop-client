import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  server: {
    port: 3001,
  },
  // build: {
  //   minify: 'terser',
  //   terserOptions: {
  //     compress: {
  //       drop_console: true,
  //       drop_debugger: true,
  //     },
  //   },
  // },
  // esbuild: {
  //   define: { DEBUG: false },
  //   drop: ['console', 'debugger'],
  // },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //   },
  // },
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
