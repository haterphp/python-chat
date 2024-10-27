import { ChatSchema } from "@shared/ChatCommon/schemas/ChatSchema";
import type { IHttpRequest } from "@shared/Core/data/api/HttpRequestHandler"
import { AppHttpRequestHandler } from "@shared/Core/data/api/HttpRequestInstances";

interface IChatServerPayload {
	id: number
	name: string
}

export class GetAllChatsRequest implements IHttpRequest<never, ChatSchema[]> {
	public async execute(): Promise<ChatSchema[]> {
		const data = await AppHttpRequestHandler.get<ChatSchema[]>('chats')
		return Promise.all(data.map(this.__transformObjectToSchema.bind(this)))
	}

	private async __transformObjectToSchema(payload: IChatServerPayload): Promise<ChatSchema> {
		return ChatSchema.new({ id: payload.id, name: payload.name})
	}
}