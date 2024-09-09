import { GetAllChatRequests } from "@/data/chats/requests/GetAllChatsRequest"
import { lazy, Suspense, useMemo } from "react"
import { IMenuProps } from "./Menu.props"

const LoaderScreen = lazy(() => import('@/components/loader/LoaderScreen.component'))

const MenuFactory = ({ chats }: IMenuProps) => (): JSX.Element => {
	console.log(chats)
	return (
		<>
			{ chats.map((chat) => <div>{chat.id} - {chat.name}</div>) }
		</>
	)
}

const MenuComponent = lazy(() => new GetAllChatRequests()
										.execute()
										.then((chats) => ({ default: MenuFactory({ chats }) })))

export default function Menu() {
	return (
		<Suspense fallback={<LoaderScreen/>}>
			<MenuComponent />
		</Suspense>
	)
}