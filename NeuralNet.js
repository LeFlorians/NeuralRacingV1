class NeuralNet {

    constructor(seed){
        this.seed = seed; 
        this.layers = []
        this.biases = []
        this.weights = []
        this.activations = []
    }

    clone() {
        const newNet = new NeuralNet()
        newNet.layers = this.layers.slice(0)
        newNet.biases = this.biases.slice(0)
        newNet.weights = this.weights.slice(0)
        newNet.activations = this.activations.slice(0)
        newNet.seed = Math.floor(this.seed * 10000 * Math.random())

        return newNet;
    }

    addLayer(size, activation) {
        const last_size = this.layers[this.layers.length - 1]
        this.layers.push(size)

        this.biases.push(new Array(size).fill(0))
        
        if(last_size) {
            this.weights.push(new Array(last_size * size).fill(.5))
        }
        
        this.activations.push(activation)
    }

    feedForward(input) {
        var values = input
        for(var i = 0; i < values.length; i++){
            values[i] = this.activations[0](values[i])
        }

        for(var i = 0; i < this.weights.length; i++) {
            const weights = this.weights[i]

            const next_size = weights.length / values.length
            const next_values = Array(next_size).fill(0)

            for(var x = 0; x < next_size; x++) {
                for(var y = 0; y < values.length; y++){
                    next_values[x] += weights[x * values.length + y] * values[y]
                }
                next_values[x] = this.activations[i+1](next_values[x])
            }
            values = next_values
        }
        return values
    }

    random() {
        this.seed = Math.sin(this.seed) * 10000
        return this.seed - Math.round(this.seed)
    };

    noise() {
        for(var x = 0; x < this.weights.length; x++) {
            for(var y = 0; y < this.weights[x].length; y++) {
                this.weights[x][y] = this.weights[x][y] + this.random()
            }
        }
    }

}



