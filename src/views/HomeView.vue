<template>
    <div class="intro-y d-flex flex-column flex-sm-row align-items-center mt-8">
        <h2 class="fs-lg fw-medium me-auto">
            Nome progetto
        </h2>
        <div class="w-full w-sm-auto d-flex mt-4 mt-sm-0">
            <div class="dropdown me-2">
                <button class="dropdown-toggle btn box text-gray-700 dark-text-gray-300 d-flex align-items-center"
                    aria-expanded="false" data-bs-toggle="dropdown"> Mensile <i class="fa-solid fa-chevron-down ms-3"></i> </button>
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

            <div class="dropdown">
                <button class="dropdown-toggle btn btn-primary shadow-md d-flex align-items-center" aria-expanded="false" data-bs-toggle="dropdown"> 
                    Salva <i class="fa-regular fa-floppy-disk ms-3"></i>
                </button>
                
            </div>
        </div>
    </div>


    <div class="row gap-y-6 mt-5">
        <div class="intro-y col-12 col-lg-9">

            <div class="intro-y box">
                <div
                    class="d-flex flex-column flex-sm-row align-items-center p-5 border-bottom border-gray-200 dark-border-dark-5">
                    <!-- <h2 class="fw-medium fs-base me-auto">{{ $t('general.dashboard_h2') }}</h2> -->
                    <!-- <div class="toolbox">
                        <button @click="updateFirstRow">Update first row</button>
                        <button @click="changeZoomLevel">Change zoom level</button>
                    </div> -->

                    <svg id="gantt"></svg>
                </div>
            </div>

        </div>
        <div class="intro-y col-12 col-lg-3">
            <div class="intro-y box p-5">
                <div> 
                    <label for="regular-form-1" class="form-label">Titolo Task</label> 
                    <input id="regular-form-1" type="text" class="form-control" placeholder="Titolo task"> 
                </div>

                <div class="mt-3">
                    <label for="post-form-2" class="form-label">Inizio Task</label>
                    <input class="datepicker form-control w-56 d-block mx-auto" data-single-mode="true">

                </div>

                <div class="mt-3">
                    <label for="post-form-2" class="form-label">Fine Task</label>
                    <input class="datepicker form-control" id="post-form-2" data-single-mode="true">
                </div>

                <div class="mt-3">
                    <label for="post-form-3" class="form-label">Categories</label>
                    <select data-placeholder="Select categories" class="tom-select w-full" id="post-form-3" multiple>
                        <option value="1" selected>Horror</option>
                        <option value="2">Sci-fi</option>
                        <option value="3" selected>Action</option>
                        <option value="4">Drama</option>
                        <option value="5">Comedy</option>
                    </select>
                </div>
                <div class="mt-3">
                    <label for="post-form-4" class="form-label">Tags</label>
                    <select data-placeholder="Select your favorite actors" class="tom-select w-full" id="post-form-4"
                        multiple>
                        <option value="1" selected>Leonardo DiCaprio</option>
                        <option value="2">Johnny Deep</option>
                        <option value="3" selected>Robert Downey, Jr</option>
                        <option value="4">Samuel L. Jackson</option>
                        <option value="5">Morgan Freeman</option>
                    </select>
                </div>
                <div class="form-check form-switch flex-column align-items-start ps-0 mt-3">
                    <label for="post-form-5" class="form-check-label ms-0 mb-2">Published</label>
                    <input id="post-form-5" class="form-check-input ms-0" type="checkbox">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import Gantt from '@/assets/js/frappe-gantt'

export default {
    data() {
        return {
            tasks: [
                {
                    id: 'Task 1',
                    name: 'Redesign website',
                    start: '2024-01-01',
                    end: '2024-01-13',
                    progress: 20,
                    dependencies: '',
                    custom_class: 'bar-milestone' // optional
                },
                {
                    id: 'Task 2',
                    name: 'Redesign website',
                    start: '2024-01-13',
                    end: '2024-01-23',
                    progress: 20,
                    dependencies: 'Task 1',
                    custom_class: 'bar-milestone' // optional
                },
                {
                    id: 'Task 3',
                    name: 'Redesign website',
                    start: '2024-01-23',
                    end: '2024-01-30',
                    progress: 20,
                    dependencies: 'Task 2',
                    custom_class: 'bar-milestone' // optional
                }
            ]
        }
    },
    mounted() {
        new Gantt("#gantt", this.tasks, {
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
            language: 'it', // or 'es', 'it', 'ru', 'ptBr', 'fr', 'tr', 'zh', 'de', 'hu'
            custom_popup_html: null,
            on_click: function (task) {
                console.log(task);
            },
            on_date_change: function (task, start, end) {
                console.log(task, start, end);
            },
            on_progress_change: function (task, progress) {
                console.log(task, progress);
            },
            on_view_change: function (mode) {
                console.log(mode);
            }
        })
    }
}
</script>