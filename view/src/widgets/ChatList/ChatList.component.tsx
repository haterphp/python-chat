import { lazy, Suspense } from "react"

import ChatListSkeleton from "./ui/ChatListSkeleton.component"

import { ChatListPresenter } from "./model/ChatList.presenter"
import { ChatListState } from "./model/ChatList.state"
import { ChatListData } from "./model/ChatList.data"


const chatListState = new ChatListState()
const chatListData = new ChatListData()

const ChatListComponentWrapper = lazy(() => new ChatListPresenter(chatListState, chatListData).render())

export default function ChatList() {
	return (
		<Suspense fallback={<ChatListSkeleton />}>
			<ChatListComponentWrapper />
		</Suspense>
	)
}