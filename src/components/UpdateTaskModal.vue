<template>
    <div id="add-task-modal" class="modal fade" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- BEGIN: Modal Header -->
                <div class="modal-header">
                    <h2 class="fw-medium fs-base me-auto">{{ $t('tasks.updateTask') }}</h2> 
                </div> 
                <!-- END: Modal Header -->
                
                <!-- BEGIN: Modal Body -->
                <div class="modal-body grid columns-12 gap-4 gap-y-3">
                    <div class="g-col-12 g-col-sm-12"> 
                        <label class="form-label">{{ $t('tasks.idTask') }}</label>
                        <input type="text" class="form-control" disabled :placeholder="$t('tasks.idTask')" v-model="task.id">
                    </div>

                    <div class="g-col-12 g-col-sm-12"> 
                        <label for="title" class="form-label">{{ $t('tasks.titleTask') }}</label>
                        <input id="title" type="text" class="form-control" :placeholder="$t('tasks.titleTask')" v-model="task.name">
                    </div>
                    
                    <div class="g-col-12 g-col-sm-6"> 
                        <label for="start" class="form-label">{{ $t('tasks.startTask') }}</label>
                        <!-- <input id="start" class="datepicker form-control" data-single-mode="true" v-model="task.start"> -->
                        <VueDatePicker v-model="task.start" format="yyyy-MM-dd" :enable-time-picker="false"
                            input-class-name="form-control" auto-apply locale="it-IT"></VueDatePicker>
                    </div>
                    
                    <div class="g-col-12 g-col-sm-6"> 
                        <label for="end" class="form-label">{{ $t('tasks.endTask') }}</label>
                        <VueDatePicker v-model="task.end" format="yyyy-MM-dd" :enable-time-picker="false"
                            input-class-name="form-control" auto-apply locale="it-IT" :min-date="task.start"></VueDatePicker>
                    </div>

                    <div class="g-col-12 g-col-sm-12"> 
                        <label for="end" class="form-label">{{ $t('tasks.progressTask') }}</label>
                        <div class="input-group mt-2"> 
                            <input type="text" class="form-control" :placeholder="$t('tasks.progressTask')" min="0" max="100" v-model="task.progress">
                            <div id="input-group-price" class="input-group-text">%</div>
                        </div>
                    </div>

                    <div class="g-col-12 g-col-sm-12">
                        <DependenciesTask 
                            @update:tom-select-dependencies="handleDependencies"
                            />
                    </div>
                    
                </div> 
                <!-- END: Modal Body -->
                
                <!-- BEGIN: Modal Footer -->
                <div class="modal-footer text-end"> 
                    <button type="button" id="close-button-tasks" data-bs-dismiss="modal" class="btn btn-outline-secondary w-20 me-1">{{ $t('general.close') }}</button> 
                    <button type="button" class="btn btn-primary w-20" @click="saveData" :disabled="isButtonDisabled">{{ $t('general.save') }}</button> 
                </div> 
                <!-- END: Modal Footer -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { useProjectsStore } from "@/stores/projects"
import type { Task } from '@/models/gantt'
import DependenciesTask from '@/components/DependenciesTask.vue'

export default {
    name: "AddTaskModal", 
    components: {
        DependenciesTask
    },
    data() {
        return {
            projectsStore: useProjectsStore(),
            task: {
                id: '',
                name: '',
                start: '',
                end: '',
                progress: 10,
                dependencies: []
            } as Task,
            projectID: ''
        }
    },
    watch: {
        '$route.params': 'updateProjectID',
    },
    mounted() {
        this.updateProjectID()
        
        this.$el.addEventListener('show.bs.modal', this.setID)
        this.$el.addEventListener('hide.bs.modal', this.clearData)

    },
    destroyed() {
        this.$el.removeEventListener('show.bs.modal')
        this.$el.removeEventListener('hide.bs.modal')
    },
    methods: {
        setID() {
            this.task.id = uuidv4()
        },
        clearData() {
            this.task = {
                id: '',
                name: '',
                start: '',
                end: '',
                progress: 0,
                dependencies: []
            } as Task
        },
        async saveData() {
            await this.projectsStore.addTask(this.projectID, this.task)
            const el = document.getElementById('close-button-tasks') as HTMLElement
            el.click()
        },
        handleDependencies(dependencies: any) {
            dependencies.forEach((element: any) => {
                this.task.dependencies.push(element)
            })
        },
        updateProjectID() {
            this.projectID = this.$route.params.id as string
        }
    },
    computed: {
        isButtonDisabled() {
            const { id, name, start, end } = this.task
            return !id || !name || !start || !end
        }
    }
}
</script>