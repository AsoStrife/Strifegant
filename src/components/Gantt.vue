<template>
    <div class="p-5" v-if="ganttSVG == undefined">
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
    watch: {
        'projectID': 'refreshProjectID',

    },
    data() {
        return {
            project: undefined as Project | undefined,
            projectsStore: useProjectsStore(), 
            ganttSVG: undefined as Gantt | undefined
        }
    },
    mounted() {
        this.fetchData()

        console.log(this.project?.tasks)
        if (this.project?.tasks?.length > 0){
            this.initializeGantt()
        }
        
        this.projectsStore.$subscribe((mutation, state) => {
            
            if(this.ganttSVG == undefined ){
                this.initializeGantt()
            }

            const tmp = this.projectsStore.tasks(this.projectID)?.map(a => Object.assign({}, a))
            this.ganttSVG.refresh(tmp)
        })
    },
    methods: {
        initializeGantt() {
            const tasks = this.projectsStore.tasks(this.projectID)
            
            if(tasks?.length == 0)
                return 

            this.ganttSVG = new Gantt("#gantt", tasks, {
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
                    alert("click")
                },
                on_date_change: (task: any, start: any, end: any) => {
                    this.projectsStore.updateTaskDates(this.projectID, task, start, end)
                },
                on_progress_change: function (task: any, progress: any) {
                    this.projectsStore.updateTaskProgress(this.projectID, task, progress)
                },
                on_view_change: function(mode: any) {
                }
            })
        },
        async fetchData() {            
            this.project = this.projectsStore.project(this.projectID)
        }, 
        refreshProjectID() {
            if(this.ganttSVG != undefined) {
                this.ganttSVG.clear()
                this.ganttSVG = undefined
                this.initializeGantt()
            }
            
        },
    }
}

</script>