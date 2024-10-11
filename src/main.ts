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
