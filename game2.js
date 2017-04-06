var canvas;
var ctx;
var w = 0;
var h = 0;
var timer;
var updateStarted = false;
var touches = [];

function Vector2(x,y)
{
	this.x = x;
	this.y = y;
}

function radianToVector2(radian)
{
	return new Vector2(Math.cos(radian), Math.sin(radian));
}

function degreeToVector2(degree)
{
	return radianToVector2(degree * Math.PI / 180);
}

function gameLoop()
{
	if (updateStarted) return;
	updateStarted = true;
	var nw = window.innerWidth;
	var nh = window.innerHeight;
	if ((w != nw) || (h != nh)) {
		w = nw;
		h = nh;
		canvas.style.width = w+'px';
		canvas.style.height = h+'px';
		canvas.width = w;
		canvas.height = h;
	}
	ctx.clearRect(0, 0, w, h);
	var i, len = touches.length;
	for (i=0; i<len; i++) {
		var touch = touches[i];
    var px = touch.pageX;
    var py = touch.pageY;
		ctx.beginPath();
		ctx.arc(px, py, 20, 0, 2*Math.PI, true);
		ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
		ctx.fill();
		ctx.lineWidth = 2.0;
		ctx.strokeStyle = "rgba(0, 0, 200, 0.8)";
		ctx.stroke();
    console.log('drawn circle at ' + px +',' + py);
	}
	updateStarted = false;
}

function tonLoad() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	timer = setInterval(gameLoop, 15);
canvas.addEventListener('touchend', function() {
	ctx.clearRect(0, 0, w, h);
});
canvas.addEventListener('touchmove', function(event) {
  event.preventDefault();
  touches = event.touches;
});
canvas.addEventListener('touchstart', function(event) {
  console.log('start');
});
};