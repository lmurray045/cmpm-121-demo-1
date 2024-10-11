import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "To the Moon!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//make a clickable button
const buttonText = "🚀";
const button = document.createElement("button");
button.innerHTML = buttonText;
app.append(button);

//add a listener and a counter
let counter: number = 0;
const counterText: string = `GME Stock Price: ${counter}$`;
const counterElement = document.createElement("div");
counterElement.innerHTML = counterText;
app.append(counterElement);

button.addEventListener("click", () => {
  counter += 1;
  const updatedCounterText = `GME Stock Price: ${counter}$`;
  counterElement.innerHTML = updatedCounterText;
});

let originTime: number = 0;

// Define the function to update the counter
function updateCounter() {
  // Increase the counter by time delta for each frame
  const deltaTime = performance.now();
  counter += 1 / (deltaTime - originTime); // one divided by the time passed in seconds
  originTime = deltaTime;
  console.log("Frame Update")
  // Update the displayed text
  const updatedCounterText = `GME Stock Price: ${counter.toFixed(2)}$`;
  counterElement.innerHTML = updatedCounterText;

  // Schedule the next update
  requestAnimationFrame(updateCounter);
}

// Start the loop
requestAnimationFrame(updateCounter);
