// ===== ONLOAD QUERY SELECTORS =====

var colorPaletteContainer = document.querySelector(".palette-container");

var testButton = document.querySelector("button");

// ===== GLOBAL VARIABLES =====
var currentColorPalette = [];

// var currentColorPalette = [
//   { hexCode: "#489732", status: "unlocked", id: 1690287923557 },
//   { hexCode: "#9DA885", status: "unlocked", id: 1690287923557 },
//   { hexCode: "#B47DC6", status: "locked", id: 1690287923557 },
//   { hexCode: "#851116", status: "locked", id: 1690287923557 },
//   { hexCode: "#CEEEDB", status: "locked", id: 1690287923557 },
// ];

// ===== EVENT LISTENERS =====
window.addEventListener("load", function () {
  setCurrentColors(currentColorPalette);
  displayCurrentColorPalette();
});

testButton.addEventListener("click", function (event) {
  setCurrentColors(currentColorPalette);
  displayCurrentColorPalette();
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
    status: "unlocked",
    id: Date.now(),
  };
  return color;
}

function setCurrentColors(currentColorPalette, savedColorPalette = []) {
  if (savedColorPalette.length) {
    currentColorPalette = savedColorPalette;
  } else {
    if (currentColorPalette.length === 0) {
      for (let i = 0; i <= 4; i++) {
        currentColorPalette.push(createColor());
      }
    } else {
      for (let i = 0; i < currentColorPalette.length; i++) {
        // console.log(currentColorPalette[i]);
        if (currentColorPalette[i].status === "unlocked") {
          var newColor = createColor();
          currentColorPalette.splice(i, 1, newColor);
        }
      }
    }
  }
  console.log(currentColorPalette);
  return currentColorPalette;
}

function displayCurrentColorPalette() {
  colorPaletteContainer.innerHTML = "";
  console.log(currentColorPalette);
  for (let i = 0; i < currentColorPalette.length; i++) {
    console.log(typeof currentColorPalette[i].hexCode);
    colorPaletteContainer.innerHTML += ` <div class = "color-container">
        <div class="color-box" style="background-color: ${currentColorPalette[i].hexCode}"></div>
        <div>${currentColorPalette[i].hexCode}</div>
      </div>`;
  }
}
