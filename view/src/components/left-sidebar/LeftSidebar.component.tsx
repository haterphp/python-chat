import { ILeftSidebarProps } from "./LeftSidebar.props";
import Menu from "./Menu.component";

export default function LeftSidebar(props: ILeftSidebarProps) {
	const { width } = props

	return (
		<div className="left-sidebar" style={{ maxWidth: width }}>
			<Menu />
		</div>
	)
}