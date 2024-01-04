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
            return new Promise((resolve, reject) => {
                try{
                    onSnapshot(collection(db, "projects"), (docs) => {
                        docs.forEach((doc) =>{
                            const data = doc.data() as Project;
                            console.log(data)

                            const existingProjectIndex = this._projects.findIndex((p) => p.id == data.id);
                            console.log(existingProjectIndex)
                            if (existingProjectIndex !== -1) {
                                // Se il progetto esiste già, aggiorna i dati
                                this._projects[existingProjectIndex] = data;
                            } else {
                                // Se il progetto non esiste, aggiungi i nuovi dati
                                this._projects.push(data);
                            }
                            console.log(this._projects)
                        });
                    });
                    this._projects = this._projects.sort((a, b) => a.name.localeCompare(b.name))
                    resolve(this._projects)
                }catch(error){
                    reject(error)
                }

            })
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
        async updateTask(projectID: string, task: Task) {
            const tasks = Object.assign(this.tasks(projectID) as Task[]) as Task[]
            const index = tasks.findIndex(item => item.id === task.id);
            tasks.splice(index, 1, task)
            console.log(tasks)
            const querySnapshot = await getDocs(
                query(collection(db, "projects"), 
                where("id", "==", projectID))
            );
            
            console.log(querySnapshot)
            if (querySnapshot.empty) {
                return;
            }

            const doc = querySnapshot.docs[0];

            const project = doc.data() as Project;
            const taskToFind = project.tasks.find(item => item.id === task.id) as Task
            console.log(taskToFind)
            if(taskToFind){
                const docRef = doc.ref;
                updateDoc(docRef, {
                    tasks: tasks
                });
            }

           
           
        },
        async addTask(projectID: string, task: Task) {
            try {
                const tasks = Object.assign(this._projects.find(item => item.id === projectID)?.tasks as Task[])
                tasks.push(task)

                const querySnapshot = await getDocs(
                    query(collection(db, "projects"), 
                    where("id", "==", projectID))
                );
                
                if (querySnapshot.empty) {
                    return;
                }
                
                const docRef = querySnapshot.docs[0].ref;
    
                await updateDoc(docRef, {
                    tasks: arrayUnion(tasks)
                });
            } catch (error) {
                console.log(error)
            }
        },
        
        updateTaskDates(projectID: string, task: Task, start: string, end: string) {
            const indexProject = this._projects.findIndex(project => project.id === projectID)

            if(indexProject == -1)
                return 
            
            const indexTask = this._projects[indexProject].tasks.findIndex(t => t.id === task.id)
            
            if(indexTask == -1)
                return 
            
            this._projects[indexProject].tasks[indexTask].start = start
            this._projects[indexProject].tasks[indexTask].end = end
                
            this.updateTask(projectID, this._projects[indexProject].tasks[indexTask])
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