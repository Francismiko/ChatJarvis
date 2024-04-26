import { component$ } from '@builder.io/qwik'
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city'
import '@unocss/reset/'
import 'uno.css'

export default component$(() => {
	return (
		<QwikCityProvider>
			<head>
				<meta charSet='utf-8' />
			</head>
			<body lang='en'>
				<RouterOutlet />
			</body>
		</QwikCityProvider>
	)
})