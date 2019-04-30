<template>
    <transition>
        <div class="c-page-transition">
            <canvas class="js-canvas"></canvas>
        </div>
    </transition>
</template>

<script>
import { TweenLite, TimelineLite, Power3 } from 'gsap';

export default {
    computed: {
        page() {
            return this.$store.state.page
        }
    },
    created() {},
    mounted() {
        window.addEventListener('mousemove', this.setCenter, false);
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
            tl.to('h1', 1, {
                autoAlpha: 1,
                y: 0
            });
            tl.to('h2', 1, {
                autoAlpha: 1,
                y: 0
            }, '-=0.75');
        }
    },
    beforeLeave(el) {},
    leave(el, done) {
        console.log('leaving index!');
        const $canvas = this.$el.canvas;
        const $ctx = $canvas.getContext('2d');
        const $width = $canvas.width = window.innerWidth;
        const $height = $canvas.height = window.innerHeight;

        function distanceSq(p1, p2) {
            return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        }

        function maxDistance(x, y) {
            const point = {
                x: x,
                y: y
            };
            const da = distanceSq(point, {
                x: 0,
                y: 0
            });
            const db = distanceSq(point, {
                x: $width,
                y: 0
            });
            const dc = distanceSq(point, {
                x: $width,
                y: $height
            });
            const dd = distanceSq(point, {
                x: 0,
                y: $height
            });
            return Math.sqrt(Math.max(da, db, dc, dd));
        }

        const radius = maxDistance(this.$el.centerX, this.$el.centerY);

        const circle = {
            radius: 0,
            radius2: 0,
            circleColor2: '#67daff',
            x: this.$el.centerX,
            y: this.$el.centerY
        };

        function drawCircle() {
            $ctx.beginPath();
            $ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            $ctx.fillStyle = '#fff';
            $ctx.fill();
            $ctx.closePath();

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
            ease: Power3.easeOut
        }, '-=0.9');
    }
};
</script>

<style lang="scss">
    .c-page-transition {
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        visibility: visible;
        z-index: 99;
        opacity: 1;
        transition: opacity 0s ease-out, visibility 0s ease-out;

        // &.is-end {
        //     opacity: 0;
        //     visibility: hidden;
        //     transition: opacity 1.2s ease-out, visibility 1.2s ease-out;
        // }
    }

    .js-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
    }
</style>
