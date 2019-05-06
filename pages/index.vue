
<template>
  <div>
      <h1 class="visually-hidden">Home page of Merry Mop, a small cleaning service provider in Copenhagen</h1>
      <section class="c-section">
        <h2 class="c-section__title">Merry Mop represents a small team of experienced cleaning professionals operating in Copenhagen.<br>We decided to stand out in the crowded cleaning market through delivering decent services.</h2>
      </section>
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'index'
    }
  },
  // transition: {
  //   css: false,
  //   beforeLeave(el) {
  //     }
  // },
  beforeRouteLeave (to, from, next) {
    this.$root.$emit('transition', to);
    next();
  }
}
</script>
<style lang="scss">
  .index {
    background-color: green;
  }
</style>
