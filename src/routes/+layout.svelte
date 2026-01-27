<script lang="ts">
	// Supports weights 100-800
	import '@fontsource-variable/jetbrains-mono';
	import '@fontsource-variable/inter';

	import '../app.css';
	import 'lenis/dist/lenis.css';

	import { onMount, type Component } from 'svelte';
	import { browser } from '$app/environment';
	import { uiobserver } from '$lib/actions/uiobserver.svelte';

    // import Lenis from "lenis";
	// import { gsap } from 'gsap';
	// import { ScrollTrigger } from 'gsap/ScrollTrigger';

	import Header from './Header.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Footer from './Footer.svelte';
	import Navigation from './Navigation.svelte';

	// let scrollProgress = $state(0);

	// import favicon from '$lib/assets/favicon.svg';

	onMount(() => {

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

<Cursor cursorType="scroll" />
<Navigation />
<main class="main{uiobserver.navstate ? " overlay-visible" : ""}">
	<div id="main" class="scroll">
		{@render children?.()}
	</div>
	<Footer />
</main>


