<template>
    <div id="add-task-modal" class="modal fade" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- BEGIN: Modal Header -->
                <div class="modal-header">
                    <h2 class="fw-medium fs-base me-auto">Aggiungi task</h2> 
                </div> 
                <!-- END: Modal Header -->
                
                <!-- BEGIN: Modal Body -->
                <div class="modal-body grid columns-12 gap-4 gap-y-3">
                    <div class="g-col-12 g-col-sm-12"> 
                        <label class="form-label">ID Task</label>
                        <input type="text" class="form-control" disabled placeholder="Titolo task" v-model="task.id">
                    </div>

                    <div class="g-col-12 g-col-sm-12"> 
                        <label for="title" class="form-label">Titolo Task</label>
                        <input id="title" type="text" class="form-control" placeholder="Titolo task" v-model="task.name">
                    </div>
                    
                    <div class="g-col-12 g-col-sm-6"> 
                        <label for="start" class="form-label">Inizio Task</label>
                        <!-- <input id="start" class="datepicker form-control" data-single-mode="true" v-model="task.start"> -->
                        <VueDatePicker v-model="task.start" format="yyyy-MM-dd" :enable-time-picker="false"
                            input-class-name="form-control" auto-apply locale="it-IT"></VueDatePicker>
                    </div>
                    
                    <div class="g-col-12 g-col-sm-6"> 
                        <label for="end" class="form-label">Fine Task</label>
                        <VueDatePicker v-model="task.end" format="yyyy-MM-dd" :enable-time-picker="false"
                            input-class-name="form-control" auto-apply locale="it-IT" :min-date="task.start"></VueDatePicker>
                    </div>

                    <div class="g-col-12 g-col-sm-12"> 
                        <!-- <label for="dependencies" class="form-label">Dipendenze</label>
                        <select id="dependencies" data-placeholder="Select categories" class="tom-select w-full" multiple v-model="task.dependencies">
                            <option v-for="task in this.ganttStore.tasks" v-bind:key="task.id" :value="task.id"> {{ task.name }}</option>
                        </select> -->
                        <DependenciesTask />
                    </div>
                    
                </div> 
                <!-- END: Modal Body -->
                
                <!-- BEGIN: Modal Footer -->
                <div class="modal-footer text-end"> 
                    <button type="button" id="closeButton" data-bs-dismiss="modal" class="btn btn-outline-secondary w-20 me-1">Chiudi</button> 
                    <button type="button" class="btn btn-primary w-20" @click="saveData">Salva</button> 
                </div> 
                <!-- END: Modal Footer -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { useGanttStore } from '@/stores/gantt'
import type { Task } from '@/models/gantt'
import DependenciesTask from '@/components/DependenciesTask.vue'

export default {
    name: "AddTaskModal", 
    components: {
        DependenciesTask
    },
    data() {
        return {
            ganttStore: useGanttStore(),
            tasks: [],
            task: {
                // id: '',
                // name: '',
                // start: '',
                // end: '',
                // progress: 0,
                // dependencies: []
                id: 'Task 2',
                name: 'Redesign website',
                start: '2024-01-05',
                end: '2024-01-19',
                progress: 0,
                dependencies: [],
            } as Task,
        }
    },
    watch: {
        tasks: {
            handler(newTask, oldTask) {
                console.log('Task modified:', newTask)
            },
            deep: true // This enables deep watching for nested properties of the task object
        }
    },
    mounted() {
        this.$el.addEventListener('show.bs.modal', this.setID)
        this.$el.addEventListener('hide.bs.modal', this.clearData)

        // this.tasks = this.ganttStore.tasks.map(a => Object.assign({}, a))


        this.ganttStore.$subscribe(() => {

        })
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
            }
            // this.task.name = uuidv4()
        },
        async saveData() {
            await this.ganttStore.addTask(this.task)
            const el = document.getElementById('closeButton') as HTMLElement
            el.click()
        },
        
    }
}
</script>