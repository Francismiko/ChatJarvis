import { component$ } from '@builder.io/qwik'
import {
	QwikCityProvider,
	RouterOutlet,
	ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import '@unocss/reset/normalize.css'
import 'uno.css'

export default component$(() => {
	return (
		<QwikCityProvider>
			<head>
				<meta charSet='utf-8' />
				<ServiceWorkerRegister />
			</head>
			<body>
				<RouterOutlet />
			</body>
		</QwikCityProvider>
	)
})
