import {createElement, updatePlayerTable} from "./domlib.js";
import players from "./players.js";
import Player from "./player.js";


player_add_button.onclick = addPlayer;
player_name_input.onkeypress = event => {
  if (event.keyCode == 13) {
    addPlayer();
  }
}

function addPlayer(event){
  players.push(new Player(player_name_input.value, players.length));
  player_name_input.value = "";
  updatePlayerTable();
}

function main() {
  updatePlayerTable();
}
window.addEventListener("load", main);
window.onbeforeunload = event => {
   return "true";
}
