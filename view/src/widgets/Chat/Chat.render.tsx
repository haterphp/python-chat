import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent"
import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent"
import { IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state"
import { useEffect, useState } from "react"
import { ChatSchema } from "@widgets/ChatCommon/ChatSchema"
import { ChatMessageSchema } from "@widgets/ChatCommon/ChatMessageSchema"

export default function ChatRenderComponent (props: IAbstractComponentProps<IChatWindowState>) {
	return () => {
		const { subscribeToStateChanges, subscribeToStateKeyChanges } = props

		const [currentChat, setCurrentChat] = useState<ChatSchema | null>(null)
		const [messages, setChatMessages] = useState<ChatMessageSchema[]>([])

		useLifeCycleComponent(
			props,
			() => {
				subscribeToStateChanges((state) => {
					setCurrentChat(state.selectedChat)
				})
				subscribeToStateKeyChanges('selectedChat', setCurrentChat)
			}
		)

		// useEffect(() => {
		// 	if (currentChat !== null) {
		// 		currentChat.observer.observeKey('messages', (messages) => console.log(messages))
		// 	}
		// }, [currentChat])

		if (currentChat === null) return <>nothing here</>
		return <>{currentChat.id}</>
	}
}