export const sleepResolve = async <TData>(duration: number, data: TData): Promise<TData> => {
	return new Promise((resolve) => setTimeout(resolve, duration, data))
}