import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "To The Moon!";
document.title = gameName;

const gameNameString = "To The Moon!";

//Credit to Brace for help with this code
const header = document.createElement("h1");
header.classList.add("wiggle-text");
header.style.position = "relative";
header.style.bottom = "150px";
gameNameString.split("").forEach((char) => {
  // Create a new span element for each character
  const span = document.createElement("span");
  span.textContent = char;

  // Append the span to the title element
  header.appendChild(span);
});
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
      perSecondIncrement += this.scale / framesPerSecond;
      profitPerSecond += this.scale;
      counter -= this.price;
      this.price *= itemCostScaling;
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
const buttonTop = "170px";
const buttonLeft = "0px";
const button = new Button("🚀", "relative", buttonTop, "2", buttonLeft);

const buttonContainer = document.createElement("div");
app.append(buttonContainer);

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
  floatDollar();
});

//make upgrades
interface Item {
  name: string;
  cost: number;
  perSecondIncrease: number;
  tooltip: string;
}

const availableItems: Item[] = [
  {
    name: "Buy Stock!",
    cost: 10,
    perSecondIncrease: 0.1,
    tooltip: "It can't fail! Earns you 0.10$/second",
  },
  {
    name: "Post on Reddit about your poor financial choices!",
    cost: 100,
    perSecondIncrease: 2,
    tooltip:
      "Surely showing your loses to the public will get more investors! 2$/second",
  },
  {
    name: "Withdraw your kids' college funds to invest!",
    cost: 1000,
    perSecondIncrease: 50,
    tooltip:
      "The streets will teach them everything they need to know. 50$/second",
  },
  {
    name: "Drain the retirment fund!",
    cost: 10000,
    perSecondIncrease: 1000,
    tooltip: "More like 401 Yay, am I right? 1000$/second",
  },
  {
    name: "Reverse mortgage the house!",
    cost: 100000,
    perSecondIncrease: 5000,
    tooltip:
      "I hear the pawn shop is always accepting wedding rings! 5000$/second",
  },
];

let formatBottom: number = 300;

const upgradeList: Upgrade[] = [];

availableItems.forEach((item: Item) => {
  const upg = new Upgrade(
    item.name,
    item.cost,
    item.perSecondIncrease,
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

//global variables
const itemCostScaling: number = 1.15;

//declare rate related variables
let originTime: number = performance.now();
let framesPerSecond: number = 0;
let perSecondIncrement: number = 0;
let profitPerSecond: number = 0;

//hud text
const profitPerSecondText: string = `"Profit" per second: ${profitPerSecond.toFixed(2)}$`;
const profitPerSecondElement = document.createElement("div");
profitPerSecondElement.innerHTML = profitPerSecondText;
profitPerSecondElement.style.position = "absolute";
profitPerSecondElement.style.top = "30px";
profitPerSecondElement.style.left = "30px";
app.append(profitPerSecondElement);

function updateFrameRate(): void {
  //gather frame rate
  const deltaTime = performance.now();
  framesPerSecond = 1000 / (deltaTime - originTime);
  originTime = deltaTime;
}

function updateStockPrice(): void {
  // Update the displayed text
  const updatedCounterText = `GME Stock Price: ${counter.toFixed(2)}$`;
  counterElement.innerHTML = updatedCounterText;
}

function updateProfit(): void {
  //profit per second text
  const updatedProfitPerSecondText = `"Profit" per second: ${profitPerSecond.toFixed(2)}$`;
  profitPerSecondElement.innerHTML = updatedProfitPerSecondText;
}

function updateShake(num: number): void {
  if (num <= 0) {
    num = 0.07;
  }
  const spans = document.querySelectorAll(".wiggle-text span");
  spans.forEach((span) => {
    (span as HTMLElement).style.animationDuration = num + "s";
  });
}

function floatDollar(): void {
  const dollarSign = document.createElement("div");
  dollarSign.className = "dollar";
  dollarSign.textContent = "$";

  // Position the dollar sign near the button

  dollarSign.style.left = `${630 + Math.floor(Math.random() * 10)}px`;
  dollarSign.style.top = `${190}px`;

  buttonContainer.appendChild(dollarSign);

  // Remove the dollar sign after the animation completes
  setTimeout(() => {
    dollarSign.remove();
  }, 2000);
}

// Define the function to update the counter
function updateCounter() {
  //get current frameRate
  updateFrameRate();

  //add to the counter with each pass
  counter += perSecondIncrement;

  //update the shaking speed
  updateShake(1.5 - profitPerSecond / 20);

  // Update the displayed text
  updateStockPrice();

  //profit per second text
  updateProfit();

  //make upgrades available
  upgradeList.forEach((upgrade) => {
    upgrade.update();
  });

  // Schedule the next update
  requestAnimationFrame(updateCounter);
}

// Start the loop
requestAnimationFrame(updateCounter);
