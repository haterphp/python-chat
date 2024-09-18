import '@app/styles/index.scss'

import ApplicationRouter from './router/routers/ApplicationRouter'
import { useRouter } from './router/useRouter'

function App() {
	return useRouter(ApplicationRouter)
}

export default App
