import { ReactComponent } from "@shared/render_core/components/ReactComponent"
import { renderReactComponent } from "@shared/render_core/render"
import { useEffect, useRef } from "react"

// TODO: renderReactComponent add to props
export const useInsert = (component: ReactComponent<any, any, any, any>) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let unmountCallback: Function | null = null
		if (ref.current) unmountCallback = renderReactComponent(ref.current, component)

		return () => {
			console.log(unmountCallback)
			unmountCallback?.()
		}
	}, [ref.current])

	return <div ref={ref} className="component_container"></div>
}