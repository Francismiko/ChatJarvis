import { component$, Slot } from '@builder.io/qwik'

export default component$(() => {
	return (
		<main class='flex h-screen w-screen bg-slate-900'>
			<Slot />
		</main>
	)
})
