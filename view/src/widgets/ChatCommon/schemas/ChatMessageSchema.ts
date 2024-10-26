import { BaseSchema } from "@shared/data/schema/BaseSchema";

interface ICreateChatMessagePayload {
	id: number
	content: string
}

export class ChatMessageSchema extends BaseSchema<number> {
	protected __content: string

	public get content(): string {
		return this.__content
	}

	protected constructor(payload: ICreateChatMessagePayload) {
		super(payload.id)
		this.__content = payload.content
	}

	public static async new(payload: ICreateChatMessagePayload) {
		const schema = new ChatMessageSchema(payload)
		await schema.validate()

		return schema
	}
}