import { $, component$, useSignal } from '@builder.io/qwik'
import { isEmpty, trim } from 'radash'

export default component$(() => {
	const textareaRef = useSignal<HTMLTextAreaElement>()
	const rows = useSignal<number>(1)
	const text = useSignal<string>('')

	const handleInput = $(() => {
		if (!textareaRef.value) return
		rows.value = textareaRef.value.value.split('\n').length
		text.value = textareaRef.value.value
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
		<div class="flex flex-col w-full max-h-full">
			<div class="flex-1  overflow-y-auto">
				<div class="h-[200vh] mx-[15vw]">123</div>
			</div>
			<div class="min-h-[10vh] w-[100vw]">
				<textarea
					ref={textareaRef}
					onInput$={handleInput}
					onKeyDown$={handleKeydown}
					rows={rows.value}
					value={text.value}
					class="block resize-none w-[50vw] mx-auto max-h-[25vh] h-auto border"
				/>
			</div>
		</div>
	)
})
