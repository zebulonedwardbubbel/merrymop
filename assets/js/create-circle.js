const createCircle = {
    distanceSq(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    },
    hypotenuse(x, y, width, height) {
        const point = {
            x: x,
            y: y
        };
        const da = this.distanceSq(point, {
            x: 0,
            y: 0
        });
        const db = this.distanceSq(point, {
            x: width,
            y: 0
        });
        const dc = this.distanceSq(point, {
            x: width,
            y: height
        });
        const dd = this.distanceSq(point, {
            x: 0,
            y: height
        });
        return Math.sqrt(Math.max(da, db, dc, dd));
    }
}

export default getHypotenuse;