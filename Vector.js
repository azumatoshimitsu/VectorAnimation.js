var Vector = {
	add: function(v1, v2) {
		x = v1.x + v2.x;
		y = v1.y + v2.y;
		return {x: x, y: y};
	},
	sub: function(v1, v2) {
		x = v1.x - v2.x;
		y = v1.y - v2.y;
		return {x: x, y: y};
	},
	mult: function(v, n) {
		x = v.x * n;
		y = v.y * n;
		return {x: x, y: y};
	},
	div: function(v, n) {
		x = v.x / n;
		y = v.y / n;
		return {x: x, y: y};
	},
	normalize: function(v) {
		var m = this.mag(v);
		if(m !== 0) {
			return this.div(v, m);
		} else {
			return v;
		}
	},
	mag: function(v) {
		return Math.sqrt(v.x * v.x + v.y * v.y);
	}

};