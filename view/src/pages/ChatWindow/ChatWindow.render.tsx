import ApplicationRouter, { ApplicationRoutes } from "@shared/router/routers/ApplicationRouter"
import { IAbstractComponentProps } from "../../shared/common/Presenter"
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
					<div className="chat_window_layout__content">
						<button onClick={() => ApplicationRouter.navigate(ApplicationRoutes.SANDBOX)}>To sandbox</button>
					</div>
				</div>
			</div>
		)
	}
}