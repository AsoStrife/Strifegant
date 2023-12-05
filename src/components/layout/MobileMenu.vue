<template>
    <div class="mobile-menu d-md-none">
        <div class="mobile-menu-bar">
            <router-link to="" class="d-flex me-auto">
                <img alt="Icewall Bootstrap HTML Admin Template" class="w-6" src="@/assets/images/logo.svg">
            </router-link>
            <router-link to="#" id="mobile-menu-toggler" class="mobile-menu-bar__toggler"> 
                <i class="fa-solid fa-bars w-8 h-6 text-white"></i>
            </router-link>
        </div>
        <ul class="mobile-menu-wrapper border-top border-theme-2 dark-border-dark-3 py-5">
            <li>
                <router-link to="#" class="menu menu--active">
                    <div class="menu__icon"> <i data-feather="home"></i> </div>
                    <div class="menu__title"> 
                        Dashboard 
                        <i class="fa-solid fa-chevron-up menu__sub-icon menu__sub-icon--active"></i> 
                    </div>
                </router-link>
                <ul class="menu__sub-open">
                    <li>
                        <router-link to="" class="menu menu--active">
                            <div class="menu__icon"> <i class="fa-solid fa-chart-line"></i> </div>
                            <div class="menu__title"> Overview 1 </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="" class="menu">
                            <div class="menu__icon"> <i class="fa-solid fa-chart-line"></i> </div>
                            <div class="menu__title"> Overview 2 </div>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import cash from "cash-dom"
import Velocity from "velocity-animate"

export default {
    mounted() {
        cash("#mobile-menu-toggler").on("click", function () {
        if (cash(".mobile-menu").find("ul").first()[0].offsetParent !== null) {
            Velocity(cash(".mobile-menu").find("ul").first(), "slideUp");
        } else {
            Velocity(cash(".mobile-menu").find("ul").first(), "slideDown");
        }
    });

    cash(".mobile-menu")
        .find(".menu")
        .on("click", function () {
            if (cash(this).parent().find("ul").length) {
                if (
                    cash(this).parent().find("ul").first()[0].offsetParent !==
                    null
                ) {
                    cash(this)
                        .find(".menu__sub-icon")
                        .removeClass("menu__sub-icon--active");
                    Velocity(
                        cash(this).parent().find("ul").first(),
                        "slideUp",
                        {
                            duration: 300,
                            complete: function (el) {
                                cash(this).removeClass("menu__sub-open");
                            },
                        }
                    );
                } else {
                    cash(this)
                        .find(".menu__sub-icon")
                        .addClass("menu__sub-icon--active");
                    Velocity(
                        cash(this).parent().find("ul").first(),
                        "slideDown",
                        {
                            duration: 300,
                            complete: function (el) {
                                cash(this).addClass("menu__sub-open");
                            },
                        }
                    );
                }
            }
        });
    }
}
</script>