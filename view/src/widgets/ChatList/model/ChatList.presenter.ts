import { Presenter } from "../../../shared/application/Presenter";

import { ChatListState, IChatListStateObject } from "./ChatList.state";
import { ChatListData } from "./ChatList.data";

export class ChatListPresenter extends Presenter<IChatListStateObject, ChatListState, ChatListData> {}