import 'reflect-metadata'
import 'es6-shim'

import ApplicationRouter from '@shared/router/routers/ApplicationRouter.tsx'
import Application from '@shared/application/Application.ts'

import '@app/styles/index.scss'

declare global {
    interface Window { Application: Application; }
}

const root = document.getElementById('root')

if (root !== null) {

	window.Application = new Application(ApplicationRouter, root)
	window.Application.mount()
}
