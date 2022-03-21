class NeuralNet {

    constructor(){ 
        this.layers = []
        this.biases = []
        this.weights = []
        this.activations = []
    }

    clone() {
        const clone = JSON.parse(JSON.stringify(this));
        // Copy funtions, as they are nod stringified
        clone.activations = this.activations;
        return clone;
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

    noise(noiseFunction) {
        for(x = 0; x < this.weights.length; x++) {
            for(y = 0; x < weights[x].length; y++) {
                this.weights[x][y] = noiseFunction(this.weights[x][y])
            }
        }
    }

}


activation = {
    relu: (n) => {
        if(n < 0)
            return 0
        return n
    }
}

net = new NeuralNet()

net.addLayer(6, activation.relu)
net.addLayer(4, activation.relu)
net.addLayer(2, activation.relu)

result = net.feedForward([.5, .5, .5, .5, .5, .5])
console.log(result)
