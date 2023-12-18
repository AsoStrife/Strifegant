<template>
	<div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
	async mounted() {
		await useAuthStore().logout()
		this.$router.push({ name: 'login' })
	}
})
</script>