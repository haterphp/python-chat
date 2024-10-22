interface IClassLifeCycle {
	mount(payload?: unknown): void | Promise<void>
	unmount(payload?: unknown): void | Promise<void>

	beforeMount?(payload?: unknown): void | Promise<void>
	afterMount?(payload?: unknown): void | Promise<void>
}

export type { IClassLifeCycle }