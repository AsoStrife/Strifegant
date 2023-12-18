<template>
    <div class="container">
        <!-- BEGIN: Error Page -->
        <div
            class="error-page d-flex flex-column flex-lg-row align-items-center justify-content-center h-screen text-center text-lg-start">
            <div class="-intro-x me-lg-20">
                <img alt="Error 404 Image" class="h-48 h-lg-auto"
                    src="@/assets/images/error-illustration.svg">
            </div>
            <div class="text-white mt-10 mt-lg-0">
                <div class="intro-x fs-8xl fw-medium">{{ $t('general.err_404') }}</div>
                <div class="intro-x fs-xl fs-lg-3xl fw-medium mt-5">{{ $t('general.err_404_t1') }}</div>
                <div class="intro-x fs-lg mt-3">{{ $t('general.err_404_t2') }}</div>
                <router-link to="/"
                    class="intro-x btn py-3 px-4 text-white border-white dark-border-dark-5 dark-text-gray-300 mt-10">{{ $t('general.backToHome') }}</router-link>
            </div>
        </div>
        <!-- END: Error Page -->
    </div>
</template>

<script lang="ts">
export default {

}
</script>