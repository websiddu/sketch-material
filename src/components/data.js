import Utils from "../utils";

export default {
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  applyFakeData(fakedata) {
    var selection = Utils.selection();

    if (selection.count() <= 0) {
      Utils.message("Select a text layer first");
    } else {
      var selecitonLoop = selection.objectEnumerator();
      var shuffle = this.shuffle(fakedata.data);
      var i = 0,
        sel;

      while ((sel = selecitonLoop.nextObject())) {
        if (Utils.is(sel, MSTextLayer)) {
          if (i > shuffle.length) i = 0;
          sel.setStringValue(shuffle[i]);
          i++;
        }
      }
    }
  }
};
