import { isFunction } from 'radash'

export const perf = <T = unknown>(arg: unknown): T => {
	if (isFunction(arg)) {
		const startTime = window.performance.now()
		const res = arg()
		const endTime = window.performance.now()
		console.info(`函数执行了${endTime - startTime}毫秒。`)

		// TODO: check promise
		return res
	}

	throw new Error('perf() 只能接受函数作为参数.')
}
