import { IAbstractComponentProps } from "@shared/render_core/components/AbstractComponent"
import ApplicationRouter, { ApplicationRoutes } from "@shared/router/routers/ApplicationRouter"
import { useInsert } from "@widgets/ReactRender/useInsert"
import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent"
import { IChatWindowComponentProps } from "./ChatWindow.component"

export default function ChatWindowRenderComponent (props: IAbstractComponentProps<{}, IChatWindowComponentProps>) {
	return () => {
		useLifeCycleComponent(props)

		return (
			<div className="chat_window_layout">
				<div className="chat_window_layout__container">

					{/* Right sidebar */}
					<div className="chat_window_layout__sidebar">
						{useInsert(props.ChatWindowListComponent)}
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