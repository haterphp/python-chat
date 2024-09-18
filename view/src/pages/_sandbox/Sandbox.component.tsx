import { SandboxComponentData } from "./model/Sandbox.data"
import { SandboxComponentPresenter } from "./model/Sandbox.presenter"
import { SandboxComponentState } from "./model/Sandbox.state"

import { lazy, Suspense } from "react"

const data = new SandboxComponentData()
const state = new SandboxComponentState()

const SandboxComponentWrapper = lazy(() => new SandboxComponentPresenter(state, data).render())

export default function Sandbox() {
	return (
		<Suspense>
			<SandboxComponentWrapper />
		</Suspense>
	)
}