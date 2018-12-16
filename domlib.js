import players from "./players.js";

function createElement(type, innerHTML = "", parent=null) {
  const elem = document.createElement(type);
  elem.innerHTML = innerHTML;
  if (parent) {
    parent.appendChild(elem);
  }
  return elem;
}

function updatePlayerTable() {
  player_table.innerHTML = "";
  const tr = createElement("tr", "", player_table);
  for (let s of ["Nr", "Name"]) {
    createElement("th", s, tr);
  }
  for (let s of players.map((p, i) => i+1)) {
    createElement("th", s, tr);
  }
  for (let s of ["Score", "Place"]) {
    createElement("th", s, tr);
  }
  for (let p of players) {
    p.createTr(players);
  }
}

function onEnter(callback) {
  return function(event) {
    if (event.keyCode == 13) {
      callback(event);
    }
  }
}

export {createElement, updatePlayerTable, onEnter};
