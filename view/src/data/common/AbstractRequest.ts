import { validateOrReject } from 'class-validator'


export type AbstractRequestPort = Record<string, string | number | boolean>

export abstract class AbstractRequest<TPort extends AbstractRequestPort, TResponse> {
	protected abstract _action(port?: TPort): Promise<TResponse>

	public async execute(port?: TPort): Promise<TResponse> {
		try {
			if (typeof port === 'object') validateOrReject(port)
			return this._action(port).then((response) => response)
		} catch (error) {
			console.log(error)
			throw new Error('Validation error')
		}
	}
}