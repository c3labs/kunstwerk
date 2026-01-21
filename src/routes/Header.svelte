<script lang="ts">
	// import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import logo from '$lib/assets/images/logo/werk_d.logo.svg?raw';
	// import { uiobserver, navigate } from '$lib/uiobserver.svelte';

</script>

<header class="fixed flex p-5 justify-between w-full z-50 text-dark-raisin hover:text-white transition-colors will-change-transform duration-300">
    <a href="/" class="is-active logo h-25" aria-current="page"> {@html logo} </a>
    <button class="c3_menu-button items-center flex gap-3 justify-center transition-colors">
        <div class="label font-menu text-2xl">Menu</div>
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="c3_cross-svg w-5">
            <path d="M12.0005 5.49894V6.99894H8.50047V5.49894H12.0005Z" fill="currentcolor"></path>
            <path d="M3.5 5.49756V6.99756L0 6.99756L6.55637e-08 5.49756L3.5 5.49756Z" fill="currentcolor"></path>
            <path d="M6.50106 11.9982H5.00106V8.49824H6.50106V11.9982Z" fill="currentcolor"></path>
            <path d="M6.49968 3.49777L4.99968 3.49777L4.99968 -0.00222778L6.49968 -0.00222759L6.49968 3.49777Z" fill="currentcolor"></path>    
        </svg>
    </button>
</header>