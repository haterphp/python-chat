import { ReactNode, useMemo, useState } from "react";
import { CommonRouter } from "./Router";
import { useLifeCycleComponent } from "@widgets/LifeCycle/useLifeCycleComponent";
import { IRoute } from "./Router.state";

export const useRouter = (router: CommonRouter): ReactNode => {
	const [currentRoute, setCurrentRoute] = useState<IRoute | null>(null)

	const beforeMount = () => {
		router.onRouteChanged(setCurrentRoute)
	}

	useLifeCycleComponent(router, { beforeMount })

	const RenderComponent = useMemo(() => {
		if (currentRoute === null) return null
		return currentRoute.component
	}, [currentRoute])

	return RenderComponent
}