import { HttpRequestService } from "./HttpRequestService";

const AppHttpRequestHandler = new HttpRequestService({
	baseURL: 'http://localhost:8000/api'
})

export { AppHttpRequestHandler }