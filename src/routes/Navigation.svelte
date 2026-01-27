<script lang="ts">
	import { page } from "$app/state";
    import { uiobserver, navigate } from '$lib/actions/uiobserver.svelte';
	import gsap from "gsap";
	import { SplitText } from "gsap/SplitText";

    let date = new Date();
    let year = date.getFullYear();

    // document.fonts.ready.then(() => {
    //     const splitLinks = SplitText.create(".mainnav .link", {
    //             type: "lines",
    //             mask: "lines"
    //     });
    //     // gsap.from(splitLinks.lines, {
    //     //     y: 50,
    //     //     opacity: 0,
    //     //     stagger: 0.05,
    //     //     delay: 5
    //     // });

    // });
</script>
<nav
	class="menu"
	style="translate: none; rotate: none; scale: none; transform: translate(25vw, 0px);">
	<div class="mainnav">
		<ul class="list">
			<li class="item">
				<button
					onclick={() => navigate('/projects')}
					class="link{page.url.pathname.startsWith('/projects') ? ' is-active' : ''}"
					>Projekte</button>
			</li>
			<li class="item">
				<button
					onclick={() => navigate('/techniken')}
					class="link{page.url.pathname.startsWith('/techniken') ? ' is-active' : ''}"
					>Techniken</button>
			</li>
			<li class="item">
				<button
					onclick={() => navigate('/team')}
					class="link{page.url.pathname.startsWith('/team') ? ' is-active' : ''}"
					>Team</button>
			</li>
			<li class="item">
				<button
					onclick={() => navigate('/contact')}
					class="link{page.url.pathname.startsWith('/contact') ? ' is-active' : ''}"
					>Kontakt</button>
			</li>
		</ul>
	</div>
	<div class="social">
		<ul class="list">
			<li class="item">
				<a
					href="https://www.instagram.com/werk.d"
					rel="noopener noreferrer"
					target="_blank"
					class="base-link">Instagram</a>
			</li>
			<li class="item">
				<a
					href="https://www.pinterest.com/company/werk.d/"
					rel="noopener noreferrer"
					target="_blank"
					class="base-link">Pinterest</a>
			</li>
		</ul>
	</div>
	<a href="https://www.someimportantlink.com/" rel="noopener noreferrer" class="cursor-pointer base-button is-button"><div class="title">IMPORTANT LINK</div></a>
	<div class="copyright">
		<div>©{year} werk<sup>d</sup></div>
		<div>Inchenhofen, BY</div>
	</div>
</nav>
<style>


    .menu {
        align-items: flex-start;
        background: var(--color-dark-raisin);
        display: flex;
        flex-direction: column;
        inset: 0 0 0 auto;
        justify-content: center;
        position: fixed;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        z-index: 1
    }

    @media(max-width: 600px) {
        .menu {
            padding:0 1.2rem;
            width: 100vw
        }
    }

    @media(min-width: 601px) {
        .menu {
            padding:0 20rem;
            width: 50vw;
        }
    }

    .base-link {
        color: var(--color-light);
        display: inline-flex;
        font-family: var(--font-f-primary);
        font-size: 1.5rem;
        font-weight: 300;
        line-height: 1.38;
        position: relative;
        text-transform: uppercase;
        transition: color .25s linear
    }

    .base-link:before {
        background: var(--color-pepper-shaded);
        content: "";
        inset: 0 -.5rem;
        position: absolute;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform .25s ease-in-out;
        z-index: -1
    }

    @media(hover: hover) {
        .base-link:hover {
            color:var(--color-dark-raisin)
        }

        .base-link:hover:before {
            transform: scaleX(1);
            transform-origin: left
        }
    }

    .mainnav {
        width: 100%;
    }

    @media(max-width: 600px) {
        .mainnav .item {
            margin:-1rem 0;
            padding: 1rem 0
        }
    }

    /* .item {
        overflow: hidden;
        position: relative;
        display: inline-block;
    } */

    .is-enter .item {
        overflow: hidden
    }

    .link {
        align-items: center;
        display: flex;
        font-family: var(--font-f-secodary);
        font-style: normal;
        font-weight: 400;
        position: relative;
        will-change: transform;
        width: 100%
    }

    @keyframes flash {
        0% {
            opacity: 0
        }

        50% {
            opacity: 1
        }

        to {
            opacity: 0
        }
    }

    @media(max-width: 600px) {
        .link {
            font-size:5.6rem;
            letter-spacing: -.03em;
            line-height: 6rem
        }
    }

    @media(min-width: 601px) {
        .link {
            font-size:8rem;
            letter-spacing: -.06em;
            line-height: 9rem
        }
    }

    .link:before {
        opacity: 0;
        position: absolute;
    }

    @media(max-width: 600px) {
        .link:before {
            right:0
        }
    }

    @media(min-width: 601px) {
        .link:before {
            left:-5rem
        }
    }

    .link.is-active {
        color: var(--color-pepper-shaded);
        pointer-events: none
    }

    @media(max-width: 600px) {
        .link.is-active:before {
            animation:flash 1s step-start 0s infinite;
            content: "_"
        }
    }

    @media(hover: hover) {
        .link:hover {
            color:var(--color-pepper)
        }

        .link:hover:before {
            animation: flash 1s step-start 0s infinite;
            content: "_"
        }
    }

    @media(max-width: 600px) {
        .social {
            margin:8svh 0
        }
    }

    @media(min-width: 601px) {
        .social {
            margin:5svh 0
        }
    }

    .copyright {
        color: var(--color-neutral-700);
        display: flex;
        font-family: var(--font-f-primary);
        font-size: 1.4rem;
        font-weight: 300;
        justify-content: space-between;
        line-height: 1.28;
        position: absolute;
        text-transform: uppercase
    }

    @media(max-width: 600px) {
        .copyright {
            inset:auto 1.2rem 1.2rem
        }
    }

    @media(min-width: 601px) {
        .copyright {
            inset:auto 1.6rem 1.6rem
        }
    }

</style>