import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Project } from '@/models/gantt'
import { useStorage } from '@vueuse/core'

export const useProjectsStore = defineStore('projects', {
    state: () => {
        return {
            _projects: useStorage('_projects', [] as Project[]),
        }
    },
    getters: {
        projects: (state) => state._projects, 
        project: (state) => (id: string) => {
            return state._projects.find(item => item.id === id);
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
        }
    }
})