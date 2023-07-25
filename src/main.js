// ===== GLOBAL VARIABLES =====
var currentColorPalette = [];

// ===== EVENT LISTENERS =====
window.addEventListener("load", function () {
  setCurrentColors(currentColorPalette);
});

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
    }
  }
  //   console.log(currentColorPalette);
  return currentColorPalette;
}
