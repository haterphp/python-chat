import '@app/styles/index.scss'

import ApplicationRouter from '../shared/router/routers/ApplicationRouter'
import { useRouter } from '../shared/router/useRouter'

function App() {
	return useRouter(ApplicationRouter)
}

export default App
