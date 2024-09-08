import { lazy, Suspense } from "react"
import {loadChatLayout} from '@/components/layout/Layout'

const LayoutLoader = lazy(() => import('@/components/layout/LayoutLoader.tsx'))
const Layout = lazy(() => loadChatLayout(import('@/components/layout/Layout.tsx')))

function App() {
	return (
		<>
			<Suspense fallback={<LayoutLoader />}>
				<Layout/>
			</Suspense>
		</>
	)
}

export default App
