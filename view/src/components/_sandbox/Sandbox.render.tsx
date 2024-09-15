import { IAbstractComponentProps } from "@/data/common/components/presenters/CommonPresenter";
import { FC, useEffect } from "react";

export default function SandboxRenderComponent(props: IAbstractComponentProps): FC {
	return () => {

		useEffect(() => {
			props.mount()
			return props.unmount
		})

		return (
			<>
				<h1>Sandbox</h1>

				<ul>
					<li>Test</li>
				</ul>
			</>
		)
	}
}