type ISubsriber<TPayload> = (payload?: TPayload) => void

class EventEmitter {
	private __subscribers: Array<[string, ISubsriber<never>]>

	constructor () {
		this.__subscribers = []
	}

	public subscribe<TPayload>(subscriberName: string, subscriberCallback: ISubsriber<TPayload>): void {
		this.__subscribers.push([subscriberName, subscriberCallback])
	}

	public unsubscribe<TPayload>(subscriberName: string, subscriberCallback: ISubsriber<TPayload>): void {
		const subscribersForRemove = this.__subscribers.filter(([name, callback]) => 	subscriberName != name
																						&& subscriberCallback != callback)
		this.__subscribers = subscribersForRemove
	}

	public emit(subscriberName: string, payload?: any): void {
		const subscriberWhoRecieveUpdate = this.__subscribers.filter(([name]) => subscriberName == name)

		for (const [_, subscriberCallback] of subscriberWhoRecieveUpdate) {
			subscriberCallback(payload)
		}
	}
}

export { EventEmitter, type ISubsriber }