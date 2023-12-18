import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Project, Task, GanttConfig } from '@/models/gantt'
import { useStorage } from '@vueuse/core'
import dayjs from 'dayjs'

export const useProjectsStore = defineStore('projects', {
    state: () => {
        return {
            _projects: useStorage('_projects', [] as Project[]),
        }
    },
    getters: {
        projects: (state) => state._projects, 
        project: (state) => (projectID: string) => {
            return state._projects.find(item => item.id === projectID)
        }, 
        tasks: (state) => (projectID: string) => {
            const project = state._projects.find(item => item.id === projectID)
            return project?.tasks
        }, 
        task: (state) => (projectID: string, taskID: string ) => {
            const project = state._projects.find(item => item.id === projectID)
            return project?.tasks.find(task => task.id === taskID)
        }
    },
    actions: {
        addProject(project: Project) {
            this._projects.push(project)
        },
        updateProject(project: Project) {
            const index = this._projects.findIndex(item => item.id === project.id);

            if (index !== -1) {
                this._projects.splice(index, 1, project);
            }
        },
        deleteProject(project: Project) {
            this._projects = this._projects.filter(item => item.id !== project.id)
        },
        addTask(projectID: string, task: Task) {
            const index = this._projects.findIndex(project => project.id === projectID)

            task.start = dayjs(task.start).format('YYYY-MM-DD')
            task.end = dayjs(task.end).format('YYYY-MM-DD')

            this.projects[index].tasks.push(task)
        },
        updateTask(id: string) {

        },
        deleteTask(id: string) {
            
        },
        getTasksTomSelect(projectID: string) {
            const index = this._projects.findIndex(project => project.id === projectID)

            const options = this._projects[index].tasks.map((item: Task) => ({
                value: item.id,
                text: item.name,
            }))

            return options
        }
    }
})