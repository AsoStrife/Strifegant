<template>
    <label for="dependencies" class="form-label">Dipendenze</label>
    <select id="dependencies" multiple
        data-placeholder="Seleziona le dipendenze" 
        class="tom-select w-full">
        <!-- <option value="Prova" selected> Prova </option> -->
        <!-- <option v-for="task in this.ganttStore.tasks" v-bind:key="task.id" :value="task.id"> {{ task.name }}</option> -->
    </select>
</template>

<script lang="ts">
import TomSelect from "tom-select"
import { useGanttStore } from '@/stores/gantt'
import feather from "feather-icons"

export default {
    name: 'DependenciesTask',
    props: ['modelValue'],
    emits: ['update:tom-select-dependencies'],
    data() {
        return {
            ts: {},
            options: {},
            ganttStore: useGanttStore(),
            task: {
                dependencies: []
            },
            selectedValues: []
        }
    },
    watch: {
        modelValue(newValue) {
            this.updateOptions(newValue)
        },
        options(newOptions) {
            this.updateOptions()
        },
    },
    mounted() {
        this.initialize()

        this.ganttStore.$subscribe(() => {
            // this.updateOptions()
        })

        feather.replace({
        "stroke-width": 1.5,
    })
    },
    methods: {
        initialize() {
            this.options = {
                plugins: ['remove_button'],
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

            this.ts.on('item_add', this.handleInput)
        },
        updateOptions(value: any) {
            const options = this.ganttStore.getTasksTomSelect()

            this.ts.clear(true)
            this.ts.clearOptions()
            options.forEach((o: any) => {
                this.ts.registerOption(o)
            })
            
            this.ts.refreshOptions(false)

            this.ts.setValue(this.modelValue)
        },
        handleInput(input: any){
            if (input == '') return

            // this.$emit('update:tom-select-dependencies', input)
            // this.selectedValues.push(input)
            // this.ts.clear()
        }
    }
}
</script>