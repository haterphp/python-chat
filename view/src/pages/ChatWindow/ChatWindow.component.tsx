import { lazy } from "react"
import { ChatWindowPresenter } from "./model/ChatWindow.presenter"
import { ChatWindowState } from "./model/ChatWindow.state"

const chatWindowState = new ChatWindowState()
const ChatWindow = lazy(() => new ChatWindowPresenter(chatWindowState).render())

export default ChatWindow