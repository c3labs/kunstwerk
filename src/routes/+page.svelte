<script lang="ts">

	import { onMount } from 'svelte';
    import { uiobserver, onMouseEnterPointer, onMouseLeavePointer, onMouseEnterGrab, onMouseLeaveGrab } from '$lib/actions/uiobserver.svelte';

    import Lenis from "lenis";
    import gsap from 'gsap';
	import { SplitText } from 'gsap/SplitText';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
	
    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(ScrollTrigger);

    let split:SplitText
    let animation:GSAPTween;
    let myScrollTrigger:ScrollTrigger;



    function handleLinesClick() {
        animation && animation.revert && animation.revert();
        animation = gsap.from(split.words, {
            // rotationX: -100,
            // yPercent: 100,
            // transformOrigin: "50% 50% -160px",
            opacity: 0,
            duration: 1.8,
            ease: "sine.out",
            stagger: 0.1,
            delay: 0.5
        });
    }

    function setup() {
        split && split.revert();
        animation && animation.revert();
        split = SplitText.create(".splitter", {
            type:"words",
            // autoSplit: true,
            linesClass: "line",
            mask: "lines"
        });
        
        ScrollTrigger.defaults({ markers: import.meta.env.MODE === 'development' });

        myScrollTrigger = ScrollTrigger.create({
            trigger: '.links',
            scroller: '#main',
            // start: 'bottom',
            // endTrigger: '#otherID',
            // end: 'bottom 50%+=100px',
            // markers: true,
            onToggle: (self) => console.log('toggled, isActive:', self.isActive),
            // onUpdate: (self) => {
            //     console.log(
            //         'progress:',
            //         self.progress.toFixed(3),
            //         'direction:',
            //         self.direction,
            //         'velocity',
            //         self.getVelocity()
            //     );
            // }
        });
        
        console.log(import.meta.env.MODE);
    }

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

        setup();
        lenis.scrollTo(0, {immediate: true});
        // window.addEventListener("resize", setup);

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

        console.log("onMount: +page");

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
            window.removeEventListener("resize", setup);
            myScrollTrigger.kill();
            lenis.destroy();
        }
    });
    
</script>


<!-- <h1 class=" bg-amber-600 c_hrelative c_top-30 c_pt-25 c_h-55 font-regular font-extralight text-7xl">werk d</h1> -->
<!-- <div class=" bg-amber-700 relative h-[200vh] font-regular font-light text-xl" data-cursor="pointer">DEVELOPMENT <a class="link p-xs" href="https://dingens.de" data-cursor='pointer'>Server</a> SERVER v.02</div> -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id="lines" class="splitter bg-pepper-shaded _bg-neutral-700 _absolute relative pt-[50vh] h-[200vh] font-headline regular font-extralight text-5xl text-neutral-100">
    DEVELOPMENT <button class="link p-xs" on:click={handleLinesClick}>CLICKTEST</button> SERVER v.03</div>
<div class="_absolute relative pt-10 bg-dark-raisin">
		<div class="links">
			<a class="link p-xs" href="https://twitter.com/studiofreight">Twitter</a>
			<a class="link p-xs" href="https://github.com/studio-freight">GitHub</a>
			<a class="link p-xs" href="https://awwwards.com/studiofreight">Awwwards</a>
			<a class="link p-xs" href="https://studiofreight.com">Website</a>
			<a class="link p-xs" href="https://darkroom.studiofreight.com">Darkroom</a>
		</div>
		<p class="p-xs tm">
			<span>©</span>
			{new Date().getFullYear()} c3labs
		</p>
</div>

<!-- <style>

    import 'lenis/dist/lenis.css'

    html.lenis,
    html.lenis body {
    height: auto;
    }

    .lenis:not(.lenis-autoToggle).lenis-stopped {
    overflow: clip;
    }

    .lenis [data-lenis-prevent],
    .lenis [data-lenis-prevent-wheel],
    .lenis [data-lenis-prevent-touch] {
    overscroll-behavior: contain;
    }

    .lenis.lenis-smooth iframe {
    pointer-events: none;
    }

    .lenis.lenis-autoToggle {
    transition-property: overflow;
    transition-duration: 1ms;
    transition-behavior: allow-discrete;
    }
</style> -->


