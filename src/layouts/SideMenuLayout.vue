<template>
    <MobileMenu />

    <TopBar />

    <div class="wrapper">
        <div class="wrapper-box">

            <SideNav />

            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import MobileMenu from '@/components/layout/MobileMenu.vue'
import SideNav from '@/components/layout/SideNav.vue'
import TopBar from '@/components/layout/TopBar.vue';

export default {
    name: "SideMenuLayout",
    components: {
        MobileMenu,
        SideNav,
        TopBar
    }
}
</script>
