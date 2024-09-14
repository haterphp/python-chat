import { ICommonComponentProps, useLoadComponentData } from "../common/components/Component";
import { FC } from "react";
import { MenuListenDataTransationPayload } from "./Menu.presenter";

interface IMenuProps extends ICommonComponentProps<MenuListenDataTransationPayload> {}

export default function MenuComponent(props: IMenuProps): FC {
	return () => {
		const data = useLoadComponentData(props)

		return (
			<div>
				<h1>Menu</h1>
				<ul>
					{ data.map((schema) => <li>{schema.id} - {schema.name}</li>) }
				</ul>
			</div>
		)
	}
}