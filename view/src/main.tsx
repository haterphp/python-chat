import 'reflect-metadata'
import 'es6-shim'

import '@app/styles/index.scss'
import {renderReactComponent} from '@shared/render_core/render'
import ChatWindowComponent from '@pages/ChatWindow/ChatWindow.component'
import { ChatSchema } from '@widgets/ChatCommon/ChatSchema'
import { ChatMessageSchema } from '@widgets/ChatCommon/ChatMessageSchema'

declare global {
    // interface Window { Application: Application; }
}

const root = document.getElementById('root')

if (root !== null) {

	renderReactComponent(root, new ChatWindowComponent())

	// window.Application = new Application(ApplicationRouter, root)
	// window.Application.mount()
}

// (async function () {
// 	const s = await ChatSchema.new({ id: 1, name: 'name' })

// 	const messages = await Promise.all([
// 		ChatMessageSchema.new({ id: 1, content: 'Content' })
// 	])

// 	s.observer.observeKey('messages', (messages) => console.log(messages))
// 	s.observer.update('messages', messages)
// })()
