<template>
    <h1>Ciao daniela</h1>
</template>

<script lang="ts">

// import '@/assets/css/vendor/frappe-gantt.min.css'
// import Gantt from '@/assets/js/vendor/frappe-gantt.min.js'
// import { Canvg, presets } from 'canvg'
// import html2canvas from 'html2canvas'

export default {
    name: "HomeView",
    data() {
        return {
            tasks: [
                {
                    id: "1",
                    name: 'Redesign website',
                    start: '2016-12-1',
                    end: '2016-12-16',
                    progress: 20,
                    dependencies: ""
                },
                {
                    id: "2",
                    name: 'Redesign website',
                    start: '2016-12-18',
                    end: '2016-12-31',
                    progress: 80,
                    dependencies: "1"
                },
                {
                    id: "3",
                    name: 'Redesign website',
                    start: '2016-12-18',
                    end: '2016-12-31',
                    progress: 80,
                    dependencies: "1"
                },
                {
                    id: "4",
                    name: 'Redesign website',
                    start: '2016-12-18',
                    end: '2016-12-31',
                    progress: 80,
                    dependencies: "1"
                },
                {
                    id: "5",
                    name: 'Redesign website',
                    start: '2016-12-18',
                    end: '2016-12-31',
                    progress: 80,
                    dependencies: "1"
                }

            ], 
            ganttConfig: {
                header_height: 50,
                column_width: 60,
                step: 12,
                view_modes: ['Week', 'Month'],
                bar_height: 20,
                bar_corner_radius: 3,
                arrow_curve: 5,
                padding: 18,
                view_mode: 'Day',
                date_format: 'DD-MM-YYYY',
                language: 'it',
                custom_popup_html: null,
                on_click: function (task) {
                    console.log(task);
                },
                on_date_change: function(task, start, end) {
                    console.log(task, start, end);
                },
                on_progress_change: function(task, progress) {
                    console.log(task, progress);
                },
                on_view_change: function(mode) {
                    console.log(mode);
                }
            }
        }
    },
    mounted() {
        // new Gantt("#gantt", this.tasks, this.ganttConfig);
    },
    methods: {
    }
}
</script>
