// ===== ONLOAD QUERY SELECTORS =====

var colorPaletteContainer = document.querySelector(".palette-container");

var newPaletteButton = document.querySelector(".palette-button");

var savePaletteButton = document.querySelector(".save-palette");

var savedColorsContainer = document.querySelector(".saved-colors-container");

var savedPalettesContainer = document.querySelector(".saved-palettes-container");

var layer = document.querySelector(".layer")


console.log("saved Palettes Container", savedPalettesContainer);
// ===== GLOBAL VARIABLES =====
var currentColorPalette = {
  colors: [],
  id: Date.now(),
};

var savedColorPalette = []
// TO DO - THINK ABOUT FUNCTION INSTEAD

// var currentColorPalette = {
//   colors: [
//     { hexCode: "#EA9999", status: "locked", id: 1690287923557 },
//     { hexCode: "#FACB9C", status: "locked", id: 1690287923557 },
//     { hexCode: "#FFE59A", status: "locked", id: 1690287923557 },
//     { hexCode: "#B6D7A8", status: "locked", id: 1690287923557 },
//     { hexCode: "#A4C4CA", status: "locked", id: 1690287923557 },
//   ],
//   id: Date.now(),
// };

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
  savePalette(currentColorPalette);
  displaySavedPalette(savedColorPalette, savedColorsContainer);

  setCurrentColors(currentColorPalette);
  displayCurrentColorPalette();
})

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
    id: colorCode,
  };
  return color;
}

function setCurrentColors(
  currentColorPalette,
  // savedColorPalette = { colors: [], id: Date.now() }
) {
  // if (savedColorPalette.colors.length) {
  //   currentColorPalette = savedColorPalette;
  // } else {
  if (currentColorPalette.colors.length === 0) {
    for (let i = 0; i <= 4; i++) {
      currentColorPalette.colors.push(createColor());
    }
  } else {
    for (let i = 0; i < currentColorPalette.colors.length; i++) {
      // console.log(currentColorPalette[i]);
      if (currentColorPalette.colors[i].status === "unlocked") {
        var newColor = createColor();
        currentColorPalette.colors.splice(i, 1, newColor);
      }
    }
  }
  return currentColorPalette.id = Date.now();
}
//   console.log(currentColorPalette);

// }

function displayCurrentColorPalette() {
  colorPaletteContainer.innerHTML = "";
  for (let i = 0; i < currentColorPalette.colors.length; i++) {
    // console.log(typeof currentColorPalette.colors[i].hexCode);
    colorPaletteContainer.innerHTML += ` <div class = "color-container">
        <div class="color-box" id="${currentColorPalette.colors[i].id}" style="background-color: ${currentColorPalette.colors[i].hexCode}">
        <img id="${currentColorPalette.colors[i].id}"class="image"src='assets/${currentColorPalette.colors[i].status}.png'> </div>
        <div class="current-color-palette-text">${currentColorPalette.colors[i].hexCode}</div>
      </div>`;
  }
}

function lockAndUnlock(event) {
  var lockEmoji = event.target.id;
  //   console.log(lockEmoji);
  // iterate through the array go to the data model and change the status of the specific one
  var index;
  for (let i = 0; i < currentColorPalette.colors.length; i++) {
    if (currentColorPalette.colors[i].id === lockEmoji) {
      //   console.log(i);
      index = i;
    }
  }
  //   console.log(currentColorPalette.colors[index].status);
  if (currentColorPalette.colors[index].status === "locked") {
    currentColorPalette.colors[index].status = "unlocked";
    // console.log("getting here");
  } else {
    currentColorPalette.colors[index].status = "locked";
    // console.log("getting here2");
  }
}

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
  savedColorPalette.push(savedPalette);
  console.log(savedColorPalette);
  return savedColorPalette;
}


function displaySavedPalette(savedColorPalette, savedColorsContainer) {
  savedColorsContainer.innerHTML = ""
  for (var i = 0; i < savedColorPalette.length; i++) {
    savedColorsContainer.innerHTML += 
`<div class="layer">
   <div class="delete-x-container" id="delete-button">
     <img class="delete-x" src='assets/delete.png'>
   </div>
   <div class="saved-color-box" style="background-color: ${savedColorPalette[i].colors[0].hexCode}"></div>
   <div class="saved-color-box" style="background-color: ${savedColorPalette[i].colors[1].hexCode}"></div>
   <div class="saved-color-box" style="background-color: ${savedColorPalette[i].colors[2].hexCode}"></div>
   <div class="saved-color-box" style="background-color: ${savedColorPalette[i].colors[3].hexCode}"></div>
   <div class="saved-color-box" style="background-color: ${savedColorPalette[i].colors[4].hexCode}"></div>
    </div>`;
  }
};
//   var deleteButton = document.querySelector(".delete-x-container");

//   deleteButton.addEventListener("click",function(event) {
//     for ( var i  = 0; i < savedColorPalette.length; i++) {
//       if (savedColorPalette[i].id === parseInt(event.target.closest('saved-color-box').id)) {
//         savedColorPalette.splice(i, 1)
//       }
//       return savedColorPalette
//     }
//   })
// };
