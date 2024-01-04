import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Project, Task, GanttConfig } from '@/models/gantt'
import { useLocalStorage, useStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import { db } from "@/firebase"
import { collection, addDoc, getDocs, updateDoc, doc, onSnapshot, arrayUnion, where, query } from "firebase/firestore"; 

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
        async getProjects() {
            this._projects = []
            
            const unsubscribe = onSnapshot(collection(db, "projects"), (doc) => {
                doc.forEach((doc) =>
                    this._projects.push(doc.data() as Project)
                );
            });

            console.log(unsubscribe)
        },
        async addProject(project: Project) {
            // this._projects.push(project)
            await addDoc(collection(db, "projects"), project)
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
        async addTask(projectID: string, task: Task) {
            // Esegui una query per trovare il documento con il campo specificato
            const querySnapshot = await getDocs(query(collection(db, "projects"), where("id", "==", projectID)));
        
            if (querySnapshot.empty) {
                return;
            }
        
            const docRef = querySnapshot.docs[0].ref;
        
            await updateDoc(docRef, {
                tasks: arrayUnion(task)
            });
        },
        
        updateTaskDates(projectID: string, task: Task, start: string, end: string) {
            const indexProject = this._projects.findIndex(project => project.id === projectID)

            if(indexProject == -1)
                return 
            
            const indexTask = this._projects[indexProject].tasks.findIndex(t => t.id === task.id)
            
            if(indexTask == -1)
                return 
            
            this._projects[indexProject].tasks[indexTask].start = dayjs(start)
            this._projects[indexProject].tasks[indexTask].end = dayjs(end)
                
            
        },
        updateTaskProgress(projectID: string, task: Task, progress: number){

        },
        deleteTask(projectID: string, task: Task) {
            
        },
        getTasksTomSelect(projectID: string) {
            const index = this._projects.findIndex(project => project.id === projectID)

            if(index == -1)
                return []
            
                const options = this._projects[index].tasks.map((item: Task) => ({
                value: item.id,
                text: item.name,
            }))

            return options
        }
    }
})