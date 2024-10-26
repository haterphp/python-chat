import { EventEmitterSubsriber } from "./EventEmitterSubsriber"


class EventEmitter<TSubsriberNames extends string = string> {
	private __subscribers: EventEmitterSubsriber[]

	constructor () {
		this.__subscribers = []
	}

	public subscribe(subscriber: EventEmitterSubsriber): void {
		this.__subscribers.push(subscriber)
	}

	public unsubscribe(subscriber: EventEmitterSubsriber): void {
		this.__subscribers = this.__subscribers.filter((s) => s !== subscriber)
	}

	public unsubscribeAllChilds(): void {
		for (const subscriber of this.__subscribers) {
			this.unsubscribe(subscriber)
		}
	}

	public emit(subscriberName: TSubsriberNames, payload?: any): void {
		for (const subscriber of this.__subscribers) {
			if (subscriber.name === subscriberName) {
				subscriber.action(payload)
			}
		}
	}
}

export { EventEmitter }