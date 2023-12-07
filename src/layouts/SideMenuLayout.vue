<template>
    <MobileMenu/>

    <TopBar />

    <div class="wrapper">
        <div class="wrapper-box">
            <SideNav />
            <div class="content">
                <RouterView></RouterView>
            </div>
        </div>
    </div>

    <AddTaskModal />
    
</template>

<script lang="ts">
import MobileMenu from '@/components/layout/MobileMenu.vue'
import SideNav from '@/components/layout/SideNav.vue'
import TopBar from '@/components/layout/TopBar.vue';
import AddTaskModal from '@/components/AddTaskModal.vue'

export default {
    name: "SideMenuLayout",
    components: {
        MobileMenu,
        SideNav,
        TopBar,
        AddTaskModal
    }
}
</script>
