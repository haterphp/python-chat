import { lazy, Suspense } from "react"
import { MenuComponentPresenter, MenuDataComponentFabric } from "./Menu.presenter"
import { ComponentWrapper } from "../common/components/ComponentWrapper"
import LoaderScreen from "../loader/LoaderScreen.component"

const menuDataComponentFabric = new MenuDataComponentFabric()
const menuComponentPresenter = new MenuComponentPresenter()

const MenuComponent = lazy(() => new ComponentWrapper(menuComponentPresenter, menuDataComponentFabric).render())

export default function Menu() {
	return (
		<Suspense fallback={<LoaderScreen />}>
			<MenuComponent />
		</Suspense>
	)
}