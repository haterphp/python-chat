interface IClassLifeCycle {
	mount(payload?: unknown): void
	unmount(payload?: unknown): void
}

export type { IClassLifeCycle }