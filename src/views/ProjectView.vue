<template>
    <div class="intro-y d-flex flex-column flex-sm-row align-items-center mt-8">
        <h2 class="fs-lg fw-medium me-auto">
            {{ project?.name }}
        </h2>
        <div class="w-full w-sm-auto d-flex mt-4 mt-sm-0">
            
            <button class="btn btn-secondary shadow-md d-flex align-items-center me-2"   data-bs-toggle="modal"
                data-bs-target="#add-task-modal">
                {{ $t('projects.addTaskButton') }} 
                <i class="fa-solid fa-plus ms-3"></i>
            </button>

        </div>
    </div>


    <div class="row gap-y-6 mt-5">
        <div class="intro-y col-12 col-lg-12">
            
            <div class="intro-y box">
                <GanttVue :projectID="projectID" v-if="projectID != ''"/>                
            </div>

        </div>
    </div>
</template>

<script lang="ts">

import GanttVue from '@/components/Gantt.vue'
import { useProjectsStore } from "@/stores/projects"
import type { Project } from '@/models/gantt'

export default {
    components: {
        GanttVue
    },
    data() {
        return {
            project: {} as Project | undefined, 
            currentPath: '' as string,
            projectID: '' as string,
            projectStore: useProjectsStore(),
        }
    },
    watch: {
        '$route.params': 'fetchData',
    },
    mounted() {
        this.fetchData()
    },
    methods: {

        fetchData() {
            this.currentPath = this.$route.path

            this.projectID = this.$route.params.id as string
            
            this.project = this.projectStore.project(this.projectID)

            if(this.project == undefined)
                this.$router.push({name: 'Error404'})
        }
    }
}
</script>