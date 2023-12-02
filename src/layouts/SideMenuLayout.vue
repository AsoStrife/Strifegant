<template>
    <div id="layout-wrapper">
        <TopBar />

        <SideNav />
    </div>


    <div class="main-content">
        <div class="page-content">
            <div class="container-fluid">

                <router-view></router-view>

            </div>
        </div>
    </div>


    
</template>

<script lang="ts">
// import MobileMenu from '@/components/layout/MobileMenu.vue'
import SideNav from '@/components/layout/SideNav.vue'
import TopBar from '@/components/layout/TopBar.vue';

export default {
    name: "SideMenuLayout",
    components: {
        // MobileMenu,
        SideNav,
        TopBar
    }
}
</script>
