<script>
	import './app.css';

	import { onMount } from 'svelte';
	import { screenType, is_iframe } from '$lib/store/store';

	import Header from '$lib/components/header/header.svelte';
	import Footer from '$lib/components/footer/footer.svelte';

	import Experience from '$lib/three-d/Experience.js'

	let experience;
	onMount(async () => {

		// const module = await import('$lib/three-d/Experience.js')
		const experience = new Experience(document.querySelector('canvas.webgl'))

		// ---------------------------------------------------------------------------
		// SCREEN
		// ---------------------------------------------------------------------------
		const ua = navigator.userAgent;
		if (
			/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
		) {
			// phone
			screenType.set(1);
		} else if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			// tablet
			screenType.set(2);
		} else {
			//laptop
			screenType.set(3);
		}

		if (window.location !== window.parent.location) {
			// The page is in an iframe
			is_iframe.set(true);
		}
	});
</script>

<canvas class="webgl"></canvas>
<!-- <svelte:component this={experience} /> -->

<div class="app">
	{#if $screenType}
	<header>
		<Header />
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<Footer />
	</footer>
	{/if}
</div>


<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.webgl {
		position: absolute;
		z-index: 0;
	}

	header {
		position: absolute;
		top: 0;
		width: 100%;
	}

	footer {
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: calc(4 * var(--margin)) calc(4 * var(--margin));
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@media only screen and (max-width: 768px) {
		main {
			padding: calc(4 * var(--margin)) calc(3 * var(--margin));
		}
	}
</style>
