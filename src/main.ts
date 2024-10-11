import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "To The Moon!";
document.title = gameName;

const header = document.createElement("h1");
header.style.position = "relative";
header.style.bottom = "100px";
header.innerHTML = gameName;
app.append(header);

//make a clickable button
const buttonText = "🚀";
const button = document.createElement("button");
button.innerHTML = buttonText;
button.style.position = "relative";
button.style.bottom = "100px";
button.style.scale = "1.3"
app.append(button);

//add a listener and a counter
let counter: number = 0;
const counterText: string = `GME Stock Price: ${counter}$`;
const counterElement = document.createElement("div");
counterElement.innerHTML = counterText;
counterElement.style.position = "relative";
counterElement.style.bottom = "90px";
app.append(counterElement);

button.addEventListener("click", () => {
  counter += 1;
  const updatedCounterText = `GME Stock Price: ${counter}$`;
  counterElement.innerHTML = updatedCounterText;
});

//declare rate related variables

let originTime: number = performance.now();
let fps: number = 0;
let rate: number = 0;
let dps: number = 0;

//hud text

const dpsText: string = `"Profit" per second: ${dps.toFixed(2)}$`;
const dpsElement = document.createElement("div");
dpsElement.innerHTML = dpsText;
dpsElement.style.position = "absolute";
dpsElement.style.top = "60px";
dpsElement.style.left = "60px";
app.append(dpsElement);

// Define the function to update the counter
function updateCounter() {
  // Increase the counter by time delta for each frame
  //gather frame rate
  const deltaTime = performance.now();
  fps = 1000 / (deltaTime - originTime);
  originTime = deltaTime;
  counter += rate;
  // Update the displayed text
  const updatedCounterText = `GME Stock Price: ${counter.toFixed(2)}$`;
  counterElement.innerHTML = updatedCounterText;

  //dps text
  const updatedDpsText = `"Profit" per second: ${dps.toFixed(2)}$`;
  dpsElement.innerHTML = updatedDpsText;

  //upgrade texts
  const updatedU1Text = `Investments made: ${upgrade1.timesBought}`;
  u1Element.innerHTML = updatedU1Text;

  const updatedU2Text = `Posts created: ${upgrade2.timesBought}`;
  u2Element.innerHTML = updatedU2Text;

  const updatedU3Text = `Funds drained: ${upgrade3.timesBought}`;
  u3Element.innerHTML = updatedU3Text;

  //make upgrades available
  upgrade1.update();
  upgrade2.update();
  upgrade3.update();

  // Schedule the next update
  requestAnimationFrame(updateCounter);
}

//upgrade class

class Upgrade {
  text: string;
  price: number;
  scale: number;
  upgrade: HTMLButtonElement;
  timesBought: number;

  constructor(text: string, price: number, scale: number) {
    //declare fields and make button
    this.text = text + ` - ${price}$`;
    this.price = price;
    this.scale = scale;
    this.timesBought = 0;

    this.upgrade = document.createElement("button");
    this.upgrade.innerHTML = this.text;
    this.upgrade.disabled = true;
    app.append(this.upgrade);

    //add listener to button
    this.upgrade.addEventListener("click", () => {
      //update numbers
      this.timesBought += 1;
      rate += this.scale / fps;
      dps += this.scale;
      counter -= this.price;
      this.price *= 1.15;
      //redisplay text
      this.text = text + ` - ${this.price.toFixed(2)}$`;
      const updatedCounterText = this.text;
      this.upgrade.innerHTML = updatedCounterText;
    });
  }
  //run an update loop in the animation call
  update() {
    if (counter >= this.price) {
      this.upgrade.disabled = false;
    } else {
      this.upgrade.disabled = true;
    }
  }
}

const upgrade1 = new Upgrade("Buy Stock", 10, 0.1);
const upgrade2 = new Upgrade(
  "Post on Reddit about poor financial choices",
  100,
  2,
);
const upgrade3 = new Upgrade(
  "Withdraw your kids' college funds to invest",
  1000,
  50,
);

upgrade1.upgrade.style.position = "relative";
upgrade1.upgrade.style.transformOrigin = "center";
upgrade1.upgrade.style.bottom = "50px";
upgrade1.upgrade.style.left = "425px";

upgrade2.upgrade.style.position = "relative";
upgrade2.upgrade.style.transformOrigin = "center";
upgrade2.upgrade.style.bottom = "0px";
upgrade2.upgrade.style.left = "140px";

upgrade3.upgrade.style.position = "relative";
upgrade3.upgrade.style.transformOrigin = "center";
upgrade3.upgrade.style.top = "50px";
upgrade3.upgrade.style.right = "275px";

const u1Text: string = `Investments made: ${upgrade1.timesBought}`;
const u1Element = document.createElement("div");
u1Element.innerHTML = u1Text;
u1Element.style.position = "absolute";
u1Element.style.top = "90px";
u1Element.style.left = "60px";
app.append(u1Element);

const u2Text: string = `Posts created: ${upgrade2.timesBought}`;
const u2Element = document.createElement("div");
u2Element.innerHTML = u2Text;
u2Element.style.position = "absolute";
u2Element.style.top = "120px";
u2Element.style.left = "60px";
app.append(u2Element);

const u3Text: string = `Funds drained: ${upgrade3.timesBought}`;
const u3Element = document.createElement("div");
u3Element.innerHTML = u3Text;
u3Element.style.position = "absolute";
u3Element.style.top = "150px";
u3Element.style.left = "60px";
app.append(u3Element);

// Start the loop
requestAnimationFrame(updateCounter);
