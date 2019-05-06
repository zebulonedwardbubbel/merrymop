<template>
  <div>
    <h1>Contacts</h1>
    <h2>Elérhetőségek, meg egy jó kis email form lesz itt</h2>
  </div>
</template>

<script>
import { TimelineLite, TweenLite, Power3 } from "gsap";
import getHypotenuse from "~/assets/js/get-hypotenuse";

export default {
  head() {
    return {
      title: "Contacts",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Get in touch with our professional cleaning team in Copenhagen | hello@merrymop.dk"
        }
      ],
      bodyAttrs: {
        class: 'contacts'
      }
    };
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
.contacts {
  background-color: gray;
}
</style>