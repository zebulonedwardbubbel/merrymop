<template>
    <div>
        <header class="l-header">
            <Navigation />
        </header>
        <main>
            <nuxt/>
        </main>
    </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue';

export default {
    components: {
        Navigation
    }
};
</script>

<style>

</style>