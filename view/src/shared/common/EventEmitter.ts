type ISubsriber<TPayload> = (payload: TPayload) => void

class EventEmitter<TSubsriberNames extends string = string> {
	private __subscribers: Array<[TSubsriberNames, ISubsriber<any>]>

	constructor () {
		this.__subscribers = []
	}

	public subscribe<TPayload>(subscriberName: TSubsriberNames, subscriberCallback: ISubsriber<TPayload>): void {
		this.__subscribers.push([subscriberName, subscriberCallback])
	}

	public unsubscribe<TPayload>(subscriberName: TSubsriberNames, subscriberCallback: ISubsriber<TPayload>): void {
		const subscribersWithoutRemoved = this.__subscribers.filter(([name, callback]) => 	subscriberName != name
																						&& subscriberCallback != callback)
		this.__subscribers = subscribersWithoutRemoved
	}

	public unsubscribeAllChilds(): void {
		for (const [eventName, callback] of this.__subscribers) {
			this.unsubscribe(eventName, callback)
		}
	}

	public emit(subscriberName: TSubsriberNames, payload: any): void {
		const subscriberWhoRecieveUpdate = this.__subscribers.filter(([name]) => subscriberName == name)

		for (const [_, subscriberCallback] of subscriberWhoRecieveUpdate) {
			subscriberCallback(payload)
		}
	}
}

export { EventEmitter, type ISubsriber }