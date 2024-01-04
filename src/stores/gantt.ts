import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task, GanttConfig } from '@/models/gantt'
import dayjs from 'dayjs'

export const useGanttStore = defineStore('gantt', {
    state: () => {
        return {
            _tasks: [] as Task[],
            _config: {} as GanttConfig
        }
    },
    getters: {
        tasks: (state) => state._tasks,
        config: (state) => state._config
    },
    actions: {
        addTask(task: Task) {
            task.start = dayjs(task.start)
            task.end = dayjs(task.end)
            this._tasks.push(task)
        },
        updateTask(id: string) {

        },
        deleteTask(id: string) {
            
        },
        getTasksTomSelect() {
            const options = this._tasks.map((item: Task) => ({
                value: item.id,
                text: item.name,
            }))
            return options
        }
    }
})