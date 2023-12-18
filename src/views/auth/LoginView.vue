<template>
	<div class="container px-sm-10">
			<div class="grid columns-2 gap-4">
					<!-- BEGIN: Login Info -->
					<div class="g-col-2 g-col-xl-1 d-none d-xl-flex flex-column min-vh-screen">
							<a href="" class="-intro-x d-flex align-items-center pt-5">
									<span class="text-white fs-lg ms-3"> Gantt </span>
							</a>
					</div>
					<!-- END: Login Info -->

					<!-- BEGIN: Login Form -->
					<form class="g-col-2 g-col-xl-1 h-screen h-xl-auto d-flex py-5 py-xl-0 my-10 my-xl-0" @submit.prevent="login">
							<div class="my-auto mx-auto ms-xl-20 bg-white dark-bg-dark-1 bg-xl-transparent px-5 px-sm-8 py-8 p-xl-0 rounded-2 shadow-md shadow-xl-none w-full w-sm-3/4 w-lg-2/4 w-xl-auto">
									<h2 class="intro-x fw-bold fs-2xl fs-xl-3xl text-center text-xl-start">
											Sign In
									</h2>
									<div class="intro-x mt-2 text-gray-500 d-xl-none text-center">Accedi</div>
									<div class="intro-x mt-8">
											<input type="text" class="intro-x login__input form-control py-3 px-4 border-gray-300 d-block" placeholder="Email" v-model="email">
											<input type="password" class="intro-x login__input form-control py-3 px-4 border-gray-300 d-block mt-4" placeholder="Password" v-model="password">
									</div>
									<div class="intro-x mt-5 mt-xl-8 text-center text-xl-start">
											<button class="btn btn-primary py-3 px-4 w-full w-xl-32 me-xl-3 align-top" @click="login">Login</button>
									</div>
							</div>
					</form>
					<!-- END: Login Form -->
			</div>
	</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
	data() {
			return {
					store: useAuthStore(),
					email: '',
					password: '',
					errorMessage: '',
					isLoading: false,
			}
	},
	mounted() {
			document.body.classList.remove('main')
			document.body.classList.add('login')
	},
	unmounted() {
			document.body.classList.remove('login')
			document.body.classList.add('main')
	},
	methods: {
			async login() {
					if (this.isLoading) return
					this.isLoading = true
					try {
							this.errorMessage = ''
							await this.store.login(this.email, this.password)
							this.$router.push({ name: 'dashboard' })
					} catch (error: any) {
							console.error(error)
							this.errorMessage = ''
					}
					this.isLoading = false
			},
	},
})
</script>
