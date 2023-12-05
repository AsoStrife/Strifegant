<template>
    <div
        class="top-bar-boxed border-bottom border-theme-2 dark-border-dark-3 mt-n7 mt-md-n5 mx-n3 mx-sm-n8 px-3 px-sm-8 mb-12">
        <div class="h-full d-flex align-items-center">
            <!-- BEGIN: Logo -->
            <router-link to="" class="-intro-x d-none d-md-flex">
                <img alt="Icewall Bootstrap HTML Admin Template" class="w-6" src="@/assets/images/logo.svg">
                <span class="text-white fs-lg ms-3"> Ice<span class="fw-medium">wall</span> </span>
            </router-link>
            <!-- END: Logo -->
            <!-- BEGIN: Breadcrumb -->
            <div class="-intro-x breadcrumb me-auto"> 
                <router-link to="">Application</router-link> 
                <i class="fa-solid fa-chevron-right breadcrumb__icon"></i>
                <router-link to="" class="breadcrumb--active">Dashboard</router-link> 
            </div>
            <!-- END: Breadcrumb -->

            <!-- BEGIN: Account Menu -->
            <div class="account-menu intro-x dropdown w-8 h-8">
                <div class="dropdown-toggle w-8 h-8 rounded-pill overflow-hidden shadow-lg image-fit zoom-in" role="button"
                    aria-expanded="false" data-bs-toggle="dropdown">
                    <img alt="Icewall Bootstrap HTML Admin Template" src="@/assets/images/profile-13.jpg">
                </div>
                <div class="dropdown-menu w-56">
                    <ul class="dropdown-content bg-theme-11 dark-bg-dark-6">
                        <li class="p-2">
                            <div class="fw-medium text-white">Denzel Washington</div>
                            <div class="fs-xs text-theme-13 mt-0.5 dark-text-gray-600">Frontend Engineer</div>
                        </li>
                        <li>
                            <hr class="dropdown-divider border-theme-12 dark-border-dark-3">
                        </li>
                        <li>
                            <router-link to="" class="dropdown-item text-white bg-theme-1-hover dark-bg-dark-3-hover"> 
                                <i class="fa-regular fa-user w-4 h-4 me-2"></i>Profile </router-link>
                        </li>
                        <li>
                            <hr class="dropdown-divider border-theme-12 dark-border-dark-3">
                        </li>
                        <li>
                            <router-link to="" class="dropdown-item text-white bg-theme-1-hover dark-bg-dark-3-hover"> 
                                <i class="fa-solid fa-arrow-right-from-bracket w-4 h-4 me-2"></i> Logout 
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- END: Account Menu -->
        </div>
    </div>
</template>


<script setup lang="ts">
</script>