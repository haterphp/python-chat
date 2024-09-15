import { SandboxComponentData } from "@/data/sandbox/Sandbox.data"
import { SandboxComponentPresenter } from "@/data/sandbox/Sandbox.presenter"
import { SandboxComponentState } from "@/data/sandbox/Sandbox.state"
import { lazy, Suspense } from "react"
import LoaderScreen from "../loader/LoaderScreen.component"

const data = new SandboxComponentData()
const state = new SandboxComponentState()

const SandboxComponentWrapper = lazy(() => new SandboxComponentPresenter(state, data).render())

export default function Sandbox() {
	return (
		<Suspense fallback={<LoaderScreen></LoaderScreen>}>
			<SandboxComponentWrapper />
		</Suspense>
	)
}