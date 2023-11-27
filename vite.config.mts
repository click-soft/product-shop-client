import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), sentryVitePlugin({
    org: "efdb1838adbc",
    project: "javascript-react"
  })],

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
  server: {
    port: 3001,
  },

  build: {
    sourcemap: true
  }
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