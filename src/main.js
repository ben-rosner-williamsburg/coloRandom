// ===== ONLOAD QUERY SELECTORS =====

var colorPaletteContainer = document.querySelector(".palette-container");
var newPaletteButton = document.querySelector(".palette-button");
var savePaletteButton = document.querySelector(".save-palette");
var savedColorsContainer = document.querySelector(".saved-colors-container");
var savedPalettesMessage = document.querySelector(".saved-palettes-message");

// ===== GLOBAL VARIABLES =====

var currentColorPalette = {
  colors: [],
};

var savedColorPalettes = [];

// ===== EVENT LISTENERS =====

window.addEventListener("load", function () {
  setCurrentColors(currentColorPalette);
  displayCurrentColorPalette();
});

newPaletteButton.addEventListener("click", function () {
  setCurrentColors(currentColorPalette);
  displayCurrentColorPalette();
});

colorPaletteContainer.addEventListener("click", function (event) {
  lockAndUnlock(event);
  displayCurrentColorPalette();
});

savePaletteButton.addEventListener("click", function () {
  hideElement(savedPalettesMessage);
  savePalette(currentColorPalette);
  displaySavedPalette(savedColorPalettes, savedColorsContainer);
  setCurrentColors(currentColorPalette);
  displayCurrentColorPalette();
});

savedColorsContainer.addEventListener("click", function (event) {
  deleteSavedPalette(event);
  displaySavedPalette(savedColorPalettes, savedColorsContainer);
  displayCurrentColorPalette(currentColorPalette);
});



// ===== EVENT HANDLERS =====

function randomHex() {
  var randIndex = Math.floor(Math.random() * hexCharacters.length);
  return hexCharacters[randIndex];
};

function randomHexCode() {
  var randHexCode = "#";
  for (let i = 0; i <= 5; i++) {
    var character = randomHex();
    randHexCode += character;
  }
  return randHexCode;
};

function createColor() {
  var colorCode = randomHexCode();
  var color = {
    hexCode: colorCode,
    status: "unlocked",
    id: colorCode,
  };
  return color;
};

function setCurrentColors(currentColorPalette) {
  if (!currentColorPalette.colors.length) {
    for (let i = 0; i <= 4; i++) {
      currentColorPalette.colors.push(createColor());
    }
  } else {
    for (let i = 0; i < currentColorPalette.colors.length; i++) {
      if (currentColorPalette.colors[i].status === "unlocked") {
        var newColor = createColor();
        currentColorPalette.colors.splice(i, 1, newColor);
      }
    }
  }
  currentColorPalette.id = Date.now();
};

function displayCurrentColorPalette() {
  colorPaletteContainer.innerHTML = "";
  for (let i = 0; i < currentColorPalette.colors.length; i++) {
    colorPaletteContainer.innerHTML += ` <div class = "color-container">
        <div class="color-box" id="${currentColorPalette.colors[i].id}" style="background-color: ${currentColorPalette.colors[i].hexCode}">
        <img id="${currentColorPalette.colors[i].id}"class="image"src='assets/${currentColorPalette.colors[i].status}.png'> </div>
        <div class="current-color-palette-text">${currentColorPalette.colors[i].hexCode}</div>
      </div>`;
  }
};

function lockAndUnlock(event) {
  var lockEmoji = event.target.id;
  var index;
  for (let i = 0; i < currentColorPalette.colors.length; i++) {
    if (currentColorPalette.colors[i].id === lockEmoji) {
      index = i;
    }
  }
  if (currentColorPalette.colors[index].status === "locked") {
    currentColorPalette.colors[index].status = "unlocked";
  } else {
    currentColorPalette.colors[index].status = "locked";
  }
};

function savePalette(palette) {
  var savedPalette = { colors: [], id: palette.id };
  for (let i = 0; i < palette.colors.length; i++) {
    var color = {
      hexCode: palette.colors[i].hexCode,
      status: palette.colors[i].status,
      id: palette.colors[i].id,
    };
    savedPalette.colors.push(color);
  }
  savedColorPalettes.push(savedPalette);
};

function displaySavedPalette(savedColorPalettes, savedColorsContainer) {
  savedColorsContainer.innerHTML = "";
  for (var i = 0; i < savedColorPalettes.length; i++) {

    savedColorsContainer.innerHTML += `<div class="layer" > 
   <div class="saved-color-box" id=${savedColorPalettes[i].colors[0].id} style="background-color: ${savedColorPalettes[i].colors[0].hexCode}"></div>
   <div class="saved-color-box" id=${savedColorPalettes[i].colors[1].id} style="background-color: ${savedColorPalettes[i].colors[1].hexCode}"></div>
   <div class="saved-color-box" id=${savedColorPalettes[i].colors[2].id} style="background-color: ${savedColorPalettes[i].colors[2].hexCode}"></div>
   <div class="saved-color-box" id=${savedColorPalettes[i].colors[3].id} style="background-color: ${savedColorPalettes[i].colors[3].hexCode}"></div>
   <div class="saved-color-box" id=${savedColorPalettes[i].colors[4].id} style="background-color: ${savedColorPalettes[i].colors[4].hexCode}"></div>
   <img id="${savedColorPalettes[i].id}"class="image delete"src='assets/delete.png'>
    </div>`;
  }
};

function deleteSavedPalette(event) {
  var deletePalette = event.target;
  for (let i = 0; i < savedColorPalettes.length; i++) {
    if (
      savedColorPalettes[i].id.toString() === deletePalette.id &&
      deletePalette.classList.contains("delete")
    ) {
      savedColorPalettes.splice(i, 1);
    }
  }
};

function hideElement(message) {
  message.classList.toggle("hidden", true);
};