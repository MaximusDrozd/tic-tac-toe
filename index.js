const gameField = document.querySelector(".wrapper");
const gamers = document.querySelectorAll(".gamer");
const popup = document.querySelector(".popup");
const messageBlock = document.querySelector(".text");
const buttonRestart = document.querySelector("#restart");
const withBmw = document.getElementsByClassName("bmw");
const withMb = document.getElementsByClassName("mb");

let counter = 0;
let store = {};

const checkResult = () => {
  return (
    (store.cell1 === store.cell2 &&
      store.cell1 === store.cell3 &&
      store.cell1) ||
    (store.cell4 === store.cell5 &&
      store.cell4 === store.cell6 &&
      store.cell4) ||
    (store.cell7 === store.cell8 &&
      store.cell7 === store.cell9 &&
      store.cell7) ||
    (store.cell1 === store.cell4 &&
      store.cell1 === store.cell7 &&
      store.cell1) ||
    (store.cell2 === store.cell5 &&
      store.cell2 === store.cell8 &&
      store.cell2) ||
    (store.cell3 === store.cell6 &&
      store.cell3 === store.cell9 &&
      store.cell3) ||
    (store.cell1 === store.cell5 &&
      store.cell1 === store.cell9 &&
      store.cell1) ||
    (store.cell7 === store.cell3 && store.cell7 === store.cell5 && store.cell7)
  );
};

const makeGamerActive = (gamer) => {
  if (gamer === "bmw") {
    makeFirstGamerActive();
  } else {
    makeSecondGamerActive();
  }
};
const makeFirstGamerActive = () => {
  gamers[0].classList.add("active");
  gamers[1].classList.remove("active");
};

const makeSecondGamerActive = () => {
  gamers[1].classList.add("active");
  gamers[0].classList.remove("active");
};

buttonRestart.addEventListener("click", () => {
  store = {};
  counter = 0;

  Array.from(withBmw).forEach((el) => el.classList.remove("bmw"));
  Array.from(withMb).forEach((el) => el.classList.remove("mb"));

  const activeGamer = document.querySelector(".active");

  if (activeGamer) {
    activeGamer.classList.remove("active");
  }

  gameField.classList.remove("blocked");
  popup.classList.add("hidden");
});

const countSteps = (isWin) => {
  return Object.values(store).filter((el) => el === isWin).length;
};

const showResult = (isWin) => {
  gameField.classList.add("blocked");
  popup.classList.remove("hidden");

  const stepCount = countSteps(isWin);

  const message = isWin
    ? `${isWin} won in ${stepCount} steps.`
    : `Besides the friendship finally won.`;
  messageBlock.textContent = message;
};

const setResultToLocalStorage = (isWin) => {
  const key = Date.now();

  const stepCount = countSteps(isWin);

  const message = isWin ? `${isWin} won in ${stepCount} steps` : `Draw`;

  const storageResults = Object.keys(localStorage);
  const storageResultsCount = storageResults.length;

  if (storageResultsCount === 10) {
    const minKey = storageResults.sort((a, b) => a - b)[0];

    localStorage.removeItem(minKey);
  }

  localStorage.setItem(key, message);
};

gameField.addEventListener("click", (event) => {
  if (counter >= 9) return;

  if (
    event.target.classList.contains("bmw") ||
    event.target.classList.contains("mb")
  )
    return;

  if (!event.target.classList.contains("cell")) return;

  const targetElement = counter % 2 === 0 ? "bmw" : "mb";
  event.target.classList.add(targetElement);

  makeGamerActive(targetElement);

  const id = event.target.getAttribute("id");
  store[id] = targetElement;

  const isWin = checkResult();

  counter++;

  if (isWin || (!isWin && counter === 9)) {
    showResult(isWin);
    setResultToLocalStorage(isWin);
  }
});
