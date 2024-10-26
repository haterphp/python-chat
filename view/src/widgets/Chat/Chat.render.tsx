import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent"
import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent"
import { IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state"
import { useEffect, useMemo, useState } from "react"
import { ChatMessageSchema } from "@widgets/ChatCommon/schemas/ChatMessageSchema"
import { StateChangesSubsriber } from "@shared/common/state/StateChangesSubsriber"
import { StateKeyChangesSubsriber } from "@shared/common/state/StateKeyChangesSubscriber"
import { ChatSchema } from "@widgets/ChatCommon/schemas/ChatSchema"
import { ChatMessagesSubsriber } from "@widgets/ChatCommon/subscribers/ChatMessagesSubsriber"

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
		return <>{messages.map((m) => m.content).join(', ')}</>
	}
}