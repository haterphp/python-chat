import 'reflect-metadata'
import 'es6-shim'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './app/App.tsx'
import ApplicationRouter from '@shared/router/routers/ApplicationRouter.tsx'
import Application from '@shared/application/Application.ts'
import { ReactRenderComponentProvider } from '@shared/application/render_providers/ReactRenderComponent.provider.ts'

// createRoot(document.getElementById('root')!).render(
// 	<StrictMode>
// 		<App />
// 	</StrictMode>,
// )

declare global {
    interface Window { Application: Application; }
}

const root = document.getElementById('root')

if (root !== null) {

	window.Application = new Application(ApplicationRouter, new ReactRenderComponentProvider(root), )
	window.Application.mount()
}
