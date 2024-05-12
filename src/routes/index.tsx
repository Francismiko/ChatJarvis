import { $, component$, useSignal } from '@builder.io/qwik'
import { isEmpty, trim } from 'radash'

export default component$(() => {
	const textareaRef = useSignal<HTMLTextAreaElement>()
	const rows = useSignal<number>(1)
	const text = useSignal<string>('')

	const handleInput = $(() => {
		if (!textareaRef.value) return
		text.value = textareaRef.value.value
		rows.value = text.value.split('\n').length
	})

	const handleKeydown = $((event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			if (
				isEmpty(trim(text.value, '\n ')) ||
				!textareaRef.value ||
				event.shiftKey
			) {
				return
			}
			event.preventDefault()
			text.value = ''
			rows.value = 1
		}
	})

	return (
		<div class="flex flex-col w-full h-full">
			<header class="h-[8vh]" />
			<main class="flex-1 overflow-y-auto">
				<div class="h-[200vh] mx-[30vw] color-white">123</div>
			</main>
			<textarea
				ref={textareaRef}
				onInput$={handleInput}
				onKeyDown$={handleKeydown}
				rows={rows.value}
				value={text.value}
				class="block resize-none w-xl mx-auto max-h-[25vh] border"
			/>
			<footer>
				<div class="h-[5vh]" />
			</footer>
		</div>
	)
})
