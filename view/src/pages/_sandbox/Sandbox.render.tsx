import { IAbstractComponentProps } from "@shared/Core/render_core/components/AbstractComponent"
import { FC } from "react"
import { useLifeCycleComponent } from "@widgets/ReactRender/useLifeCycleComponent"

export default function (props: IAbstractComponentProps<{}>): FC {
	return () => {
		useLifeCycleComponent(props)

		return (
			<>
				sandbox

				<div style={{ maxWidth: 350, width: "100%" }}>
					{/* {useInsert(new ChatListComponent())} */}
				</div>
			</>
		)
	}
}