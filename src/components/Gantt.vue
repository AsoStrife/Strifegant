<template>
    <div class="p-5" v-if="!ganttSVG">
        <div class="alert alert-secondary d-flex align-items-center mb-2" role="alert">
            <i class="fa-solid fa-circle-exclamation me-3"></i>
            {{ $t('projects.noTaksAlert') }}
        </div>
    </div>
    <div class="d-flex flex-column flex-sm-row align-items-center p-5 border-bottom border-gray-200 dark-border-dark-5" ref="ganttRef">
        <!-- <svg :id="oldTag"></svg> -->
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
            ganttSVG: undefined as Gantt | undefined,
            oldTag: 'gantt'
        }
    },
    mounted() {
        this.fetchData()

        if (this.project?.tasks?.length > 0){
            this.initializeGantt()
        }
        
        this.projectsStore.$subscribe((mutation, state) => {
            
            if(this.ganttSVG == undefined ){
                this.initializeGantt()
            }

            const tmp = this.projectsStore.tasks(this.projectID)?.map(a => Object.assign({}, a))
            const tasksConverted = tmp?.map(task => {
                const startDate = task.start.seconds ? new Date(Number(task.start.seconds)*1000) : task.start
                const endDate = task.end.seconds ? new Date(Number(task.end.seconds)*1000) : task.end

                return {
                    id: task.id,
                    name: task.name,
                    start: startDate,
                    end: endDate,
                    progress: task.progress,
                    dependencies: task.dependencies
                }
            })
            this.ganttSVG.refresh(tasksConverted)
        })
    },
    methods: {
        
        initializeGantt() {
            const tasks = this.projectsStore.tasks(this.projectID)
            
            if(tasks?.length == 0)
                return 
            
            const tasksConverted = tasks?.map(task => {
                const startDate = task.start.seconds ? new Date(Number(task.start.seconds)*1000) : task.start
                const endDate = task.end.seconds ? new Date(Number(task.end.seconds)*1000) : task.end

                return {
                    id: task.id,
                    name: task.name,
                    start: startDate,
                    end: endDate,
                    progress: task.progress,
                    dependencies: task.dependencies
                }
            })

            const divElement = this.$refs.ganttRef as HTMLDivElement
            const appendingSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const idAttribute = document.createAttribute('id')
            idAttribute.value = this.oldTag
            appendingSvg.attributes.setNamedItem(idAttribute)
            divElement.appendChild(appendingSvg)

            this.ganttSVG = new Gantt(appendingSvg, tasksConverted, {
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
                    alert("hai premuto due volte")
                },
                on_date_change: (task: any, start: any, end: any) => {
                    start = new Date(start)
                    end = new Date(end)
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
            try {
                await this.projectsStore.getProjects();
                this.project = this.projectsStore.project(this.projectID)
            } catch (error) {
                console.error(error);
            }
        }, 

        refreshProjectID() {
            console.log("refresh")
            
            if(this.ganttSVG != undefined) {
                console.log(this.ganttSVG)

                this.ganttSVG.clear()
                this.ganttSVG = undefined
                
                const toDeleteSvg = document.getElementById(this.oldTag) as HTMLElement
                toDeleteSvg.remove()

                this.initializeGantt()
            }
            
        },
    }
}

</script>