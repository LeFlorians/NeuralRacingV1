
// Work in progress, see NeuralNet.js

class NetTrainer{
    constructor(neuralNet){
        this.net = neuralNet
    }

    trainGeneration(n_nets, noiseFunction, scoreFunction, input) {
        nets = []
        scores = []
        for(i = 0; i < n_nets; i++){
            const net = this.net.clone()
            nets.push(net)

            net.noise(noiseFunction)

            out = net.feedForward(input)
            scores.push(scoreFunction(out))
        }
        bestNet = nets[ scores.indexOf(Math.max(...scoreFunction)) ]
        
    }
}

noise = {
    default: (n) => {
        return n + Math.random();
    }
}

console.log(net.clone())
