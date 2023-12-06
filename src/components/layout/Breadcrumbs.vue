<template>
    <div class="-intro-x breadcrumb me-auto">
        <!-- <router-link to="">Application</router-link>
        <router-link to="" class="breadcrumb--active">Dashboard</router-link> -->
        
        
        <div v-for="(b, i) in currentRoute?.meta?.breadcrumbs" :key="i">
            <router-link :to="{name: b?.name}" :class="activeClass(i)"> {{$t(b?.i18n)}} </router-link>
            <i class="fa-solid fa-chevron-right breadcrumb__icon" v-if="hasNext(i)"></i>
        </div>
    </div>
</template>

<script lang="ts">
import breadcrumbs from '@/router/breadcrumbs';


export default {
    name: "Breadcrumbs",
    components: { },
    data() {
        return {
            currentRoute: {} as any,
            breadcrumbs: []
        }
    },
    mounted() {
        this.currentRoute = this.$route
        this.breadcrumbs = this.currentRoute?.meta?.breadcrumbs
    },
    watch: {
        $route(to, from) {
            this.currentRoute = to
        },
    },
    methods: {
        hasNext(index: number) {
            return index + 1 < this.currentRoute?.meta?.breadcrumbs.length
        }, 
        activeClass(index: number){
            return index + 1 < this.currentRoute?.meta?.breadcrumbs.length ? '': 'breadcrumb--active'
        }
    }
}
</script>