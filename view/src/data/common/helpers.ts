export const sleepResolve = async (duration: number, data: any): Promise<any> => {
	return new Promise((resolve) => setTimeout(resolve, duration, data))
}