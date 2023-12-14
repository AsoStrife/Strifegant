<template>
    <label for="dependencies" class="form-label">Dipendenze</label>
    <select id="dependencies" multiple
        data-placeholder="Seleziona le dipendenze" 
        class="tom-select w-full"
        >
    </select>
</template>

<script lang="ts">
import TomSelect from "tom-select"
import { useGanttStore } from '@/stores/gantt'

export default {
    name: 'DependenciesTask',
    props: ['modelValue'],
    emits: ['update:tom-select-dependencies'],
    data() {
        return {
            ts: {} as any,
            options: {} as any,
            ganttStore: useGanttStore(),
            task: {
                dependencies: []
            },
            selectedValues: []
        }
    },
    watch: {
        modelValue(newValue) {
            this.updateOptions()
        },
        options(newOptions) {
            this.updateOptions()
        }
    },
    mounted() {
        this.initialize()

        this.ganttStore.$subscribe(() => {
            // this.updateOptions()
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

            this.ts = new TomSelect("#dependencies", this.options)

            this.updateOptions()

            this.ts.on('item_add', this.handleChange)
            this.ts.on('item_remove', this.handleChange)
        },
        updateOptions() {
            const options = this.ganttStore.getTasksTomSelect()

            this.ts.clear(true)
            this.ts.clearOptions()
            options.forEach((o: any) => {
                this.ts.registerOption(o)
            })
            
            this.ts.refreshOptions(false)

            this.ts.setValue(this.modelValue)
        },
        handleChange() {
            this.$emit('update:tom-select-dependencies', this.ts.getValue())
        }
    }
}
</script>