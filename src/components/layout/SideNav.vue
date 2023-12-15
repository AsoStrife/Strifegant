<template>
    <nav class="side-nav">
        <ul>
            <li>
                <router-link to="" class="side-menu" :class="isMainMenuProjectActive()">
                    <div class="side-menu__icon"> <i class="fa-solid fa-home"></i> </div>
                    <div class="side-menu__title">
                        {{ $t('sideMenu.projects') }}
                        <!-- <div class="side-menu__sub-icon"> <i class="fa-solid fa-chevron-up"></i> </div> -->
                        <div class="side-menu__sub-icon"> <i class="fa-solid fa-chevron-down"></i> </div>
                    </div>
                </router-link>
                <ul :class="isMainMenuProjectOpen()">
                    <li v-for="p in projectStore.projects" v-bind:key="p.id">
                        <router-link :to="'/project/' + p.id" class="side-menu side-menu-sub-project" :class="isSubMenuProjectActive(p.id)">
                            <div class="side-menu__icon"> <i class="fa-solid fa-chart-line"></i> </div>
                            <div class="side-menu__title"> {{ p.name }} </div>
                        </router-link>
                    </li>
                    
                </ul>
            </li>
            <li class="menu__devider my-6"></li>
            <li>
                <router-link to="#" class="side-menu" data-bs-toggle="modal" data-bs-target="#add-project-modal">
                    <div class="side-menu__icon"> <i class="fa-solid fa-plus"></i> </div>
                    <div class="side-menu__title">
                        {{ $t('sideMenu.addProject') }}
                    </div>
                </router-link>
            </li>
        </ul>
    </nav>
</template>
<script lang="ts">
import cash from "cash-dom"
import Velocity from "velocity-animate"
import { useProjectsStore } from "@/stores/projects"
export default {
    data() {
        return {
            projectStore: useProjectsStore(),
            currentPath: '' as string,
            projectID: '' as string | string[]
        }
    },
    mounted() {
        this.currentPath = this.$route.path
        this.projectID = this.$route.params.id

        cash(".side-menu").on("click", function () {
            if (cash(this).parent().find("ul").length) {
                if (
                    cash(this).parent().find("ul").first()[0].offsetParent !== null
                ) {
                    cash(this).removeClass("side-menu--open");
                    Velocity(cash(this).parent().find("ul").first(), "slideUp", {
                        duration: 300,
                        complete: function (el) {
                            cash(el).removeClass("side-menu__sub-open");
                        },
                    });
                } else {
                    cash(this).addClass("side-menu--open");
                    Velocity(cash(this).parent().find("ul").first(), "slideDown", {
                        duration: 300,
                        complete: function (el) {
                            cash(el).addClass("side-menu__sub-open");
                        },
                    });
                }
            }
        })

        // Aggiorno il submenù active con i router-link 
        cash(".side-menu-sub-project").on("click", function () {
            cash(".side-menu-sub-project").removeClass('side-menu--active')
            cash(this).addClass('side-menu--active')
        })

    },
    methods: {
        isMainMenuProjectOpen(){
            return this.currentPath.includes('/project') ? 'side-menu__sub-open' : ''
        },
        isMainMenuProjectActive() {
            return this.currentPath.includes('/project') ? 'side-menu--active' : ''
        },
        isSubMenuProjectActive(currentID: string) {
            return this.projectID == currentID ? 'side-menu--active' : ''
        }
    }
}
</script>