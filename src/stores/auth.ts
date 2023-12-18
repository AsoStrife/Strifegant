import { defineStore } from 'pinia'
import axios from 'axios'
import type { Project } from '@/models/gantt'
import { useStorage } from '@vueuse/core'
import { backendRoutes } from '@/config/backend'

export const useAuthStore = defineStore('auths', {
    state: () => {
        return {
					_jwt: useStorage('jwt', undefined as undefined | string),
        }
    },
    getters: {
			isLogged: (state) => state._jwt != undefined,
			axiosAuthHeader: (state) => {
				return {
					headers: {
						Authorization: `Bearer ${state._jwt}`
					}
				}
			}
    },
    actions: {
			async login(username: string, password: string) {
				const data = {
					identifier: username,
					password: password
				}
				const response = await axios.post(backendRoutes.auth.login, data)
				this._jwt = response.data.jwt
			},
			async logout(){
				this._jwt = undefined
			}
    }
})