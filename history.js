import { display, numbers, isOperandSelected } from "./script.js";
const historyMemoryTitle = document.querySelector(".his-memmory");
const historyList = document.querySelector(".history-calculator");
const memoryList = document.querySelector(".memory-calculator");
const memoryItem = document.querySelector(".memory-value");
const historyItem = document.querySelector(".history-value");
const trashBin = document.querySelector(".trash-bin");
const memorySign = document.querySelector(".memory-sign");
const mc = document.querySelector(".mc");
const mr = document.querySelector(".mr");
let historyData = [];
let memoryData = [];

// Update History Memory

function updateMemory() {
  memoryList.innerHTML = "";
  memoryData.forEach((element) => {
    const li = document.createElement("li");
    li.innerHTML += element;
    memoryList.prepend(li);
  });
}

function updateHistory() {
  historyList.innerHTML = "";
  historyData.forEach((element) => {
    const li = document.createElement("li");
    li.innerHTML += element;
    historyList.prepend(li);
  });
}

// Title Memory History +_+

historyMemoryTitle.addEventListener("click", (e) => {
  const { target } = e;
  if (target.classList.contains("memory-value")) {
    memoryItem.classList.add("border-bottom");
    historyItem.classList.remove("border-bottom");
    historyList.style.display = "none";
    memoryList.style.display = "block";
  }

  if (target.classList.contains("history-value")) {
    historyItem.classList.add("border-bottom");
    memoryItem.classList.remove("border-bottom");
    historyList.style.display = "block";
    memoryList.style.display = "none";
  }
});

// MEMORY Mc .... (;

memorySign.addEventListener("click", (e) => {
  const { target } = e;

  if (target.classList.contains("mc")) {
    memoryData = [];
    memoryList.innerHTML = "There's nothing save in memory";
    mr.setAttribute("disabled", "");
    mc.setAttribute("disabled", "");
  }
  if (target.classList.contains("mr")) {
    display.innerHTML = memoryData[memoryData.length - 1];
    if (isOperandSelected) {
      numbers.num2 = display.innerHTML;
      console.log(numbers.num2);
    } else {
      numbers.num1 = display.innerHTML;
      console.log(numbers.num1);
    }
  }
  if (target.classList.contains("m+")) {
    mc.removeAttribute("disabled");
    mr.removeAttribute("disabled");

    if (memoryData.length === 0) {
      memoryData.push(display.innerHTML);
    } else {
      let lastNumber = memoryData.pop(memoryData[memoryData.length - 1]);
      lastNumber = parseFloat(lastNumber) + parseFloat(display.innerHTML);
      memoryData.push(lastNumber);
    }
    updateMemory();
  }
  if (target.classList.contains("m-")) {
    mc.removeAttribute("disabled");
    mr.removeAttribute("disabled");
    if (memoryData.length === 0) {
      memoryData.push(-display.innerHTML);
    } else {
      let lastNumber = memoryData.pop(memoryData[memoryData.length - 1]);
      lastNumber = lastNumber - display.innerHTML;
      memoryData.push(lastNumber);
    }
    updateMemory();
  }
  if (target.classList.contains("ms")) {
    mc.removeAttribute("disabled");
    mr.removeAttribute("disabled");
    memoryData.push(display.innerHTML);
    updateMemory();
  }
});

// TRASH BIN  Deleted ....

trashBin.addEventListener("click", () => {
  if (historyList.style.display == "block") {
    historyData = [];
    historyList.innerHTML = " There's no history yet";
  } else {
    memoryData = [];
    memoryList.innerHTML = "There's nothing save in memory";
    mr.setAttribute("disabled", "");
    mc.setAttribute("disabled", "");
  }
});

// MODULE EXPORT

export { updateHistory, historyData };
