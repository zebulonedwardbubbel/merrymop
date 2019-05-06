<template>
  <div>
    <h1>Pricing</h1>
    <h2>Itt írunk majd arról, mi-mennyi...</h2>
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'pricing'
    }
  },
  // transition: {
  //   css: false,
  //   beforeLeave(el) {
  //     this.$root.$emit('transition', {});
  //   }
  // }
  beforeRouteLeave(to, from, next) {
    this.$root.$emit("transition", to);
    next();
  }
};
</script>

<style lang="scss">
.pricing {
  background-color: black;
}
</style>
