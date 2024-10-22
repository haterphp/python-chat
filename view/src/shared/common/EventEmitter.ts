type ISubsriber<TPayload> = (payload: TPayload) => void

class EventEmitter<TSubsriberNames extends string = string> {
	private __subscribers: Array<[TSubsriberNames, ISubsriber<any>, any[]]>

	constructor () {
		this.__subscribers = []
	}

	public subscribe<TPayload>(subscriberName: TSubsriberNames, subscriberCallback: ISubsriber<TPayload>, includesValue: any[] = []): void {
		this.__subscribers.push([subscriberName, subscriberCallback, includesValue])
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

		console.log(subscriberWhoRecieveUpdate)

		for (const [_, subscriberCallback, includesValue] of subscriberWhoRecieveUpdate) {
			if (includesValue.length > 0) {
				if (includesValue.includes(payload)) subscriberCallback(payload)
				continue
			}
			subscriberCallback(payload)
		}
	}
}

export { EventEmitter, type ISubsriber }