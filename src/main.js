// ===== ONLOAD QUERY SELECTORS =====

var colorPaletteContainer = document.querySelector(".color-box-container");

var testButton = document.querySelector("button");

// ===== GLOBAL VARIABLES =====
// var currentColorPalette = [];

var currentColorPalette = [
  { hexCode: "#489732", status: "locked", id: 1690287923557 },
  { hexCode: "#9DA885", status: "locked", id: 1690287923557 },
  { hexCode: "#B47DC6", status: "unlocked", id: 1690287923557 },
  { hexCode: "#851116", status: "unlocked", id: 1690287923557 },
  { hexCode: "#CEEEDB", status: "locked", id: 1690287923557 },
  { hexCode: "#0BA2B8", status: "locked", id: 1690287923557 },
];

// ===== EVENT LISTENERS =====
window.addEventListener("load", function () {
  setCurrentColors(currentColorPalette);
});

testButton.addEventListener("click", function (event) {
  displayCurrentColorPalette(event);
});
// ===== FUNCTIONS =====

function randomHex() {
  var randIndex = Math.floor(Math.random() * hexCharacters.length);
  return hexCharacters[randIndex];
}

function randomHexCode() {
  var randHexCode = "#";
  for (let i = 0; i <= 5; i++) {
    var character = randomHex();
    randHexCode += character;
  }
  return randHexCode;
}

function createColor() {
  var colorCode = randomHexCode();
  var color = {
    hexCode: colorCode,
    status: "locked",
    id: Date.now(),
  };
  return color;
}

function setCurrentColors(currentColorPalette, savedColorPalette = []) {
  if (savedColorPalette.length) {
    currentColorPalette = savedColorPalette;
  } else {
    if (currentColorPalette.length === 0) {
      for (let i = 0; i <= 5; i++) {
        currentColorPalette.push(createColor());
      }
    } else {
      for (let i = 0; i < currentColorPalette.length; i++) {
        console.log(currentColorPalette[i]);
        if (currentColorPalette[i].status === "unlocked") {
          var newColor = createColor();
          currentColorPalette.splice(i, 1, newColor);
        }
      }
    }
  }
  //   console.log(currentColorPalette);
  return currentColorPalette;
}

function displayCurrentColorPalette() {
  for (let i = 0; i < currentColorPalette.length; i++)
    console.log(colorPaletteContainer.innerHTML);
}
