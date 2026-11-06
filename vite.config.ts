import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src'),
			types: path.resolve(__dirname, '../beer-catalog-backend/types'),
		},
	},
	server: {
		port: 3000,
		open: true,
		proxy: {
			// Mirror CRA's proxy intent if client switches to relative URLs
			'/api': {
				target: 'http://localhost:5000',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	build: {
		outDir: 'build',
	},
});

