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
export default {
    name: "HomeView",
    data() {
        return {
            tasks: [
                {
                    id: "1",
                    name: 'Redesign website',
                    start: '2016-12-28',
                    end: '2016-12-31',
                    progress: 20,
                    dependencies: ""
                },
                {
                    id: "2",
                    name: 'Redesign website',
                    start: '2017-01-01',
                    end: '2017-01-02',
                    progress: 20,
                    dependencies: "1"
                }
            ]
        }
    },
    mounted() {
        new Gantt("#gantt", this.tasks);
    }
}
</script>
