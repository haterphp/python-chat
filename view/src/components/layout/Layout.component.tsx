import { lazy } from "react";
import { ILayoutProps } from "./Layout.props";
import { SIDEBAR_WIDTH } from "@/constants.ts";

const LeftSidebar = lazy(() => import("../left-sidebar/LeftSidebar.component.tsx"))

function loadChatDependencies (): Promise<ILayoutProps> {
	return new Promise<ILayoutProps>((resolve) => {
		setTimeout(resolve, 3000, { projectTitle: "Python chat 123" } as ILayoutProps)
	})
}

const LayoutFabric = ({ projectTitle }: ILayoutProps) => (): JSX.Element => {
	return (
		<div className="layout">
			<div className="layout-container">
				<LeftSidebar width={SIDEBAR_WIDTH} />

				<div className="chat">
					<h1>{projectTitle}</h1>
				</div>
			</div>
		</div>
	)
}

const Layout = lazy(() => loadChatDependencies().then((data) => ({
	default: LayoutFabric(data)
})))

export default Layout