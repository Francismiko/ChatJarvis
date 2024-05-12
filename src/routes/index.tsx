import { $, component$, useSignal, useStore } from '@builder.io/qwik'
import { isEmpty, trim, uid } from 'radash'
import { ChatOllama } from '@langchain/community/chat_models/ollama'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { perf } from '@/utils/performance'

export default component$(() => {
	const messages = useStore<string[]>([])
	const textareaRef = useSignal<HTMLTextAreaElement>()
	const rows = useSignal<number>(1)
	const text = useSignal<string>('')

	const handleInput = $(() => {
		if (!textareaRef.value) return
		text.value = textareaRef.value.value
		rows.value = text.value.split('\n').length
	})

	const handleKeydown = $(async (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			if (
				isEmpty(trim(text.value, '\n ')) ||
				!textareaRef.value ||
				event.shiftKey
			) {
				return
			}
			event.preventDefault()

			const chatModel = perf<ChatOllama>(
				() =>
					new ChatOllama({
						model: 'qwen:0.5b',
						temperature: 1,
					}),
			)
			const outputParser = new StringOutputParser()
			const chain = chatModel.pipe(outputParser)
			const stream = chain.stream(text.value)

			messages.push('')
			text.value = ''
			rows.value = 1

			for await (const chunk of await stream) {
				messages[messages.length - 1] += chunk
			}
		}
	})

	return (
		<div class="flex flex-col w-full h-full">
			<header class="h-[8vh]" />
			<main class="flex-1 overflow-y-auto">
				<div class="h-[200vh] mx-[30vw]">
					{messages.map(msg => (
						<p key={uid(8)} class="color-white">
							{msg}
						</p>
					))}
				</div>
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
