import { IAbstractComponentProps } from "@shared/Core/render_core/components/AbstractComponent"
import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent"
import { IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state"
import { useEffect, useMemo, useState } from "react"
import { ChatMessageSchema } from "@shared/ChatCommon/schemas/ChatMessageSchema"
import { StateChangesSubsriber } from "@shared/Core/common/state/StateChangesSubsriber"
import { StateKeyChangesSubsriber } from "@shared/Core/common/state/StateKeyChangesSubscriber"
import { ChatSchema } from "@shared/ChatCommon/schemas/ChatSchema"
import { ChatMessagesSubsriber } from "@shared/ChatCommon/subscribers/ChatMessagesSubsriber"
import ChatMessage from "./ui/ChatMessage.component"

export default function ChatRenderComponent (props: IAbstractComponentProps<IChatWindowState>) {
	return () => {
		const { subscribeToStateChanges, subscribeToStateKeyChanges } = props

		const [currentChat, setCurrentChat] = useState<ChatSchema | null>(null)
		const [messages, setChatMessages] = useState<ChatMessageSchema[]>([])

		const chatMessagesSubsriber = useMemo(() => new ChatMessagesSubsriber(setChatMessages), [])

		useLifeCycleComponent(
			props,
			() => {
				subscribeToStateChanges(new StateChangesSubsriber((state) => {
					setCurrentChat(state.selectedChat)
				}))
				subscribeToStateKeyChanges(new StateKeyChangesSubsriber('selectedChat', setCurrentChat))
			}
		)

		useEffect(() => {
			if (currentChat !== null) currentChat.subsribe(chatMessagesSubsriber)
			return () => currentChat?.unsubsribe(chatMessagesSubsriber)
		}, [currentChat, chatMessagesSubsriber])

		if (currentChat === null) return <>nothing here</>
		return (
			<div className="chat_container">
				<div className="chat_container__messages">
					{ messages.map((message) => <ChatMessage message={message} />) }
				</div>
			</div>
		)
	}
}