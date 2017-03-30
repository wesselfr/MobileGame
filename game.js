var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var playerShip;

var keyUp = false; 
var keyDown = false;
var keyLeft = false;
var keyRight = false;

var joyLeft = false;
var joyRight = false;

var ships = [];

var speed = 5;
var rotateSpeed = 4;

function Vector2(x,y)
{
	this.x = x;
	this.y = y;
}

function PlayerShip(x,y, angle)
{
	this.position = new Vector2(x,y);
	this.angle = angle;
}

PlayerShip.prototype.draw = function()
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

function radianToVector2(radian)
{
	return new Vector2(Math.cos(radian), Math.sin(radian));
}

function degreeToVector2(degree)
{
	return radianToVector2(degree * Math.PI / 180);
}

//var playerShip = new PlayerShip(100,100);
console.log(PlayerShip);
console.log(PlayerShip.position);

for (var i = 0; i < 5; i++) {
	ships.push(new PlayerShip(Math.random() * 600, Math.random() * 400, Math.random() * 360))
}


gameLoop();

function keyDownHandler(event) {
	var keyPressed = String.fromCharCode(event.keyCode);
	if(keyPressed == 'W')keyUp = true;
	if(keyPressed == 'S')keyDown = true;
	if(keyPressed == 'A')keyLeft = true;
	if(keyPressed == 'D')keyRight = true;
}

function keyUpHandler(event) {
	var keyPressed = String.fromCharCode(event.keyCode);
	if(keyPressed == 'W')keyUp = false;
	if(keyPressed == 'S')keyDown = false;
	if(keyPressed == 'A')keyLeft = false;
	if(keyPressed == 'D')keyRight = false;
}

function JoystickLeft(event)
{
		joyLeft = true;
		joyRight = false;
		console.log("LeftJoy Pressed");
}
function JoystickRight(event)
{
		joyLeft = false;
		joyRight = true;
		console.log("RightJoy Pressed");
}

document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);

document.addEventListener("joyleft",JoystickLeft);
document.addEventListener("joyright",JoystickRight);

function LeftButton()
{
	for(var i = 0; i < ships.length; i++)
	{
	ships[i].angle--;
	}
}

function RightButton()
{
	for(var i = 0; i < ships.length; i++)
	{
	ships[i].angle++;
	}
}

function UpButton()
{
	for(var i = 0; i < ships.length; i++)
	{
		var offset = degreeToVector2(ships[i].angle)
		ships[i].position.x += offset.x * speed;
		ships[i].position.y += offset.y * speed;
	}
}

function gameLoop() {
	console.log("UP: " + keyUp + " DOWN: " + keyDown + " LEFT: " + keyLeft + " RIGHT: " + keyRight);
	for(var i = 0; i < ships.length; i++){
		if(keyUp){
		var offset = degreeToVector2(ships[i].angle)
		ships[i].position.x += offset.x * speed;
		ships[i].position.y += offset.y * speed;
		}

		if(keyLeft || joyLeft)
		{
			ships[i].angle--
		}
		else if(keyRight || joyRight)
		{
			ships[i].angle++;
		}
	}
		if(keyDown)
		{
		ships.splice(0,1);
		}
	context.clearRect(0,0,canvas.width,canvas.height);
	 context.fillSytle = "#000000";
     context.fillRect(0,0,canvas.width,canvas.height);
     
     for(i = 0 ; i < ships.length; i++)
     {
    canvas.style.opacity = '1';
	ships[i].draw();
	}
	window.requestAnimationFrame(gameLoop);
}