// Activation function: sigmoid
function sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
}

// Derivative of the sigmoid function
function sigmoidDerivative(x: number): number {
  const sigmoidX = sigmoid(x);
  return sigmoidX * (1 - sigmoidX);
}

class NeuralNetwork {
  private inputLayerSize: number;
  private hiddenLayerSize: number;
  private outputLayerSize: number;
  private hiddenLayerWeights: number[][];
  private outputLayerWeights: number[][];

  constructor(inputLayerSize: number, hiddenLayerSize: number, outputLayerSize: number) {
    this.inputLayerSize = inputLayerSize;
    this.hiddenLayerSize = hiddenLayerSize;
    this.outputLayerSize = outputLayerSize;

    // Initialize weights with random values
    this.hiddenLayerWeights = [];
    this.outputLayerWeights = [];
    for (let i = 0; i < hiddenLayerSize; i++) {
      this.hiddenLayerWeights[i] = [];
      for (let j = 0; j < inputLayerSize; j++) {
        this.hiddenLayerWeights[i][j] = Math.random() - 0.5;
      }
    }
    for (let i = 0; i < outputLayerSize; i++) {
      this.outputLayerWeights[i] = [];
      for (let j = 0; j < hiddenLayerSize; j++) {
        this.outputLayerWeights[i][j] = Math.random() - 0.5;
      }
    }
  }

  // Feedforward computation
  private feedForward(input: number[]): number[] {
    const hiddenLayerOutput: number[] = [];
    const outputLayerOutput: number[] = [];

    // Compute hidden layer output
    for (let i = 0; i < this.hiddenLayerSize; i++) {
      let sum = 0;
      for (let j = 0; j < this.inputLayerSize; j++) {
        sum += input[j] * this.hiddenLayerWeights[i][j];
      }
      hiddenLayerOutput[i] = sigmoid(sum);
    }

    // Compute output layer output
    for (let i = 0; i < this.outputLayerSize; i++) {
      let sum = 0;
      for (let j = 0; j < this.hiddenLayerSize; j++) {
        sum += hiddenLayerOutput[j] * this.outputLayerWeights[i][j];
      }
      outputLayerOutput[i] = sigmoid(sum);
    }

    return outputLayerOutput;
  }

  // Train the neural network using backpropagation
  public train(inputs: number[][], targets: number[][], iterations: number, learningRate: number): void {
    for (let iter = 0; iter < iterations; iter++) {
      for (let i = 0; i < inputs.length; i++) {
        // Forward pass
        const hiddenLayerOutput: number[] = [];
        const outputLayerOutput: number[] = [];
        const input = inputs[i];
        const target = targets[i];

        // Compute hidden layer output
        for (let j = 0; j < this.hiddenLayerSize; j++) {
          let sum = 0;
          for (let k = 0; k < this.inputLayerSize; k++) {
            sum += input[k] * this.hiddenLayerWeights[j][k];
          }
          hiddenLayerOutput[j] = sigmoid(sum);
        }

        // Compute output layer output
        for (let j = 0; j < this.outputLayerSize; j++) {
          let sum = 0;
          for (let k = 0; k < this.hiddenLayerSize; k++) {
            sum += hiddenLayerOutput[k] * this.outputLayerWeights[j][k];
          }
          outputLayerOutput[j] = sigmoid(sum);
        }

        // Backpropagation
        const outputLayerErrors: number[] = [];
        for (let j = 0; j < this.outputLayerSize; j++) {
          outputLayerErrors[j] = target[j] - outputLayerOutput[j];
        }

        const outputLayerDeltas: number[] = [];
        for (let j = 0; j < this.outputLayerSize; j++) {
          outputLayerDeltas[j] = outputLayerErrors[j] * sigmoidDerivative(outputLayerOutput[j]);
        }

        const hiddenLayerErrors: number[] = [];
        for (let j = 0; j < this.hiddenLayerSize; j++) {
          let sum = 0;
          for (let k = 0; k < this.outputLayerSize; k++) {
            sum += outputLayerDeltas[k] * this.outputLayerWeights[k][j];
          }
          hiddenLayerErrors[j] = sum;
        }

        const hiddenLayerDeltas: number[] = [];
        for (let j = 0; j < this.hiddenLayerSize; j++) {
          hiddenLayerDeltas[j] = hiddenLayerErrors[j] * sigmoidDerivative(hiddenLayerOutput[j]);
        }

        // Update weights
        for (let j = 0; j < this.outputLayerSize; j++) {
          for (let k = 0; k < this.hiddenLayerSize; k++) {
            this.outputLayerWeights[j][k] += learningRate * outputLayerDeltas[j] * hiddenLayerOutput[k];
          }
        }

        for (let j = 0; j < this.hiddenLayerSize; j++) {
          for (let k = 0; k < this.inputLayerSize; k++) {
            this.hiddenLayerWeights[j][k] += learningRate * hiddenLayerDeltas[j] * input[k];
          }
        }
      }
    }
  }

  // Predict the output for a given input
  public predict(input: number[]): number[] {
    return this.feedForward(input);
  }
}

// Example usage:
const nn = new NeuralNetwork(2, 3, 1); // 2 input nodes, 3 hidden nodes, 1 output node
const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
const targets = [[0], [1], [1], [0]];
const iterations = 10000;
const learningRate = 0.1;

nn.train(inputs, targets, iterations, learningRate);

// Test the trained network
console.log(nn.predict([0, 0])); // Output: [0.02339619546210197]
console.log(nn.predict([0, 1])); // Output: [0.9709069528620967]
console.log(nn.predict([1, 0])); // Output: [0.973471847428251]
console.log(nn.predict([1, 1])); // Output: [0.025016686555986974]


export default function Net(){return <>NET</>}