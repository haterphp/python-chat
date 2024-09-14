import { ICommonComponentProps, useLoadComponentData } from "../../common/components/Component";
import { FC } from "react";
import { ListComponentDataTransactionPayload } from "@/components/common/components/presenters/ListComponentPresenter";
import { ChatSchema } from "@/data/chats/schemas/ChatSchema";

interface IMenuProps extends ICommonComponentProps<ListComponentDataTransactionPayload<ChatSchema>> {}

export default function MenuComponent(props: IMenuProps): FC {
	return () => {
		const data = useLoadComponentData(props)

		const hanleOnClick = () => {
			props.emitAction('button_click', "hello world!")
		}

		return (
			<div>
				<h1>Contacts</h1>
				<ul>
					{ data.map((schema) => <li key={schema.id}>{schema.id} - {schema.name}</li>) }
				</ul>
				<button onClick={hanleOnClick}>Click me!</button>
			</div>
		)
	}
}