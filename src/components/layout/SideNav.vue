<template>
    <nav class="side-nav">
        <ul>
            <li>
                <router-link to="" class="side-menu side-menu--active side-menu--open">
                    <div class="side-menu__icon"> <i data-feather="home"></i> </div>
                    <div class="side-menu__title">
                        Dashboard
                        <div class="side-menu__sub-icon"> <i class="fa-solid fa-chevron-up"></i> </div>
                    </div>
                </router-link>
                <ul class="side-menu__sub-open">
                    <li>
                        <router-link to="" class="side-menu side-menu--active side-menu--open">
                            <div class="side-menu__icon"> <i class="fa-solid fa-chart-line"></i> </div>
                            <div class="side-menu__title"> Overview 1 </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="" class="side-menu">
                            <div class="side-menu__icon"> <i class="fa-solid fa-chart-line"></i> </div>
                            <div class="side-menu__title"> Overview 2 </div>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>
<script lang="ts">
import cash from "cash-dom"
import Velocity from "velocity-animate"

export default {
    mounted() {

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
        
    }
}
</script>