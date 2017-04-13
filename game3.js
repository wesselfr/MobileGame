var canvas;
var context;
var w = 0;
var h = 0;
var timer;
var updateStarted = false;
var touches = [];

var player;
var background;

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
function BackgroundLines(y)
{
	this.position = new Vector2(0, y);
	this.speed = 1;
	this.strokeSize = 1;
}
BackgroundLines.prototype.draw = function()
{
context.save();
context.translate(this.position.x, this.position.y);
context.beginPath();
context.moveTo(0,0);
context.lineTo(1080,0);
context.lineWidth = this.strokeSize;
context.strokeStyle = '#730099';
context.stroke();
context.restore();
}
BackgroundLines.prototype.update = function()
{
	this.speed += 0.10;
	this.strokeSize += 0.05;
	this.position.y += this.speed;

	if(this.position.y >= canvas.height)
	{
		this.position.y = 267;
		this.speed = 0;
		this.strokeSize = 1;
	}
}
function Background()
{
	this.lines = [];
	this.s = 0;
	this.lines.push(new BackgroundLines(267));
	this.s++;
}
Background.prototype.draw = function()
{

	context.save();
	context.translate(0,0);
	context.beginPath();

	for(var i = 0; i < this.lines.length; i ++)
	{
		this.lines[i].draw();
	}


	//Left
	for(var i = 0; i < 27; i++)
	{
		context.moveTo(540 - (20*i),267);
		context.lineTo(540 - (180*i),800);
	}

	//Middle
	context.moveTo(540,267);
	context.lineTo(540,800);

	//Right
	for(var i = 0; i < 27; i++)
	{
		context.moveTo(540 + (20*i),267);
		context.lineTo(540 + (180*i),800);
	}


	context.lineWidth = 1;
	context.strokeStyle = '#730099';
	context.stroke();
	context.restore();
}
Background.prototype.update = function()
{
	for(var i = 0; i < this.lines.length; i++)
	{
		this.lines[i].update();
	}
	if(this.lines[this.s - 1].position.y > 277 && this.s < 13)
	{
		this.lines.push(new BackgroundLines(267));
		this.s++;
	}
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
	context.clearRect(0, 0, w, h);
	var i, len = touches.length;
	for (i=0; i<len; i++) {
		var touch = touches[i];
    	var px = touch.pageX;
    	var py = touch.pageY;
		player.position = new Vector2(px,py);
    console.log('drawn player at ' + px +',' + py);
	}
	context.clearRect(0,0,canvas.width,canvas.height);

	context.fillStyle = 'black';
	context.fillRect(0,0,canvas.width, canvas.height);

	var grd = context.createLinearGradient(0,340,0,120);
	grd.addColorStop(0,"#FD0073");
	grd.addColorStop(0.5, "#E50068");
	grd.addColorStop(1,"#ECFF00");

	context.save();
	context.beginPath();
	context.arc(canvas.width*0.5,251,120,1*Math.PI,2*Math.PI);
	context.fillStyle = grd;
	context.fill();
	context.restore();

	var grd = context.createLinearGradient(0, 210, 0, 310);
	grd.addColorStop(0, "rgba(0, 0, 0, 0)");
	
	grd.addColorStop(0.38, "#730099")
	grd.addColorStop(0.48, "#f9e6ff");
	grd.addColorStop(0.6, "#730099")
	grd.addColorStop(1, "rgba(0, 0, 0, 0)");

	context.fillStyle = grd;
	context.fillRect(0,0,canvas.width, canvas.height);

	

   	background.draw();
   	background.update();

   	
	player.draw();
	updateStarted = false;
}

function onLoad() {
	console.log("GameStarted");
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	player = new Player();
	background = new Background();
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
