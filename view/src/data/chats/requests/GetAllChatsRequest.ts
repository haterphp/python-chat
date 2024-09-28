import axios from "axios";
import { AbstractRequest } from "@shared/data/AbstractRequest";
import { sleepResolve } from "@shared/helpers";
import { ChatSchema } from "../schemas/ChatSchema";

export class GetAllChatRequests extends AbstractRequest<{}, ChatSchema[]> {
	protected async _action(): Promise<ChatSchema[]> {
		return axios.get('http://localhost:8000/api/chats')
			.then(({ data }) => {
				return (data as []).map((item) => ChatSchema.new(item))
			})
			.then((data) => sleepResolve(500, Promise.all(data)))
	}
}