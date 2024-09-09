import { AbstractRequest } from "@/data/common/AbstractRequest";
import { ChatSchema } from "../schemas/ChatSchema";

export class GetAllChatRequests extends AbstractRequest<{}, ChatSchema[]> {
	protected _action(): Promise<ChatSchema[]> {
		return new Promise((resolve) => {
			setTimeout(resolve, 2000, Promise.all([
				ChatSchema.new({ id: 1, name: "Test 1" })
			]))
		})
	}
}