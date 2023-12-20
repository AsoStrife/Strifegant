<template>
    <div class="intro-y d-flex flex-column flex-sm-row align-items-center mt-8">
        <h2 class="fs-lg fw-medium me-auto"> </h2>
        <div class="w-full w-sm-auto d-flex mt-4 mt-sm-0">

            <button class="btn btn-secondary shadow-md d-flex align-items-center me-2"  data-bs-toggle="modal"
                data-bs-target="#add-project-modal">
                {{ $t('projects.addProject')}} <i class="fa-solid fa-plus ms-3"></i>
            </button>

        </div>
    </div>


    <div class="row gap-y-6 mt-5">
        <div class="intro-y col-12 col-lg-12">
            
            <div class="intro-y box">
                <div class="p-5">
                    <div class="alert alert-secondary d-flex align-items-center mb-2" role="alert"> 
                        <i class="fa-solid fa-circle-exclamation me-3"></i> {{ $t('projects.selectProjectAlert') }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { useProjectsStore } from "@/stores/projects"

export default {
    name: 'HomeView',
    data() {
        return {
            projectsStore: useProjectsStore(),
        }
    },
    mounted() {
        console.log('HomeView mounted')
        this.projectsStore.getProjects()
    }
}
</script>