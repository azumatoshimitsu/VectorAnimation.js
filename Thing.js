var Thing = function (arg) {

	var arg = arg || {};
	this.location       = (arg.location)? arg.location : { x: 0, y: 0 },
	this.friction       = arg.friction || 0.9,
	this.velocity       = { x: 0, y: 0 },
	this.acceleration   = { x: 0, y: 0 },
	this.mass           = arg.mass || 10,
	this.maxspeed       = arg.maxspeed || 10,
	this.minspeed       = arg.minspeed || 4;
	this.damage         = arg.damage || 0.98,
	this.rad            = arg.rad || 100;
	this.isAnimationEnd = false,
	this.callback       = arg.callback || function() {};
	this.gravityPoint   = arg.gravityPoint || {};

}

Thing.prototype = {

	draw: function() {
		/* custom draw function */
		return this;
	},

	set: function(arg) {
		var arg = arg || {};
		this.location       = (arg.location)? arg.location : this.location,
		this.friction       = arg.friction || this.friction,
		this.mass           = arg.mass || this.mass,
		this.maxspeed       = arg.maxspeed || this.maxspeed,
		this.minspeed       = arg.minspeed || this.minspeed;
		this.damage         = arg.damage || this.damage,
		this.rad            = arg.rad || this.rad;
		this.callback       = arg.callback || this.callback;
		this.gravityPoint   = arg.gravityPoint ||  this.gravityPoint;
		return this; 
	},

	update: function() {
	    this.velocity     = Vector.add(this.velocity, this.acceleration);
	    this.velocity     = Vector.mult(this.velocity, this.damage);
	    this.location     = Vector.add(this.location, this.velocity);
	    this.acceleration = Vector.mult(this.acceleration, 0);
		return this;
	},

	applyForce: function(force) {
		force = Vector.div(force, this.mass);
		this.acceleration = Vector.add(this.acceleration, force);
		return this;
	},

	seek: function(arg) {
		var arg       = arg || {};
		var g         = arg.g || this.gravityPoint.g;
		var direction = (arg.x && arg.y)? { x: arg.x, y: arg.y } : this.gravityPoint;
		var sub       = Vector.sub(direction, this.location);
		var normal    = Vector.normalize(sub);
		var force     = Vector.mult(normal, g);
		this.applyForce(force);
	},

	arrive: function(arg) {
		var sub     = Vector.sub(this.gravityPoint, this.location);
		var diff    = Vector.mag(sub);
		var normal  = Vector.normalize(sub);
		var desired = { x: 0, y: 0 };
		var steer   = { x: 0, y: 0 };

		if(diff < this.rad) {
			var m   = this.map(diff, 0, this.rad, 0, this.minspeed);
			desired = Vector.mult(normal, m);
			steer   = Vector.sub(desired, this.velocity);
			this.applyForce(steer);
			if(!this.isAnimationEnd && Vector.mag(sub) < 1) {
				this.isAnimationEnd = true;
				this.callback(this);
			}
		} else {
			this.seek();
		}
	},

	getPoint: function() {
		var prop = { x: this.location.x, y: this.location.y };
		return prop;
	},
	//値を規制
	map: function(value, low1, high1, low2, high2) {
		var moto = high1 - low1;
		var ato  = high2 - low2;
		return (ato / moto) * value;
	}

};