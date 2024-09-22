import { lazy, Suspense } from "react"
import { ChatWindowPresenter } from "./model/ChatWindow.presenter"
import { ChatWindowState } from "./model/ChatWindow.state"

const state = new ChatWindowState()
const ChatWindowComponent = lazy(() => new ChatWindowPresenter(state).render())

export default function ChatWindowPage() {
	return (
		<Suspense>
			<ChatWindowComponent />
		</Suspense>
	)
}