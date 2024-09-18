const SKELETON_ELEMENTS_COUNT = 30

function ChatListItemSkeleton () {
	return (
		<div className="chats_list__item chats_list__item-skeleton">
			<div className="skeleton skeleton__text"></div>
			<div className="skeleton skeleton__text skeleton__text-small"></div>
		</div>
	)
}

export default function ChatListSkeleton() {
	return (
		<div className="chats_list" style={{ overflow: "hidden" }}>
			{Array	.from({ length: SKELETON_ELEMENTS_COUNT })
					.map((_, i) => <ChatListItemSkeleton key={i} />)}
		</div>
	)
}