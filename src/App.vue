<template>
    <RouterView />
</template>

<script lang="ts">

export default {
    mounted() {
        // document.documentElement.setAttribute("data-layout-mode", "dark");

        document.documentElement.setAttribute("data-layout", "horizontal")
        document.documentElement.setAttribute("data-bs-theme", "light")
        document.documentElement.setAttribute("data-sidebar", "dark")
        document.documentElement.setAttribute("data-sidebar-image", "none")
        document.documentElement.setAttribute("data-layout-style", "default")
        document.documentElement.setAttribute("data-layout-position", "fixed")
        document.documentElement.setAttribute("data-topbar", "light")
        document.documentElement.setAttribute("fluid", "lg")
        document.documentElement.setAttribute("data-sidebar-size", "lg")
        document.documentElement.setAttribute("data-layout", "vertical")
        document.documentElement.setAttribute("data-sidebar-visibility", "show")
        document.documentElement.setAttribute("data-preloader", "disable")
    }
}
</script>