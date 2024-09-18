import { IAbstractComponentProps } from "@data/common/components/Presenter";
import { ISandboxStateObject } from "@pages/_sandbox/model/Sandbox.state";
import { FC, FormEvent, useEffect, useState } from "react";

export default function SandboxRenderComponent(props: IAbstractComponentProps<ISandboxStateObject>): FC {
	return () => {

		const { callAction, subscribeToStateChanges, subscribeToStateKeyChanges } = props

		const [data, setData] = useState<ISandboxStateObject['data']>([])

		const listenStateChange = (state: ISandboxStateObject): void => {
			if (state.data.length > 0) setData(state.data)
		}

		useEffect(() => {
			subscribeToStateChanges(listenStateChange)
			subscribeToStateKeyChanges('data', setData)

			props.mount()
			return props.unmount
		}, [])

		const handleOnSubmit = (event: FormEvent) => {
			event.preventDefault()

			const $itemInput = event.currentTarget.getElementsByTagName('input')[0]
			callAction('PUSH_NEW_ITEM_TO_DATA', $itemInput.value)
			$itemInput.value = ''
		}

		return (
			<>
				<h1>Sandbox</h1>

				<form style={{ display: "flex", gap: 3 }} onSubmit={handleOnSubmit}>
					<input type="text" name="item"/>

					<button type="submit">Append</button>
				</form>

				<ol>
					{data.map(item => <li key={item}>{item}</li>)}
				</ol>
			</>
		)
	}
}