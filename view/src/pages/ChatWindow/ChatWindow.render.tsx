import { IAbstractComponentProps } from "@shared/Core/render_core/components/AbstractComponent"
import { useInsert } from "@widgets/ReactRender/useInsert"
import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent"
import { IChatWindowComponentProps } from "./ChatWindow.component"
import { IChatWindowState } from "./model/ChatWindow.state"

export default function ChatWindowRenderComponent (props: IAbstractComponentProps<IChatWindowState, IChatWindowComponentProps>) {
	return () => {
		useLifeCycleComponent(props)

		const sidebarRef = useInsert(props.ChatWindowListComponent)
		const contentRef = useInsert(props.ChatComponent)

		return (
			<div className="chat_window_layout">
				<div className="chat_window_layout__container">

					{/* Right sidebar */}
					<div className="chat_window_layout__sidebar" ref={sidebarRef} />

					{/* Chat */}
					<div className="chat_window_layout__content" ref={contentRef} />
				</div>
			</div>
		)
	}
}