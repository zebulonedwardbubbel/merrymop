<template>
    <div class="c-page-transition">
        <canvas class="js-canvas" ref="canvas"></canvas>
    </div>
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
        this.$root.$on('transition', this.transition);
    },
    methods: {
        setCenter: function(event) {
            this.$el.centerX = event.clientX;
            this.$el.centerY = event.clientY;
        },
        transition: function(url) {
            const $canvas = this.$refs.canvas;
            const $ctx = $canvas.getContext('2d');
            const $width = $canvas.width = window.innerWidth;
            const $height = $canvas.height = window.innerHeight;
            let circle1Color = '';
            let circle2Color = '';

            switch (url.name) {
                case 'index':
                    circle1Color = 'red';
                    circle2Color = 'green';
                    break;
                case 'pricing':
                    circle1Color = 'white';
                    circle2Color = 'black';
                    break;
                case 'contacts':
                    circle1Color = 'pink';
                    circle2Color = 'gray';
                default:
            }

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
                x: this.$el.centerX,
                y: this.$el.centerY
            };

            function drawCircle() {
                $ctx.beginPath();
                $ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                $ctx.fillStyle = circle1Color;
                $ctx.fill();
                $ctx.closePath();

                $ctx.beginPath();
                $ctx.arc(this.x, this.y, this.radius2, 0, 2 * Math.PI);
                $ctx.fillStyle = circle2Color;
                $ctx.fill();
                $ctx.closePath();
            }

            const tl = new TimelineLite({
                onUpdate: drawCircle.bind(circle),
                onComplete: function() {
                    $ctx.clearRect(0, 0, $width, $height);
                }
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
    },
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
