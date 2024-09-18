import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
	alias: {
	  '@app': path.resolve(__dirname, 'src/app'),
	  '@shared': path.resolve(__dirname, 'src/shared'),
	  '@widgets': path.resolve(__dirname, 'src/widgets'),
	  '@data': path.resolve(__dirname, 'src/data'),
	  '@pages': path.resolve(__dirname, 'src/pages'),
	}
  }
})
