<template>
    <label for="dependencies" class="form-label">Dipendenze</label>
    <select id="dependencies" data-placeholder="Select categories" class="tom-select w-full" multiple v-model="task.dependencies">
        <!-- <option v-for="task in this.ganttStore.tasks" v-bind:key="task.id" :value="task.id"> {{ task.name }}</option> -->
    </select>
</template>

<script lang="ts">
import TomSelect from "tom-select"
import { useGanttStore } from '@/stores/gantt'

export default {
    name: 'DependenciesTask',
    data() {
        return {
            ts: {},
            options: {},
            ganttStore: useGanttStore(),
            task: {
                dependencies: []
            }
        }
    },
    mounted() {
        this.initialize()

        this.ganttStore.$subscribe(() => {
            this.updateOptions()
        })
    },
    methods: {
        initialize() {
            this.options = {
                plugins: {
                    dropdown_input: {},
                },
            }

            if (cash(this).data("placeholder")) {
                this.options.placeholder = cash(this).data("placeholder")
            }

            if (cash(this).attr("multiple") !== undefined) {
                this.options = {
                    ...this.options,
                    plugins: {
                        ...options.plugins,
                        remove_button: {
                            title: "Remove this item",
                        },
                    },
                    persist: false,
                    create: true,
                    onDelete: function (values) {
                        return confirm(
                            values.length > 1
                                ? "Are you sure you want to remove these " +
                                values.length +
                                " items?"
                                : 'Are you sure you want to remove "' +
                                values[0] +
                                '"?'
                        )
                    },
                }
            }

            if (cash(this).data("header")) {
                this.options = {
                    ...this.options,
                    plugins: {
                        ...this.options.plugins,
                        dropdown_header: {
                            title: cash(this).data("header"),
                        },
                    },
                }
            }

            this.ts = new TomSelect("#dependencies", this.options)
            this.updateOptions()
        },
        updateOptions() {
            const options = this.ganttStore.getTasksTomSelect()

            this.ts.clear(true)
            this.ts.clearOptions()
            options.forEach((o: any) => {
                this.ts.registerOption(o)
            })
            this.ts.refreshOptions(false)
        }
    }
}
</script>