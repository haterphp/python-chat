interface IHttpRequest<TPort, TResponse = void> {
	execute(port: TPort): Promise<TResponse>
}

export type { IHttpRequest }