import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "To The Moon!";
document.title = gameName;

const header = document.createElement("h1");
header.style.position = "relative";
header.style.bottom = "150px";
header.innerHTML = gameName;
app.append(header);

//button generator
class Button {
  text: string;
  obj: HTMLButtonElement;
  constructor(
    displayText: string,
    stylePosition: string,
    styleBottom: string,
    scale: string,
    styleLeft: string,
    styleRight?: string,
  ) {
    //make the style object
    this.text = displayText;
    this.obj = document.createElement("button");
    this.obj.innerHTML = this.text;

    //style the button
    this.obj.style.position = stylePosition;
    this.obj.style.bottom = styleBottom;
    this.obj.style.left = styleLeft;
    this.obj.style.scale = scale;
    if (styleRight) {
      this.obj.style.right = styleRight;
    }
    app.append(this.obj);
  }
}

//upgrade class
class Upgrade {
  text: string;
  price: number;
  scale: number;
  tooltip: string;
  button: Button;
  timesBought: number;
  hudElement: HTMLDivElement;

  constructor(
    text: string,
    price: number,
    scale: number,
    tooltip: string,
    stylePosition: string,
    styleBottom: string,
    styleLeft: string,
    styleRight: string,
    UIscale: string,
  ) {
    //declare fields and make button
    this.text = text;
    this.price = price;
    this.scale = scale;
    this.tooltip = tooltip;
    this.timesBought = 0;
    this.hudElement = document.createElement("div");

    this.button = new Button(
      this.text + ` - ${price}$`,
      stylePosition,
      styleBottom,
      UIscale,
      styleLeft,
      styleRight,
    );

    //make button tooltip
    this.button.obj.title = this.tooltip;
    
    //add listener to button
    this.button.obj.addEventListener("click", () => {
      //update numbers
      this.timesBought += 1;
      rate += this.scale / fps;
      dps += this.scale;
      counter -= this.price;
      this.price *= 1.15;
      //redisplay text
      const updatedCounterText = this.text + ` - ${this.price.toFixed(2)}$`;
      this.button.obj.innerHTML = updatedCounterText;
    });
  }
  //run an update loop in the animation call
  update() {
    if (counter >= this.price) {
      this.button.obj.disabled = false;
    } else {
      this.button.obj.disabled = true;
    }
    this.hudElement.innerHTML = `"${this.text}" purchased: ${this.timesBought}`;
  }

  makeHudElement(
    stylePosition: string,
    styleBottom: string,
    styleLeft: string,
  ) {
    this.hudElement.innerHTML = `"${this.text}" purchased: ${this.timesBought}`;
    this.hudElement.style.position = stylePosition;
    this.hudElement.style.bottom = styleBottom;
    this.hudElement.style.left = styleLeft;
    app.append(this.hudElement);
  }
}

//make a clickable button
const button = new Button("🚀", "relative", "150px", "0px", "1.4");

//add a listener and a counter
let counter: number = 0;
const counterText: string = `GME Stock Price: ${counter}$`;
const counterElement = document.createElement("div");
counterElement.innerHTML = counterText;
counterElement.style.position = "relative";
counterElement.style.bottom = "140px";
app.append(counterElement);

button.obj.addEventListener("click", () => {
  counter += 1;
  const updatedCounterText = `GME Stock Price: ${counter}$`;
  counterElement.innerHTML = updatedCounterText;
});

//make upgrades
interface Item {
  name: string;
  cost: number;
  rate: number;
  tooltip: string;
}

const availableItems: Item[] = [
  { 
    name: "Buy Stock!", 
    cost: 10, 
    rate: 0.1,
    tooltip: "It can't fail! Earns you 0.10$/second",
  },
  {
    name: "Post on Reddit about your poor financial choices!",
    cost: 100,
    rate: 2,
    tooltip: "Surely showing your loses to the public will get more investors! 2$/second",
  },
  { 
    name: "Withdraw your kids' college funds to invest!", 
    cost: 1000,
    rate: 50,
    tooltip: "The streets will teach them everything they need to know. 50$/second"
  },
  { 
    name: "Drain the retirment fund!", 
    cost: 10000,
    rate: 1000,
    tooltip: "More like 401 Yay, am I right? 1000$/second"
  },
  { 
    name: "Reverse mortgage the house!", 
    cost: 100000,
    rate: 5000,
    tooltip: "I hear the pawn shop is always accepting wedding rings! 5000$/second"
  },
];

let formatBottom: number = 300;

const upgradeList: Upgrade[] = [];

availableItems.forEach((item: Item) => {
  const upg = new Upgrade(
    item.name,
    item.cost,
    item.rate,
    item.tooltip,
    "absolute",
    `${formatBottom}px`,
    "1",
    "20px",
    "20px",
  );
  upgradeList.push(upg);
  upg.makeHudElement("absolute", `${formatBottom + 5}px`, "30px");
  formatBottom -= 50;
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
dpsElement.style.top = "30px";
dpsElement.style.left = "30px";
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

  //make upgrades available
  upgradeList.forEach((upgrade) => {
    upgrade.update();
  });

  // Schedule the next update
  requestAnimationFrame(updateCounter);
}

// Start the loop
requestAnimationFrame(updateCounter);
