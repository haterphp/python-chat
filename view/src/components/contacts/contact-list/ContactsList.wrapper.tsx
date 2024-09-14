import { lazy, Suspense } from "react"
import { ContactsListDataComponentFabric, ContactsListComponentPresenter } from "./ContactsList.presenter"
import { ComponentWrapper } from "../../common/components/ComponentWrapper"
import LoaderScreen from "../../loader/LoaderScreen.component"

const contactsListDataComponentFabric = new ContactsListDataComponentFabric()
const contactsListComponentPresenter = new ContactsListComponentPresenter()

const ContactsListComponent = lazy(() => new ComponentWrapper(contactsListComponentPresenter, contactsListDataComponentFabric).render())

export default function ContactsList() {
	return (
		<Suspense fallback={<LoaderScreen />}>
			<ContactsListComponent />
		</Suspense>
	)
}