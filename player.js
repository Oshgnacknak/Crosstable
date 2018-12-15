import {createElement, updatePlayerTable} from "./domlib.js";
import players from "./players.js";

export default class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.points = [];
  }

  createTr() {
    const tr = createElement("tr", "", player_table);

    for (let s of [this.id + 1, this.name]) {
      createElement("td", s, tr);
    }

    for (let i=0; i<players.length; i++) {
      const td = createElement("td", "", tr);
      const input = createElement("input", "", td);
      if (i == this.id) {
        input.disabled = true;
        input.value = "XXX";
      } else {
        if (this.points.length>i) {
          input.value = this.points[i] != undefined ? this.points[i] : "";
        }
      }
      input.size = 1;
      input.onkeypress = event => {
        event.preventDefault();
        let point;
        switch (event.key) {
          case "1":
            point = 1;
            break;
          case "2":
          case "5":
          case ",":
          case ".":
            point = .5;
            break;
          case "0":
            point = 0;
            break;
          default:
            return;
        }
        this.points[i] = point;
        players[i].points[this.id] = 1 - point;
        updatePlayerTable();
      }
    }

    for (let s of [this.getPointSum(), this.getPlace()]) {
      createElement("td", s, tr);
    }

    return tr;
  }

  getPointSum() {
    return this.points.reduce((a, b) => a + b, 0);
  }

  getPlace() {
    const sortedPlayers = players.map(p => {
      return {id: p.id, points: p.getPointSum()}
    }).sort((a, b) => b.points-a.points);
    return sortedPlayers.map(e => e.id).indexOf(this.id)+1;
  }
}
