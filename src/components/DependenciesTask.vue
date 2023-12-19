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
import { useProjectsStore } from '@/stores/projects'

export default {
    name: 'DependenciesTask',
    props: ['modelValue'],
    watch: {
        '$route.params': 'updateProjectID'
    },
    emits: ['update:tom-select-dependencies'],
    data() {
        return {
            ts: undefined as any,
            options: {} as any,
            projectsStore: useProjectsStore(),
            task: {
                dependencies: []
            },
            selectedValues: [],
            projectID: ''
        }
    },
    mounted() {
        this.updateProjectID()

        this.initialize()

        this.projectsStore.$subscribe(() => {
            this.updateOptions()
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
            const options = this.projectsStore.getTasksTomSelect(this.projectID).map(a => Object.assign({}, a))

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
        },
        updateProjectID() {
            this.projectID = this.$route.params.id as string
            
            if(this.ts != undefined)
                this.updateOptions()

        }
        
    }
}
</script>