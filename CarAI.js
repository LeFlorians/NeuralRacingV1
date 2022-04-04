class CarAI extends Car {

	constructor(track) {

		const relu = (n) => {
			if(n < 0)
				return 0
			return n
		}

		const sigmoid = (n) => {
			return 1 / (1 + Math.exp(-n))
		}
		
		super(track)

		this.nn = new NeuralNet(Math.round(Math.random() * 10000))
		
		this.nn.addLayer(6, relu)
		this.nn.addLayer(4, relu)
		this.nn.addLayer(2, sigmoid)

		this.nn.noise()
	}

	reset() {
		super.reset()

		// learn here
		if(this.nn) {
			this.nn.noise()
		}
	}

	move() {
		this.control() 
		super.move()
	}

	control() {
		let scans = this.getScans()
		let results = this.nn.feedForward([...scans, this.v])
		this.acc = -1 + 2 * results[0]
		this.steer = -1 + 2 * results[1]
	}

}