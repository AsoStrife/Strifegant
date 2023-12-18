<template>
    <div id="add-project-modal" class="modal fade" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- BEGIN: Modal Header -->
                <div class="modal-header">
                    <h2 class="fw-medium fs-base me-auto">{{ $t('projects.addProject') }}</h2> 
                </div> 
                <!-- END: Modal Header -->
                
                <!-- BEGIN: Modal Body -->
                <div class="modal-body grid columns-12 gap-4 gap-y-3">
                    <div class="g-col-12 g-col-sm-12"> 
                        <label class="form-label">{{ $t('projects.idProject') }}</label>
                        <input type="text" class="form-control" disabled :placeholder="$t('projects.idProject')" v-model="project.id">
                    </div>

                    <div class="g-col-12 g-col-sm-12"> 
                        <label for="title" class="form-label">{{ $t('projects.nameProject') }}</label>
                        <input id="title" type="text" class="form-control" :placeholder="$t('projects.nameProject')" v-model="project.name">
                    </div>
                    
                </div> 
                <!-- END: Modal Body -->
                
                <!-- BEGIN: Modal Footer -->
                <div class="modal-footer text-end"> 
                    <button type="button" id="close-button-project" data-bs-dismiss="modal" class="btn btn-outline-secondary w-20 me-1">{{ $t('general.close') }}</button> 
                    <button type="button" class="btn btn-primary w-20" @click="saveData" :disabled="isButtonDisabled">{{ $t('general.save') }}</button> 
                </div> 
                <!-- END: Modal Footer -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { useProjectsStore } from '@/stores/projects'
import type { Project, Task } from '@/models/gantt'

export default {
    name: "AddProjectModal", 
    data() {
        return {
            projectStore: useProjectsStore(),
            project: {
                id: '',
                name: '',
                tasks: [] as Task[]
            } as Project,
        }
    },
    mounted() {
        this.$el.addEventListener('show.bs.modal', this.setID)
        this.$el.addEventListener('hide.bs.modal', this.clearData)

    },
    destroyed() {
        this.$el.removeEventListener('show.bs.modal')
        this.$el.removeEventListener('hide.bs.modal')
    },
    methods: {
        setID() {
            this.project.id = uuidv4()
        },
        clearData() {
            this.project = {
                id: '',
                name: '', 
                tasks: []
            } as Project
        },
        async saveData() {
            await this.projectStore.addProject(this.project)
            const el = document.getElementById('close-button-project') as HTMLElement
            el.click()
        },
        
    },
    computed: {
        isButtonDisabled() {
            const { id, name } = this.project
            return !id || !name
        }
    }
}
</script>