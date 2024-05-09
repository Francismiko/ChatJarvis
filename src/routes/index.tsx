import { component$, useSignal } from '@builder.io/qwik'

export default component$(() => {
	const rows = useSignal<number>(1)

	return (
		<div class="flex flex-col w-full max-h-full">
			<div class="flex-1  overflow-y-auto">
				<div class="h-[200vh] mx-[15vw]">123</div>
			</div>
			<div class="min-h-[10vh] w-[100vw]">
				<textarea
					onInput$={({ target }) => {
						rows.value = (target as HTMLTextAreaElement).value.split(
							'\n',
						).length
					}}
					rows={rows.value}
					class="block resize-none w-[50vw] mx-auto max-h-[25vh] h-auto border"
				/>
			</div>
		</div>
	)
})
