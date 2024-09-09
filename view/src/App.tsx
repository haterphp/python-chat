import { lazy, Suspense } from "react"
import Layout from '@/components/layout/Layout.component'

const LoaderScreen = lazy(() => import('@/components/loader/LoaderScreen.component'))

function App() {
	return (
		<>
			<Suspense fallback={<LoaderScreen height="100vh" />}>
				<Layout/>
			</Suspense>
		</>
	)
}

export default App
