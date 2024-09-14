import Menu from "../menu/Menu.wrapper";
import { ILeftSidebarProps } from "./LeftSidebar.props";

export default function LeftSidebar(props: ILeftSidebarProps) {
	const { width } = props

	return (
		<div className="left-sidebar" style={{ maxWidth: width }}>
			<Menu/>
		</div>
	)
}