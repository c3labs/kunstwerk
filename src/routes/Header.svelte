<script lang="ts">
	// import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import logo from '$lib/assets/images/logo/werk_d.logo.svg?raw';
	import { uiobserver, navigate } from '$lib/actions/uiobserver.svelte';
</script>

<header class="fixed flex p-5 justify-between w-full z-50 text-dark-raisin hover:text-white transition-colors will-change-transform duration-250">
    <!-- LOGO SECTION HERE -->
    <button onclick={() => navigate('/')} aria-label="werk d - Logo - back to home" class="h-25 w-42">
        {@html logo}        
    </button>
    <!-- MENU SECTION HERE -->
    <button onclick={() => uiobserver.toggleNav()} class="{uiobserver.navstate ? 'is-menu' : ''} menu-button">
        <div class="font-menu md:text-3xl xl:text-2xl text-4xl">{uiobserver.navstate ? 'Close' : 'Menu'}</div>
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="cross-svg w-5">
            <path d="M12.0005 5.49894V6.99894H8.50047V5.49894H12.0005Z" fill="currentcolor"></path>
            <path d="M3.5 5.49756V6.99756L0 6.99756L6.55637e-08 5.49756L3.5 5.49756Z" fill="currentcolor"></path>
            <path d="M6.50106 11.9982H5.00106V8.49824H6.50106V11.9982Z" fill="currentcolor"></path>
            <path d="M6.49968 3.49777L4.99968 3.49777L4.99968 -0.00222778L6.49968 -0.00222759L6.49968 3.49777Z" fill="currentcolor"></path>    
        </svg>
    </button>
</header>

<style>

    .menu-button {
        align-items: center;
        display: flex;
        gap: .75rem;
        justify-content: center;
        pointer-events: auto;
        transition: color .25s linear
    }

    .is-menu.menu-button {
        color: var(--color-light)
    }

    .cross-svg {
        height: 1.6rem;
        transform-origin: center;
        transition: transform .25s linear;
        width: 1.6rem
    }

    .is-menu .cross-svg {
        transform: rotate(45deg)
    }

</style>