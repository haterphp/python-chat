import 'reflect-metadata'
import 'es6-shim'

import '@app/styles/index.scss'
import {renderReactComponent} from '@shared/render_core/render'
import ChatWindowComponent from '@pages/ChatWindow/ChatWindow.component'
import { ChatSchema } from '@widgets/ChatCommon/ChatSchema'
import { ChatMessageSchema } from '@widgets/ChatCommon/ChatMessageSchema'
import { EventEmitter } from '@shared/common/ee/EventEmitter'
import { State } from '@shared/common/state/State'
import ChatComponent from '@widgets/Chat/Chat.component'
import { ChatWindowState } from '@pages/ChatWindow/model/ChatWindow.state'
import { ChatData } from '@widgets/Chat/model/Chat.data'
import { EventEmitterSubsriber } from '@shared/common/ee/EventEmitterSubsriber'
import ChatListComponent from '@widgets/ChatList/ChatList.component'

declare global {
    // interface Window { Application: Application; }
}

const root = document.getElementById('root')

if (root !== null) {

	renderReactComponent(root, new ChatWindowComponent())

	// window.Application = new Application(ApplicationRouter, root)
	// window.Application.mount()
}