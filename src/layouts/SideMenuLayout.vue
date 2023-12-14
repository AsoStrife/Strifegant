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

    <AddTaskModal id="add-task-modal" @close-add-task-modal="closeAddTaskModal"/>
    <Project id="add-task-modal" @close-add-task-modal="closeAddProjectModal"/>
    
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
    },
    methods: {
        closeAddTaskModal() {
            const modal = new bootstrap.Modal(document.getElementById('addTaskModal'), {});

            console.log(modal)
            modal.hide()
        },
        closeAddProjectModal() {
            const modal = new bootstrap.Modal(document.getElementById('addProjectModal'), {});

            console.log(modal)
            modal.hide()
        }
    }
}
</script>
