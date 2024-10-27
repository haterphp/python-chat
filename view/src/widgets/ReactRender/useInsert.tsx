import { ReactComponent } from "@shared/Core/render_core/components/ReactComponent"
import { renderReactComponent } from "@shared/Core/render_core/render"
import { RefObject, useEffect, useRef } from "react"

// TODO: renderReactComponent add to props
export const useInsert = (component: ReactComponent<any, any, any, any>): RefObject<HTMLDivElement> => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let unmountCallback: Function | null = null
		if (ref.current) unmountCallback = renderReactComponent(ref.current, component)

		return () => {
			unmountCallback?.()
		}
	}, [ref.current])

	return ref
}