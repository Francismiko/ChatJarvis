import { component$ } from '@builder.io/qwik'

export default component$(() => {
	return (
		<div class="flex flex-col w-full h-ful">
			<div class="h-[90vh] overflow-y-auto">
				<div class="h-[200vh] mx-[15vw]"></div>
			</div>
			<div class="h-[10vh]">
				<input class="w-full" />
			</div>
		</div>
	)
})
