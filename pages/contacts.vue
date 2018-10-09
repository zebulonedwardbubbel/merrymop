<template>
  <div>
    <main class="">
      <h1>Contacts</h1>
      <h2>Elérhetőségek, meg egy jó kis email form lesz itt</h2>
    </main>
    <div class="c-page-transition">
        <canvas class="c-page-transition__canvas" ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { TimelineLite, TweenLite, Power3 } from 'gsap';
import getHypotenuse from '~/assets/js/get-hypotenuse';

export default {
    head() {
        return {
            title: 'Contacts',
            meta: [
                { hid: 'description', name: 'description', content: 'Get in touch with our professional cleaning team in Copenhagen | hello@merrymop.dk' }
            ]
        }
    },
    created() {},
    mounted() {
        window.addEventListener('mousemove', this.setCenter, false);
        this.$el.canvas = this.$refs.canvas;
    },
    methods: {
        setCenter: function(event) {
            this.$el.centerX = event.clientX;
            this.$el.centerY = event.clientY;
        }
    },
    transition: {
        mode: 'out-in',
        css: false,
        enter(el, done) {
            TweenLite.set(['h1', 'h2'], {
                autoAlpha: 0,
                y: 36
            });
            const tl = new TimelineLite({
                onComplete: done
            });
            tl.to('h1', .75, {
                autoAlpha: 1,
                y: 0
            });
            tl.to('h2', .75, {
                autoAlpha: 1,
                y: 0
            }, '-=0.25');
        },
        beforeLeave(el) {},
        leave(el, done) {
            console.log('leaving contacts!');
            const $canvas = this.$el.canvas;
            const $ctx = $canvas.getContext('2d');
            const $width = $canvas.width = window.innerWidth;
            const $height = $canvas.height = window.innerHeight;
            const radius = getHypotenuse.hypotenuse(this.$el.centerX, this.$el.centerY, $width, $height);
            const circle = {
                radius: 0,
                radius2: 0,
                circleColor2: '#03a9f4',
                x: this.$el.centerX,
                y: this.$el.centerY
            };

            function drawCircle() {
                // circle #1
                $ctx.beginPath();
                $ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                $ctx.fillStyle = '#fff';
                $ctx.fill();
                $ctx.closePath();
                // circle #2
                $ctx.beginPath();
                $ctx.arc(this.x, this.y, this.radius2, 0, 2 * Math.PI);
                $ctx.fillStyle = this.circleColor2;
                $ctx.fill();
                $ctx.closePath();
            }

            const tl = new TimelineLite({
                onUpdate: drawCircle.bind(circle),
                onComplete: done
            });
            tl.to(circle, 1, {
                onStart: () => {
                    this.$root.$emit('closeNav', { isActive: 'false' });
                },
                radius: radius,
                ease: Power3.easeOut
            });
            tl.to(circle, 1, {
                radius2: radius,
                circleColor2: '#67daff',
                ease: Power3.easeOut
            }, '-=0.9');
        }
    }
};
</script>

<style lang="scss"></style>