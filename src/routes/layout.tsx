import { component$, Slot } from '@builder.io/qwik'

export default component$(() => {
	return (
		<main class="h-screen w-screen bg-black">
			<Slot />
		</main>
	)
})
