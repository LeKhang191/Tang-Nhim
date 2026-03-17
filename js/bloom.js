var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var points = [];
var offX = 300;
var offY = 160; 

function getHeartPoint(c) {
    var r = Math.sin(c) * Math.sqrt(Math.abs(Math.cos(c))) / (Math.sin(c) + 1.4) - 2 * Math.sin(c) + 2;
    var x = 110 * Math.cos(c) * r;
    var y = -110 * Math.sin(c) * r;
    return [x, y];
}

function dist(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
}

function drawHeart() {
    var last = [0, 0];
    for (var z = 4.70; z < 11; z += 0.05) {
        var h = getHeartPoint(z);
        if (dist(h[0], h[1], last[0], last[1]) < 30) continue; 
        
        last[0] = h[0]; last[1] = h[1];
        points.push(new flower(context, h[0] + offX, h[1] + offY, 5, 5, 255, 120, 120));
    }
}

function startFlowering() {
    var current = 0;
    var flowerInterval = setInterval(function() {
        if (current < points.length) {
            points[current].start();
            current++;
        } else {
            clearInterval(flowerInterval);
        }
    }, 150); 
}

function drawText() {
    context.font = "50px 'Microsoft YaHei', sans-serif";
    context.fillStyle = "rgba(255, 100, 100, 0.1)"; 
    context.textAlign = "center"; 
    context.fillText("iu mình lémmmm", offX, offY + 100);
}

function drawName() {
    context.font = "40px 'Microsoft YaHei', sans-serif";
    context.fillStyle = "rgba(255, 50, 50, 0.1)";
    context.textAlign = "center";
    context.fillText(loveName, offX, offY + 160);
}

function startAnimation() {
    drawHeart();
    startFlowering();

    for (var i = 0; i < 15; i++) {
        setTimeout(drawText, 3000 + (i * 100));
    }

    setTimeout(function() {
        for (var i = 0; i < 15; i++) {
            setTimeout(drawName, i * 100);
        }
    }, 5000);
}
