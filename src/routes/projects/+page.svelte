<script lang="ts">

    import { onMount } from "svelte";
	import { browser } from '$app/environment';
    import { uiobserver, onMouseEnterPointer, onMouseLeavePointer, onMouseEnterGrab, onMouseLeaveGrab } from '$lib/actions/uiobserver.svelte';

    import Lenis from "lenis";
    import gsap from "gsap";
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	
    

   	onMount(() => {

		// Initialize Lenis
		const lenis = new Lenis({
			wrapper: document.getElementById('main')!,
			autoResize: true,
			// autoRaf: true,
		});

		lenis.on('scroll', ScrollTrigger.update);

		lenis.on('scroll', ({ progress }) => uiobserver.scrollProgress = progress);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);

        lenis.scrollTo(0, {immediate: true});

		if (browser) {
			console.log("mounted in browser environment");
		};

        let pointerElements: Element[] = [
			...document.querySelectorAll("button,a,input,label,[data-cursor='pointer']")
		];

		pointerElements.forEach((element) => {
			element.addEventListener('mouseenter', onMouseEnterPointer, false);
			element.addEventListener('mouseleave', onMouseLeavePointer, false);
		});

		let grabElements: Element[] = [
			...document.querySelectorAll("button,a,input,label,[data-cursor='pointer']")
		];

		grabElements.forEach((element) => {
			element.addEventListener('mouseenter', onMouseEnterGrab, false);
			element.addEventListener('mouseleave', onMouseLeaveGrab, false);
		});

		console.log("onMount: +layout");

        return () => {
            // remove all eventListeners and kill lenis and scrolltrigger
            pointerElements.forEach((element) => {
				element.removeEventListener('mouseenter', onMouseEnterPointer, false);
				element.removeEventListener('mouseleave', onMouseLeavePointer, false);
			});
			grabElements.forEach((element) => {
				element.removeEventListener('mouseenter', onMouseEnterGrab, false);
				element.removeEventListener('mouseleave', onMouseLeaveGrab, false);
			});
            // window.removeEventListener("resize", setup);
            // myScrollTrigger.kill();
            lenis.destroy();
        }
	})
</script>

<div class="h-[150vh]">
    <h1 class="pt-[50vh]">Projects</h1>
    <h2 class="heading">Environmental intelligence for invasive species management.</h2>
</div>
