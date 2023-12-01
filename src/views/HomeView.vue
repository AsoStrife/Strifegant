<template>
    <div>
        <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 2xl:col-span-9">
                <div class="grid grid-cols-12 gap-6">

                    <div class="col-span-12 mt-6">
                        <div class="intro-y block sm:flex items-center h-10">
                            <h2 class="text-lg font-medium truncate mr-5">
                                Roadmap
                            </h2>
                        </div>
                    </div>

                    <div class="col-span-12 mt-6">
                        <svg id="gantt"></svg>
                    </div>
                </div>
            </div>
            
            <div class="col-span-12 2xl:col-span-3">
                <div class="2xl:border-l -mb-10 pb-10">
                    <div class="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">

                        <div class="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
                            <div class="intro-x flex items-center h-10">
                                <h2 class="text-lg font-medium truncate mr-5">
                                    Tasks
                                </h2>
                            </div>
                            <div class="mt-5">
                                <div class="intro-x">
                                    <div v-for="task in tasks" v-bind:key="task.id">
                                        <div class="box px-5 py-3 mb-3 flex items-center zoom-in">
                                            <div class="ml-4 mr-auto">
                                                <div class="font-medium">{{ task.name }}</div>
                                                <div class="text-slate-500 text-xs mt-0.5">{{ task.start }} - {{ task.end }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href=""
                                    class="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500">Aggiungi task</a>

                                    <button @click="exportToPNG">Esporta in PNG</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- <svg id="gantt"></svg> -->
    </div>
</template>

<script>

import '@/assets/css/vendor/frappe-gantt.min.css'
import Gantt from '@/assets/js/vendor/frappe-gantt.min.js'

import { Canvg, presets } from 'canvg'
import html2canvas from 'html2canvas'

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
        new Gantt("#gantt", this.tasks, this.ganttConfig);
    },
    methods: {
    // Funzione per esportare l'SVG in PNG
        exportToPNG() {
            // Ottieni il riferimento all'elemento SVG
            const svgElement = this.$refs.gantt

            // Converti l'SVG in un'immagine raster utilizzando canvg
            Canvg(document.createElement('canvas'), svgElement)

            // Cattura l'immagine raster con html2canvas
            html2canvas(svgElement).then((canvas) => {
                // Crea un link per il download
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'nomeDelFile.png';

                // Simula il clic sul link per avviare il download
                link.click();
            })
        }
    }
}
</script>
