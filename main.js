import {createElement, updatePlayerTable, onEnter} from "./domlib.js";
import players from "./players.js";
import Player from "./player.js";


player_add_button.onclick = addPlayer;
player_name_input.onkeypress = onEnter(addPlayer);

player_remove_button.onclick = removePlayer;
player_id_input.onkeypress = onEnter(removePlayer);

function addPlayer(){
  players.push(new Player(player_name_input.value, players.length));
  player_name_input.value = "";
  updatePlayerTable();
}

function removePlayer(){
  const id = player_id_input.value-1;
  if (isNaN(id) || id < 0) {
    return;
  }
  players.splice(id, 1);
  for (let i = id; i < players.length; i++) {
    players[i].id = i;
  }
  updatePlayerTable();
}

function main() {
  updatePlayerTable();
}
window.addEventListener("load", main);
window.onbeforeunload = event => {
   return players.length > 0;
}
