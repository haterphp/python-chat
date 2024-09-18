import { ReactNode, useEffect, useState } from "react";
import { CommonRouter } from "./Router";
import { useLifeCycleComponent } from "@widgets/LifeCycle/useLifeCycleComponent";

export const useRouter = (router: CommonRouter): ReactNode => {
	const [currentRoute, setCurrentRoute] = useState(router.getCurrentRoute())

	useLifeCycleComponent(router)

	useEffect(() => {
		router.onRouteChanged(setCurrentRoute)
	}, [router, setCurrentRoute])

	return currentRoute
}