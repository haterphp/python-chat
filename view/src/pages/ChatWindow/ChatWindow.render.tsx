import { IAbstractComponentProps } from "@data/common/components/Presenter"
import ChatList from "@widgets/ChatList/ChatList.component"

export default function ChatWindowRenderComponent (_: IAbstractComponentProps) {
	return () => {
		return (
			<div className="chat_window_layout">
				<div className="chat_window_layout__container">

					{/* Right sidebar */}
					<div className="chat_window_layout__sidebar">
						<ChatList />
					</div>

					{/* Chat */}
					<div className="chat_window_layout__content"></div>
				</div>
			</div>
		)
	}
}