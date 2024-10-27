import 'reflect-metadata'
import 'es6-shim'

import '@app/styles/index.scss'
import {renderReactComponent} from '@shared/Core/render_core/render'
import ChatWindowComponent from '@pages/ChatWindow/ChatWindow.component'

declare global {
    // interface Window { Application: Application; }
}

const root = document.getElementById('root')

if (root !== null) {

	renderReactComponent(root, new ChatWindowComponent())

	// window.Application = new Application(ApplicationRouter, root)
	// window.Application.mount()
}