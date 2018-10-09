<template>
  <div
    class="nav"
    v-bind:class="[isActive ? 'is-active' : '', isAnimated ? 'is-animated' : '']">
    <button class="nav__toggle hamburger" ref="navToggle" @click="navToggle" v-bind:aria-expanded="isActive" v-bind:class="[isActive ? 'hamburger--opened' : '']">
      <span class="hamburger__line"></span>
    </button>
    <nav class="nav__inner">
      <ul class="nav__list">
        <li class="nav__item">
          <nuxt-link exact to="/" class="nav__link">home</nuxt-link>
          <span class="nav__text">Jump to the opening page</span>
        </li>
        <li class="nav__item">
          <nuxt-link to="/pricing" class="nav__link">pricing</nuxt-link>
          <span class="nav__text">Check our pricing method</span>
        </li>
        <li class="nav__item">
          <nuxt-link to="/contacts" class="nav__link">contacts</nuxt-link>
          <span class="nav__text">Get in touch with us</span>
        </li>
      </ul>
    </nav>
    <canvas class="nav__canvas" ref="navCanvas"></canvas>
  </div>
</template>
<script>
import { Power4, TimelineLite } from 'gsap';
export default {
    data() {
        return {
            isActive: false,
            isAnimated: false
        };
    },
    methods: {
        navToggle: function() {
            const $navToggle = this.$refs.navToggle;
            const $navToggleRect = $navToggle.getBoundingClientRect();
            const x = $navToggleRect.left + 18;
            const y = $navToggleRect.bottom - 18;
            const $canvas = this.$refs.navCanvas;
            const $ctx = $canvas.getContext('2d');
            const $width = ($canvas.width = window.innerWidth);
            const $height = ($canvas.height = window.innerHeight);

            const radius = Math.sqrt(
                Math.pow(x, 2) + Math.pow(window.innerHeight - y, 2)
            );

            const circle = {
                radius: 0,
                x: x,
                y: y
            };

            const circle2 = {
                radius: radius,
                x: x,
                y: y
            };

            function drawCircle() {
                $ctx.beginPath();
                $ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
                $ctx.fillStyle = '#007ac1';
                $ctx.fill();
                $ctx.closePath();
            }

            function closeCircle() {
                $ctx.clearRect(0, 0, $width, $height);
                $ctx.beginPath();
                $ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
                $ctx.fillStyle = '#007ac1';
                $ctx.fill();
                $ctx.closePath();
            }

            if (!this.isActive) {
                const tl = new TimelineLite({
                    onUpdate: drawCircle.bind(circle)
                });
                tl.to(circle, 1, {
                    onStart: () => {
                        this.isActive = true;
                        this.isAnimated = true;
                    },
                    radius: radius,
                    ease: Power4.easeOut,
                    onComplete: () => {
                        this.isAnimated = false;
                    }
                });
            } else {
                const tl = new TimelineLite({
                    onUpdate: closeCircle.bind(circle2)
                });
                tl.to(circle2, 0.75, {
                    onStart: () => {
                        this.isActive = false;
                        this.isAnimated = true;
                    },
                    radius: 0,
                    ease: Power4.easeOut,
                    onComplete: () => {
                        this.isAnimated = false;
                    }
                });
            }
        }
    },
    mounted: function() {
        this.$root.$on('closeNav', (isActive) => {
            this.isActive = false;
            window.setTimeout(() => {
                const $canvas = document.querySelector('.nav__canvas');
                const $ctx = $canvas.getContext('2d');
                const $width = ($canvas.width = window.innerWidth);
                const $height = ($canvas.height = window.innerHeight);
                $ctx.clearRect(0, 0, $width, $height);
            }, 1000);
        });
    }
};
</script>

<style lang="scss">
@import "../assets/scss/globals/_variables.scss";
@import "../assets/scss/globals/_mixins.scss";

.nav {
  $this: &;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  pointer-events: none;

  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateZ(0);
    opacity: 0;
    visibility: hidden;
    transition: opacity .6s cubic-bezier(0.23, 1, 0.32, 1),
                visibility .6s cubic-bezier(0.23, 1, 0.32, 1);

    .is-active & {
      opacity: 1;
      visibility: visible;
      z-index: 90;
    }

    .is-animated & {
      // transition: opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1),
      //   visibility 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    }
  }

  &__toggle {
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    outline: none;
    z-index: 1000;
  }

  &__logo {
    width: 48px;
    height: 48px;
    margin: 1rem;
    fill: #ffea00;
  }

  &__toggle,
  &__item {
    pointer-events: auto;
  }

  &__item {
    margin-bottom: 1rem;
    text-align: center;
    opacity: 0;
    transform-origin: center center;
    transform: translateY(40px) rotateX(30deg) translateZ(10px);

    &:not(:last-child) {
    }

    &:hover #{$this}__link {
      color: $color-secondary;
      transition: 0.2s color ease;
    }

    .is-active & {
      opacity: 1;
      transform: translateY(0) rotateX(0) translateZ(0);
    }
  }

  &__link {
    padding: 1rem 1rem 0;
    font-size: 32px;
    line-height: 1.2;
    text-decoration: none;
    color: #fff;

    &:visited {
      color: #fff;
    }

    &.nuxt-link-active {
      color: $color-secondary;
    }

    @include mq(desktop) {
      font-size: 64px;
    }
  }

  &__text {
    display: block;
    font-size: 12px;
    color: #ffff56;
  }

  &__canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  &.is-active {
    @for $i from 1 through 3 {
      .nav__item:nth-child(#{$i}) {
        transition: opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1) #{$i * 0.1s},
          transform 1.2s cubic-bezier(0.23, 1, 0.32, 1) #{$i * 0.1s};
      }
    }
  }
}
</style>
