<script lang="ts">
	// Supports weights 100-800
	import '@fontsource-variable/jetbrains-mono';
	import '@fontsource-variable/inter';

	import '../app.css';
	import 'lenis/dist/lenis.css';

	import { onMount, type Component } from 'svelte';
	import { browser } from '$app/environment';

    import Lenis from "lenis";
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	import Header from './Header.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Footer from './Footer.svelte';

	let scrollProgress = $state(0);



	// import favicon from '$lib/assets/favicon.svg';


	onMount(() => {

		// Initialize Lenis
		const lenis = new Lenis({
			wrapper: document.getElementById('main')!,
			// autoRaf: true,
		});

		lenis.on('scroll', ScrollTrigger.update);

		lenis.on('scroll', ({ progress }) => scrollProgress = progress);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);

		if (browser) {
			console.log("mounted in browser environment");
		};
		console.log("onMount: +layout");
	})

	let { children } = $props();
</script>

<!-- <svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head> -->

<Header />
<!-- svelte-ignore element_invalid_self_closing_tag -->
<Cursor {scrollProgress} cursorType="scroll" />
<main id="main" class="scrollwrap">
	{@render children?.()}
	<Footer />
</main>


