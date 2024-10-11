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

let originTime: number = performance.now();
let fps: number = 0;
let rate: number = 0;

// Define the function to update the counter
function updateCounter() {
  // Increase the counter by time delta for each frame
  //gather frame rate
  const deltaTime = performance.now();
  fps = 1000 / (deltaTime - originTime)
  originTime = deltaTime;
  counter += rate;
  console.log("Frame Update");
  // Update the displayed text
  const updatedCounterText = `GME Stock Price: ${counter.toFixed(2)}$`;
  counterElement.innerHTML = updatedCounterText;

  //make upgrades available
  if(counter < 10){
    upgrade1.disabled = true;
  }
  else{
    upgrade1.disabled = false;
  }

  // Schedule the next update
  requestAnimationFrame(updateCounter);
}

//upgrade button

//make a clickable button
const upgradeText1 = "Buy Stock - 10$";
const upgrade1 = document.createElement("button");
upgrade1.innerHTML = upgradeText1;
upgrade1.disabled = true;
app.append(upgrade1);

upgrade1.addEventListener("click", () => {
  rate += 1 / fps;
  counter -= 10
});

// Start the loop
requestAnimationFrame(updateCounter);
