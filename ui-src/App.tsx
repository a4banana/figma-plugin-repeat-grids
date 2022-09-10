/// <reference types="vite-plugin-svgr/client" />
import { useState } from 'react'
import 'styles/figma-var.css'
import 'styles/index.sass'

function App() {
	const [ selection, setSelection ] = useState([])

	onmessage = ( event ) => {
		setSelection( event.data.pluginMessage )
	}

	const onClickHandler = () => {
		parent.postMessage({ pluginMessage: { type: 'REPEAT_GRIDS' } }, '*')
	}

	return (
		<main id="grid-panel">
			<section>
				<header>
					{ selection.length
						? <h1>{ selection.length } Selected.</h1>
						: <h1>No Selection.</h1> }
				</header>
				<footer>
					<button onClick={ onClickHandler }>Repeat Grids!</button>
				</footer>
			</section>
		</main>
	);
}

export default App;