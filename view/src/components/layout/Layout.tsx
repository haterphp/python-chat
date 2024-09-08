import { ComponentType } from "react";

export function loadChatLayout (promise: Promise<{ default: ComponentType<any>; }>) {
	return new Promise((resolve) => {
		setTimeout(resolve, 3000)
	}).then(() => promise)
}

export default function Layout(){
	return <>Layout</>
}