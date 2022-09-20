class Canvas {
	constructor(canvasElement, objects = []) {
		this.run = true;
		this.objects = objects || [];

		this.canvas = canvasElement;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.ctx = this.canvas.getContext('2d');

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
				});
			}

			if (this.onDrawDone) {
				this.onDrawDone.forEach((callback) => {
					callback(this);
				});
			}
		}
	}
}
