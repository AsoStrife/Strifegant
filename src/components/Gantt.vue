<template>
    <div class="p-5" v-if="gantt == undefined">
        <div class="alert alert-secondary d-flex align-items-center mb-2" role="alert">
            <i class="fa-solid fa-circle-exclamation me-3"></i>
            {{ $t('projects.noTaksAlert') }}
        </div>
    </div>
    <div class="d-flex flex-column flex-sm-row align-items-center p-5 border-bottom border-gray-200 dark-border-dark-5">

        <svg id="gantt"></svg>
    </div>
</template>

<script lang="ts">
import Gantt from '@/assets/js/frappe-gantt'
import { useProjectsStore } from "@/stores/projects"
import type { Project } from '@/models/gantt'

export default {
    name: 'Gantt',
    props: {
        projectID: {
            type: String,
            default: ''
        }
    }, 
    data() {
        return {
            project: {} as Project | undefined,
            projectsStore: useProjectsStore(), 
            ganttSVG: {} as Object | Gantt
        }
    },
    mounted() {
        this.fetchData()

        if (this.projectsStore.tasks.length > 0){
            this.initializeGantt()
        }
        
        this.projectsStore.$subscribe(() => {
            if(this.ganttSVG== undefined )
                this.initializeGantt()
            
            // const tmp = this.projectsStore.tasks.map(a => Object.assign({}, a))
            // this.ganttSVG.refresh(tmp)
        })
    },
    methods: {
        initializeGantt() {
            this.ganttSVG= new Gantt("#gantt", this.projectsStore.tasks(this.projectID), {
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
            this.ganttSVG = this.projectsStore.project(this.projectID)
            
        }
    }
}

</script>