import { lazy, Suspense } from "react"
import Layout from '@/components/layout/Layout.component'
import Sandbox from "./components/_sandbox/Sandbox.component"

const LoaderScreen = lazy(() => import('@/components/loader/LoaderScreen.component'))

function App() {
	return (
		<>
			{/* <Suspense fallback={<LoaderScreen height="100vh" />}>
				<Layout/>
			</Suspense> */}

			<Sandbox />
		</>
	)
}

export default App
