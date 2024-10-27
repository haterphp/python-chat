import { ChatSchema } from "@shared/ChatCommon/schemas/ChatSchema";
import type { IHttpRequest } from "@shared/Core/data/api/HttpRequestHandler"
import { AppHttpRequestHandler } from "@shared/Core/data/api/HttpRequestInstances";
import { ChatMessageSchema } from "../schemas/ChatMessageSchema";

interface IChatMessagesServerPayload {
	id: number
	message: string
}

export class GetAllChatMessagesRequest implements IHttpRequest<ChatSchema['id'], ChatMessageSchema[]> {

	public async execute(id: ChatSchema['id']): Promise<ChatMessageSchema[]> {
		const data = await AppHttpRequestHandler.get<IChatMessagesServerPayload[]>(`chats/${id}`)
		return Promise.all(data.map(this.__transformObjectToSchema.bind(this)))
	}

	private async __transformObjectToSchema(payload: IChatMessagesServerPayload): Promise<ChatMessageSchema> {
		return ChatMessageSchema.new({ id: payload.id, content: payload.message })
	}
}