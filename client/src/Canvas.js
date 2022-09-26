const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var leftKeyPressed = false;
var rightKeyPressed = false;
var upKeyPressed = false;
var downKeyPressed = false;

class Canvas {
	constructor(canvasElement, objects = []) {
		this.run = true;
		this.objects = objects || [];

		this.canvas = canvasElement;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.ctx = this.canvas.getContext('2d');

		document.addEventListener('keydown', this.keyPressed);
		document.addEventListener('keyup', this.keyReleased);

		this.onDrawDone = [];

		this.clear = this.clear.bind(this);
		this.runDrawLoop = this.runDrawLoop.bind(this);
		this.stopDrawLoop = this.stopDrawLoop.bind(this);
		this.draw = this.draw.bind(this);
	}

	clear() {
		this.ctx.fillStyle = '#111';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	runDrawLoop() {
		console.log('[Canvas](runDrawLoop)');
		this.run = true;
		this.draw();
	}

	stopDrawLoop() {
		console.log('[Canvas](stopDrawLoop)');
		this.run = false;
	}

	draw() {
		if (this.run) {
			window.requestAnimationFrame(this.draw);
			this.clear();

			if (this.objects && this.objects.length) {
				this.objects.forEach((object) => {
					object.draw(this.objects, this.canvas, this.ctx);
					object.move(this.canvas, [leftKeyPressed,rightKeyPressed,upKeyPressed,downKeyPressed]);

				});
			}

			if (this.onDrawDone) {
				this.onDrawDone.forEach((callback) => {
					callback(this);
				});
			}
		}
	}

	keyPressed(event) {
		if(event.keyCode == LEFT_KEY) { leftKeyPressed = true; }

		if(event.keyCode == RIGHT_KEY) { rightKeyPressed = true; }

		if(event.keyCode == UP_KEY) { upKeyPressed = true; }

		if(event.keyCode == DOWN_KEY) { downKeyPressed = true; }

	}

	keyReleased(event) {

		if(event.keyCode == LEFT_KEY) { leftKeyPressed = false; }

		if(event.keyCode == RIGHT_KEY) { rightKeyPressed = false; }

		if(event.keyCode == UP_KEY) { upKeyPressed = false; }

		if(event.keyCode == DOWN_KEY) { downKeyPressed = false; }

	}

	getleftKeyPressedValue() { return this.leftKeyPressed }
	getrightKeyPressedValue() { return this.rightKeyPressed }
	getupKeyPressedValue() { return this.upKeyPressed }
	getdownKeyPressedValue() { return this.downKeyPressed }
}



//-------------------------------------------------------------------------------

class Circle {
	constructor(x, y, radius, color, moveX, moveY, isNew = false, fromAngle = 0, toAngle = 360, doFade = false, generateOnDelete = true) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.originalRadius = radius;
		this.fromAngle = fromAngle;
		this.toAngle = toAngle;

		this.moveX = moveX;
		this.moveY = moveY;

		this.color = color;
		this.isNew = isNew;

		// null -> nothing, true -> grow, false -> shrink
		this.doGrow = null;
		this.doFade = doFade;
		this.generateOnDelete = generateOnDelete;

		this.draw = this.draw.bind(this);
		this.move = this.move.bind(this);
	}


	draw(objects, canvas, ctx) {
		ctx.beginPath();

		ctx.moveTo(this.x, this.y);
		ctx.arc(this.x, this.y, this.radius, -this.fromAngle * (Math.PI / 180), -this.toAngle * (Math.PI / 180), true);
		ctx.fillStyle = this.computeColor();
		ctx.fill();

		this.move(objects, canvas, ctx);
	}

	move(objects, canvas, ctx) {
		if (
			(this.doFade && this.color.a === 0) ||
			this.x + this.radius < 0 || this.x - this.radius > canvas.width ||
			this.y + this.radius < 0 || this.y - this.radius > canvas.height
		) {
			const index = objects.indexOf(this);
			if (this.generateOnDelete) {
				objects.splice(index, 1, getRandomCircle({ isNew: true }));
			} else {
				objects.splice(index, 1);
			}
		} else {
			this.x += this.moveX;
			this.y += this.moveY;
			// this.angle += 1;
		}

		if (this.doGrow === true && this.radius >= this.originalRadius * 3) {
			this.doGrow = false;
		}
		if (this.doGrow === false && this.radius <= this.originalRadius) {
			this.doGrow = null;
		}

		if (this.doGrow === true) {
			this.radius += 0.75;
			if (this.radius > this.originalRadius * 3) {
				this.radius = this.originalRadius * 3;
			}
		} else if (this.doGrow === false) {
			this.radius -= 0.6;
			if (this.radius < this.originalRadius) {
				this.radius = this.originalRadius;
			}
		}
	}
}
