import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent"
import ApplicationRouter, { ApplicationRoutes } from "@shared/router/routers/ApplicationRouter"
import ChatListComponent from "@widgets/ChatList/ChatList.component"
import { useInsert } from "@widgets/ReactRender/useInsert"
import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent"

export default function ChatWindowRenderComponent (props: IAbstractComponentProps<{}>) {
	return () => {
		useLifeCycleComponent(props)

		return (
			<div className="chat_window_layout">
				<div className="chat_window_layout__container">

					{/* Right sidebar */}
					<div className="chat_window_layout__sidebar">
						{useInsert(new ChatListComponent())}
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