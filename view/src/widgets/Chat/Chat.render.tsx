import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent"
import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent"
import { IChatWindowState } from "@pages/ChatWindow/model/ChatWindow.state"
import { useEffect, useState } from "react"
import { ChatSchema } from "@widgets/ChatCommon/ChatSchema"
import { ChatMessageSchema } from "@widgets/ChatCommon/ChatMessageSchema"
import { StateChangesSubsriber } from "@shared/common/state/StateChangesSubsriber"
import { StateKeyChangesSubsriber } from "@shared/common/state/StateKeyChangesSubscriber"

export default function ChatRenderComponent (props: IAbstractComponentProps<IChatWindowState>) {
	return () => {
		const { subscribeToStateChanges, subscribeToStateKeyChanges } = props

		const [currentChat, setCurrentChat] = useState<ChatSchema | null>(null)
		const [messages, setChatMessages] = useState<ChatMessageSchema[]>([])

		useLifeCycleComponent(
			props,
			() => {
				subscribeToStateChanges(new StateChangesSubsriber((state) => {
					setCurrentChat(state.selectedChat)
				}))
				subscribeToStateKeyChanges(new StateKeyChangesSubsriber('selectedChat', setCurrentChat))
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