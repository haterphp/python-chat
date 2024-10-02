interface IClassLifeCycle {
	mount(payload?: unknown): void
	unmount(payload?: unknown): void

	beforeMount?(payload?: unknown): void
	afterMount?(payload?: unknown): void
}

export type { IClassLifeCycle }