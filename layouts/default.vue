<template>
    <div>
        <header class="l-header">
            <Navigation />
        </header>
        <main>
            <nuxt/>
        </main>
        <PageTransition/>
    </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue';
import PageTransition from '~/components/PageTransition.vue';

export default {
    components: {
        Navigation,
        PageTransition
    }
};
</script>

<style>

</style>