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
  text:string ;
  obj: HTMLButtonElement;
  constructor(displayText: string, stylePosition: string, styleBottom: string, scale:string, styleLeft: string, styleRight?: string) {
    //make the style object
    this.text = displayText;
    this.obj = document.createElement("button");
    this.obj.innerHTML = this.text;

    //style the button
    this.obj.style.position = stylePosition;
    this.obj.style.bottom = styleBottom;
    this.obj.style.left = styleLeft;
    this.obj.style.scale = scale;
    if(styleRight) {
      this.obj.style.right = styleRight;
    }
    app.append(this.obj)
  }

}

//upgrade class
class Upgrade {
  text: string;
  price: number;
  scale: number;
  button: Button;
  timesBought: number;
  hudElement: HTMLDivElement;

  constructor(text: string, price: number, scale: number, stylePosition: string, styleBottom: string, styleLeft: string, styleRight: string, UIscale:string) {
    //declare fields and make button
    this.text = text;
    this.price = price;
    this.scale = scale;
    this.timesBought = 0;
    this.hudElement = document.createElement("div");

    this.button = new Button(this.text + ` - ${price}$`, stylePosition, styleBottom, UIscale, styleLeft, styleRight);

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

  makeHudElement(stylePosition: string, styleTop: string, styleLeft: string) {
    this.hudElement.innerHTML = `"${this.text}" purchased: ${this.timesBought}`;
    this.hudElement.style.position = stylePosition;
    this.hudElement.style.top = styleTop;
    this.hudElement.style.left = styleLeft;
    app.append(this.hudElement);
  }
}

//make a clickable button
const button = new Button("🚀", "relative", "150px", "0px", "1.4")

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
  name: string,
  cost: number,
  rate: number
};

const availableItems : Item[] = [
  {name: "Buy Stock", cost: 10, rate: 0.1},
  {name: "Post on Reddit about your poor financial choices", cost: 100, rate: 2},
  {name: "Withdraw your kids' college funds to invest", cost: 1000, rate: 50},
];

let formatTop: number = 300
let formatHud: number = 350

const upgradeList: Upgrade[] = []

availableItems.forEach((item: Item) => {
  const upg = new Upgrade(item.name, item.cost, item.rate, "absolute", `${formatTop}px`, "1", '20px', '20px')
  upgradeList.push(upg)
  upg.makeHudElement("absolute", `${formatHud}px`, "30px")
  formatTop -= 50;
  formatHud += 50;
})

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
    upgrade.update()
  })

  // Schedule the next update
  requestAnimationFrame(updateCounter);
}


// Start the loop
requestAnimationFrame(updateCounter);
