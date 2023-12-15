<template>
    <div class="intro-y d-flex flex-column flex-sm-row align-items-center mt-8">
        <h2 class="fs-lg fw-medium me-auto">
            {{ project?.name }}
        </h2>
        <div class="w-full w-sm-auto d-flex mt-4 mt-sm-0">
            
            <button class="btn btn-secondary shadow-md d-flex align-items-center me-2" data-bs-toggle="modal"
                data-bs-target="#add-task-modal">
                Aggiungi Task <i class="fa-solid fa-plus ms-3"></i>
            </button>

        </div>
    </div>


    <div class="row gap-y-6 mt-5">
        <div class="intro-y col-12 col-lg-12">
            
            <div class="intro-y box">
                <div class="p-5" v-if="gantt == undefined">
                    <div class="alert alert-secondary d-flex align-items-center mb-2" role="alert"> 
                        <i class="fa-solid fa-circle-exclamation me-3"></i> Non sono presenti task per questo progetto 
                    </div>
                </div>
                <div class="d-flex flex-column flex-sm-row align-items-center p-5 border-bottom border-gray-200 dark-border-dark-5">
                    <svg id="gantt"></svg>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">

import Gantt from '@/assets/js/frappe-gantt'
import { useGanttStore } from '@/stores/gantt'
import { useProjectsStore } from "@/stores/projects"
import type { Project } from '@/models/gantt'

export default {
    components: {
    },
    data() {
        return {
            project: {} as Project | undefined, 
            currentPath: '' as string,
            projectID: '' as string,
            projectStore: useProjectsStore(),

            tasks: [],
            ganttStore: useGanttStore(),
            gantt: undefined
        }
    },
    watch: {
        '$route': 'fetchData',
    },
    mounted() {
        this.fetchData()

        if (this.ganttStore.tasks.length > 0){
            this.initializeGantt()
        }
        
        this.ganttStore.$subscribe(() => {
            if(this.gantt == undefined )
                this.initializeGantt()
            
            const tmp = this.ganttStore.tasks.map(a => Object.assign({}, a))
            this.gantt.refresh(tmp)
        })
    },
    methods: {
        initializeGantt() {
            this.gantt = new Gantt("#gantt", this.ganttStore.tasks, {
                header_height: 50,
                column_width: 30,
                step: 24,
                view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
                bar_height: 20,
                bar_corner_radius: 3,
                arrow_curve: 5,
                padding: 18,
                view_mode: 'Week',
                date_format: 'YYYY-MM-DD',
                language: 'it',
                custom_popup_html: null,
                on_click: function (task: any) {
                    console.log(task);
                },
                on_date_change: function (task: any, start: any, end: any) {
                    console.log(task, start, end);
                },
                on_progress_change: function (task: any, progress: any) {
                    console.log(task, progress);
                },
                on_view_change: function (mode: any) {
                    console.log(mode);
                }
            })
        },
        fetchData() {
            this.currentPath = this.$route.path

            this.projectID = this.$route.params.id as string
            
            this.project = this.projectStore.project(this.projectID)
            
        }
    }
}
</script>