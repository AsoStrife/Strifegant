<template>
    <div class="intro-y d-flex flex-column flex-sm-row align-items-center mt-8">
        <h2 class="fs-lg fw-medium me-auto">
            Nome progetto
        </h2>
        <div class="w-full w-sm-auto d-flex mt-4 mt-sm-0">
            <div class="dropdown me-2">
                <button class="dropdown-toggle btn box text-gray-700 dark-text-gray-300 d-flex align-items-center"
                    aria-expanded="false" data-bs-toggle="dropdown"> Mensile <i class="fa-solid fa-chevron-down ms-3"></i>
                </button>
                <div class="dropdown-menu w-40">
                    <ul class="dropdown-content">
                        <li>
                            <a href="" class="dropdown-item"> <span class="truncate">Giornaliero</span> </a>
                        </li>
                        <li>
                            <a href="" class="dropdown-item"> <span class="truncate">Settimanale</span> </a>
                        </li>
                        <li>
                            <a href="" class="dropdown-item"> <span class="truncate">Mensile</span> </a>
                        </li>
                    </ul>
                </div>
            </div>

            <button class="btn btn-secondary shadow-md d-flex align-items-center me-2" data-bs-toggle="modal"
                data-bs-target="#add-task-modal">
                Aggiungi Task <i class="fa-solid fa-plus ms-3"></i>
            </button>

            <button class="btn btn-primary shadow-md d-flex align-items-center">
                Salva <i class="fa-regular fa-floppy-disk ms-3"></i>
            </button>

        </div>
    </div>


    <div class="row gap-y-6 mt-5">
        <div class="intro-y col-12 col-lg-12">

            <div class="intro-y box">
                <div
                    class="d-flex flex-column flex-sm-row align-items-center p-5 border-bottom border-gray-200 dark-border-dark-5">
                    <svg id="gantt"></svg>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">

import Gantt from '@/assets/js/frappe-gantt'

// import TomSelectInitializer from '@/assets/js/TomSelectInitializer'
// import DatePickerInitializer from '@/assets/js/DatePickerInitializer'
import { useGanttStore } from '@/stores/gantt'

export default {
    components: {
    },
    data() {
        return {
            tasks: [],
            ganttStore: useGanttStore(),
            gantt: undefined
        }
    },
    mounted() {
        if (this.ganttStore.tasks.length > 0)
            this.initializeGantt()

            this.ganttStore.$subscribe(() => {
                if(this.gantt == undefined )
                    this.initializeGantt()
                
                const tmp = this.ganttStore.tasks.map(a => Object.assign({}, a))
                this.gantt.refresh(tmp)
            })

        // TomSelectInitializer()
        // DatePickerInitializer()

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
        }
    }
}
</script>