<script lang="ts">
    import { onMount } from 'svelte';
	import { uiobserver, onMouseEnterPointer, onMouseLeavePointer, onMouseEnterGrab, onMouseLeaveGrab } from '$lib/actions/uiobserver.svelte';

    import gsap from 'gsap';
    import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

    let inner: HTMLDivElement;
    let outer: HTMLDivElement;
	let isGrab = $state(false);
	let isPointer = $state(false);
    let isActive = $state(true);
	let hasMoved = false;

    let { cursorType } = $props();

    gsap.registerPlugin(DrawSVGPlugin);

    // gsap.from('#progressor', { duration: 5.1, drawSVG: 0 });
    $effect(() => {
        gsap.to('#progressor', { duration: 0.5, drawSVG: Math.round(uiobserver.scrollProgress*100) + '%' });
    })

    const onMouseMove = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
		gsap.to(inner, {
			x: clientX,
			y: clientY,
			duration: hasMoved ? 0.4 : 0,
			ease: 'power4.out'
		});
        gsap.to(outer, {
			x: clientX,
			y: clientY,
			duration: hasMoved ? 0.8 : 0,
			ease: 'power4.out'
		});

		hasMoved = true;
	};

    const onMouseLeaveWindow = () => {
        isActive = false;
    }

    const onMouseEnterWindow = () => {
        isActive = true;
    }

    onMount(() => {
        // scrollProgress = 0;
        uiobserver.scrollProgress = 0;
		// document.documentElement.classList.add('has-custom-cursor');

		// let pointerElements: Element[] = [
		// 	...document.querySelectorAll("button,a,input,label,[data-cursor='pointer']")
		// ];

		// pointerElements.forEach((element) => {
		// 	element.addEventListener('mouseenter', onMouseEnterPointer, false);
		// 	element.addEventListener('mouseleave', onMouseLeavePointer, false);
		// });

		// let grabElements: Element[] = [
		// 	...document.querySelectorAll("button,a,input,label,[data-cursor='pointer']")
		// ];

		// grabElements.forEach((element) => {
		// 	element.addEventListener('mouseenter', onMouseEnterGrab, false);
		// 	element.addEventListener('mouseleave', onMouseLeaveGrab, false);
		// });

        console.log("onMount: Cursor");

		return () => {
			// document.documentElement.classList.remove('has-custom-cursor');

			// pointerElements.forEach((element) => {
			// 	element.removeEventListener('mouseenter', onMouseEnterPointer, false);
			// 	element.removeEventListener('mouseleave', onMouseLeavePointer, false);
			// });

			// grabElements.forEach((element) => {
			// 	element.removeEventListener('mouseenter', onMouseEnterGrab, false);
			// 	element.removeEventListener('mouseleave', onMouseLeaveGrab, false);
			// });
		};
	});

</script>

<svelte:window on:mousemove={onMouseMove} />
<svelte:document on:mouseenter={onMouseEnterWindow} on:mouseleave={onMouseLeaveWindow} />

<!-- <div style:opacity={hasMoved ? 1 : 0} class="cursor{isGrab ? " grab" : ""}{isPointer ? " pointer" : ""}"> -->
<div class="cursor{uiobserver.isGrab ? " grab" : ""}{uiobserver.isPointer ? " pointer" : ""}{isActive  && !uiobserver.navstate ? " is-visible" : ""}">
	<div bind:this={inner} class="inner">
		<div class="label">{cursorType}:{Math.round(uiobserver.scrollProgress*100) + '%'}</div>
	</div>
    <div bind:this={outer} class="outer">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="progress">
            <circle id="progressor" cx="50" cy="50" r="50"></circle>
        </svg>
    </div>
</div>

<style>

    svg {
        overflow: visible;
    }

    .cursor {
        align-items: center;
        color: var(--color-light); /* dynamisch zu setzen je nach Bereich */
        display: flex;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        position: fixed;
        transition: opacity .2s linear;
        z-index: 99
    }

    .cursor.is-touch {
        display: none
    }

    .cursor.is-visible {
        opacity: 1
    }

    .cursor.pointer {
		/* transform: translate(100%, 100%) scale(0.5); */
        opacity: 0
	}

    .cursor.is-dark {
        color: var(--color-dark-raisin)
    }

    @media(max-width: 600px) {
        .cursor {
            display: none
        }
    }

    @media(min-width: 601px) {
        .cursor {
            height: 9rem;
            transform: translate(-6rem,-6rem);
            width: 9rem
        }
    }
    
    .inner {
        align-items: center;
        display: flex;
        height: .4rem;
        justify-content: center;
        width: .4rem
    }

    .label {
        font-size: 1.3rem;
        font-weight: 200;
        text-transform: uppercase;
        white-space: nowrap
    }

    .inner,.label {
        position: absolute
    }

    .outer {
        border: 1px solid color-mix(in srgb,currentcolor 20%,transparent);
        border-radius: 100%;
        inset: 0;
        position: absolute;
    }

    .progress {
        color: var(--color-pepper);
        fill: none;
        stroke: currentcolor;
        stroke-width: 1rem;
        transform: rotate(-90deg)
    }

</style>