import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task, GanttConfig } from '@/models/gantt'

export const useGanttStore = defineStore('gantt', {
    state: () => {
        return {
            _task: [] as Task[],
            _config: {} as GanttConfig
        }
    },
    getters: {
        task: (state) => state._task,
        config: (state) => state._config
    },
    actions: {
    }
})