// UI INTERACTION OBSERVER => used for navigational purposes and user interface changes in dependence of intersecting ui areas

import { innerWidth } from 'svelte/reactivity/window';
import { MediaQuery } from 'svelte/reactivity';
import { browser } from '$app/environment';
// import { onMount } from 'svelte';
// import { type IntersectDetail } from '@svelte-put/intersect';
import { afterNavigate, goto } from "$app/navigation";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
// import Lenis from "lenis";

let darkmode = $state(false);
let navState = $state(false);
let iniLoader = $state(false);
// let wChange = $state(false);
// let stagePart = $state(0);
let scrollProgress = $state(0);
let navTween:GSAPTimeline;
let splitLinks:SplitText;

let isPointer = $state(false);
let isGrab = $state(false);
let mobile = false;

// const lenis = new Lenis();

// gsap.registerPlugin(SplitText);

// const splitLinks = SplitText.create(".mainnav .link", {
//                 type: "lines",
//                 mask: "lines"
// });

export const uiobserver = {

    get uistate() {
        return darkmode;
    },
    set uistate(val: boolean) {
        darkmode = val;
    },
    toggleUi() {
        darkmode = !darkmode;
    },
    get navstate() {
        return navState;
    },
    get scrollProgress() {
        return scrollProgress;
    },
    set scrollProgress(val: number) {
        scrollProgress = val;
    },
    get isPointer() {
        return isPointer;
    },
    set isPointer(val: boolean) {
        isPointer = val;
    },
    get isGrab() {
        return isGrab;
    },
    set isGrab(val: boolean) {
        isGrab = val;
    },
    // get wchange() {
    //     return wChange;
    // },
    // get stagepart() {
    //     return stagePart;
    // },
    get initiator() {
        return iniLoader;
    },
    set initiator(val: boolean) {
        iniLoader = val;
    },
    toggleNav() {
        // double check for mobile device
        mobile = new MediaQuery('max-width: 600px').current;
        const splitLinks = SplitText.create(".mainnav .link", {
            type: "lines",
            mask: "lines"
        });
        // gsap irgendwas
        if(!navState){

            // open nav panel and slide main left
            if(mobile) {
                gsap.to(".main", {x: "-100vw", duration: 1, ease: "power3.inOut"});
                gsap.to(".menu", {x: 0, duration: 1, ease: "power3.inOut"});
            } else {

                // gsap.set(".mainnav .link", {y: "0px"});
                // gsap.to(".mainnav .link", {y: "50px", delay: 2, stagger: 0.2});
                gsap.to(".main", {x: "-50vw", duration: 1, ease: "power3.inOut"});
                gsap.to(".menu", {x: 0, duration: 1, ease: "power3.inOut"});    
            };
            gsap.from(splitLinks.lines, {
                y: 80,
                opacity: 0,
                rotate: -3,
                duration: 0.55,
                stagger: 0.05,
                delay: 0.5,
                ease: "power3.out"
            });
        } else {

            // close nav panel and slide main back
            if(mobile) {
                gsap.to(".main", {x: 0, duration: 1, ease: "power3.inOut"});
                gsap.to(".menu", {x: "50vw", duration: 1, ease: "power3.inOut"});
            } else {
                gsap.to(".main", {x: 0, duration: 1, ease: "power3.inOut"});
                gsap.to(".menu", {x: "25vw", duration: 1, ease: "power3.inOut"});
            };
            gsap.to(splitLinks.lines, {y: 80,
                    opacity: 0,
                    rotate: 3,
                    duration: 0.55,
                    stagger: 0.05,
                    ease: "power3.in"
            });
        };
        
        // switch current navstate 
        navState = !navState;

        console.log("switched navstate: ", navState );
    }
};

export const onMouseEnterPointer = () => {
	isPointer = true;
};

export const onMouseLeavePointer = () => {
	isPointer = false;
};

export const onMouseEnterGrab = () => {
    isGrab = true;
};

export const onMouseLeaveGrab = () => {
    isGrab = false;
};

$effect.root(() => {
    $effect(() => {
        if (darkmode) {
            document.documentElement.style.cssText = "--bg-state-color:var(--color-neutral-200);--bg-menu-color:var(--color-neutral-950);";
        } else {
            document.documentElement.style.cssText = "--bg-state-color:var(--color-neutral-950);--bg-menu-color:var(--color-neutral-200);";
        }
    })
});

if(browser) {
    console.log(innerWidth.current);
    // console.log(new MediaQuery('max-width: 600px').current);
    mobile = new MediaQuery('max-width: 600px').current;

    // document.fonts.ready.then(() => {
    //     const splitLinks = SplitText.create(".mainnav .link", {
    //             type: "lines",
    //             mask: "lines"
    //     });
    //     gsap.from(splitLinks.lines, {
    //         y: 50,
    //         opacity: 0,
    //         stagger: 0.05,
    //         delay: 5
    //     });

    // });
};

export function navigate (navroute: string | URL) {

    // lenis.resize();
    goto(navroute, { noScroll: true });

    uiobserver.initiator = true;
    // console.log('current navSate:', uiobserver.navstate);
    if(uiobserver.navstate) {
        uiobserver.toggleNav();
    }
};