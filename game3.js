var canvas;
var context;
var w = 0;
var h = 0;
var timer;
var updateStarted = false;
var touches = [];

var player;

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

//Gameplay
function Player(x,y, angle)
{
	this.position = new Vector2(x,y);
	this.angle = angle;
}

Player.prototype.draw = function()
{
context.save();
context.translate(this.position.x, this.position.y);
context.rotate(this.angle * Math.PI / 180);
context.beginPath();
context.moveTo(20,0);
context.lineTo(-20,-20);
context.lineTo(-20,20);
context.lineTo(20,0);
context.closePath();
context.strokeStyle = '	#00FFFF';
context.stroke();
context.restore();
}

//Background

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
	context.clearRect(0, 0, w, h);
	var i, len = touches.length;
	for (i=0; i<len; i++) {
		var touch = touches[i];
    	var px = touch.pageX;
    	var py = touch.pageY;
		player.position = new Vector2(px,py);
    console.log('drawn player at ' + px +',' + py);
	}
	player.draw();
	updateStarted = false;
}

function onLoad() {
	console.log("GameStarted");
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	player = new Player();
	timer = setInterval(gameLoop, 15);
canvas.addEventListener('touchend', function() {
	context.clearRect(0, 0, w, h);
});
canvas.addEventListener('touchmove', function(event) {
  event.preventDefault();
  touches = event.touches;
});
canvas.addEventListener('touchstart', function(event) {
  console.log('start');
});
};
