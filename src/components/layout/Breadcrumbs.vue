<template>
    <div class="-intro-x breadcrumb me-auto">
        <nav aria-label="breadcrumb" class="-intro-x h-full mr-auto">
            <ol class="breadcrumb breadcrumb-light">

                <li class="breadcrumb-item" v-for="(b, i) in currentRoute?.meta?.breadcrumbs" :key="i">
                    <router-link :to="{ name: b?.name }">
                        {{ $t(b?.i18n) }}
                    </router-link>
                </li>
            </ol>
        </nav>
    </div>
</template>

<script lang="ts">
import breadcrumbs from '@/router/breadcrumbs';


export default {
    name: "Breadcrumbs",
    components: {},
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
        activeClass(index: number) {
            return index + 1 < this.currentRoute?.meta?.breadcrumbs.length ? '' : 'breadcrumb--active'
        }
    }
}
</script>