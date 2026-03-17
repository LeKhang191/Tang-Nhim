function flower(context, x, y, n, radius, red, green, blue) {
    this.x = x;
    this.y = y;
    this.radius = radius || 20;
    this.color = {
        r: red || 150,
        g: green || 100,
        b: blue || 100
    };
    this.n = n || 10; 
    this.rad = Math.random() * Math.PI * 2;
    this.context = context;
}

flower.prototype.drawPetal = function(opacity, angle) {
    var delta = 0.3 + Math.random();
    var rand = this.radius * Math.random() + this.radius;
    
    var r = Math.floor(this.color.r * (1.25 - Math.random() * 0.5));
    var g = Math.floor(this.color.g * (1.25 - Math.random() * 0.5));
    var b = Math.floor(this.color.b * (1.25 - Math.random() * 0.5));

    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
    
    this.context.bezierCurveTo(
        this.x + Math.cos(angle + delta) * rand * opacity * 10, 
        this.y + Math.sin(angle + delta) * rand * opacity * 10, 
        this.x + Math.cos(angle + 2 * delta) * rand * opacity * 10, 
        this.y + Math.sin(angle + 2 * delta) * rand * opacity * 10, 
        this.x, this.y
    );

    this.context.strokeStyle = "rgba(55,55,55,0.05)";
    this.context.stroke();
    this.context.fill();
};

flower.prototype.drawBud = function(size) {
    var currentSize = size || 1;
    this.context.beginPath();
    this.context.arc(this.x, this.y, currentSize, 0, 2 * Math.PI, false);
    this.context.fillStyle = "rgba(255, 200, 0, 0.6)"; 
    this.context.fill();
    
    var o = this;
    if (currentSize < 5) {
        setTimeout(function() { o.drawBud(currentSize + 1); }, 100);
    }
};

flower.prototype.bloom = function(petalAngle) {
    var o = this;
    for (var i = 1; i < 7; i += 1) {
        (function(layer) {
            setTimeout(function() { 
                o.drawPetal(layer * layer * 0.02, petalAngle); 
            }, 20 * layer);
        })(i);
    }
};

flower.prototype.start = function() {
    var o = this;
    for (var i = 0; i < this.n; i++) {
        var petalAngle = (i * 2 * Math.PI) / this.n;
        (function(angle) {
            setTimeout(function() { o.bloom(angle); }, 100 * i);
        })(petalAngle);
    }
    setTimeout(function() { o.drawBud(1); }, o.n * 100);
};