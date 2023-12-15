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

    <AddTaskModal @close-add-task-modal="closeAddTaskModal"/>
    <AddProjectModal @close-add-task-modal="closeAddProjectModal"/>
    
</template>

<script lang="ts">
import MobileMenu from '@/components/layout/MobileMenu.vue'
import SideNav from '@/components/layout/SideNav.vue'
import TopBar from '@/components/layout/TopBar.vue';
import AddTaskModal from '@/components/AddTaskModal.vue'
import AddProjectModal from '@/components/AddProjectModal.vue'

export default {
    name: "SideMenuLayout",
    components: {
        MobileMenu,
        SideNav,
        TopBar,
        AddTaskModal,
        AddProjectModal
    },
    methods: {
        closeAddTaskModal() {
            // const modal = new bootstrap.Modal(document.getElementById('add-task-modal'), {});

            // console.log(modal)
            // modal.hide()
        },
        closeAddProjectModal() {
            // const modal = new bootstrap.Modal(document.getElementById('add-project-modal'), {});

            // console.log(modal)
            // modal.hide()
        }
    }
}
</script>
