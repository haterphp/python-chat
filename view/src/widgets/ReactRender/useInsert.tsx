import { ReactComponent } from "@shared/render_core/components/ReactComponent"
import { renderReactComponent } from "@shared/render_core/render"
import { useEffect, useRef } from "react"

export const useInsert = (component: ReactComponent<any, any, any, any>) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (ref.current) renderReactComponent(ref.current, component)
	}, [ref.current])

	return <div ref={ref} className="component_container"></div>
}