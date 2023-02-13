/*
 *	Class that implements the merge
 * 	sort algorithm to sort the nodes
 */
class Merge extends NodeMaster {
  constructor() {
    super();
    this.sortButton.addEventListener("click", () => {
      this.sortButton.style.display = "none";
      console.log(this.stage);
      this.#mergeSort(0, this.stage.length - 1, this.stage.length);
      console.log(this.stage);
    });
  }

  #merge(leftIndex, midIndex, rightIndex) {
    var leftMax = midIndex - leftIndex + 1;
    var rightMax = rightIndex - midIndex;
    var leftArr = new Array(leftMax);
    var rightArr = new Array(rightMax);
    // load left arr with first half of nodes,x
    for (var i = 0; i < leftMax; i++)
      leftArr[i] = this.stage[leftIndex + i]["node"];
    // load right arr with last half of nodes,x
    for (var j = 0; j < rightMax; j++)
      rightArr[j] = this.stage[midIndex + 1 + j]["node"];
    var i = 0,
      j = 0,
      k = leftIndex;
    while (i < leftMax && j < rightMax) {
      if (leftArr[i].value <= rightArr[j].value) {
        this.stage[k]["node"] = leftArr[i];
        this.stage[k]["node"].setPosition(this.stage[k]["x"], "vw", "", "");
        i++;
        k++;
      } else {
        this.stage[k]["node"] = rightArr[j];
        this.stage[k]["node"].setPosition(this.stage[k]["x"], "vw", "", "");
        j++;
        k++;
      }
    }
    while (i < leftMax) {
      this.stage[k]["node"] = leftArr[i];
      this.stage[k]["node"].setPosition(this.stage[k]["x"], "vw", "", "");
      i++;
      k++;
    }
    while (j < rightMax) {
      this.stage[k]["node"] = rightArr[j];
      this.stage[k]["node"].setPosition(this.stage[k]["x"], "vw", "", "");
      j++;
      k++;
    }
  }

  #mergeSort(l, r, ticks) {
    if (l < r) {
      var m = l + parseInt((r - l) / 2);
      this.#mergeSort(l, m, ticks / 2);
      this.#mergeSort(m + 1, r, ticks / 2);
      this.#merge(l, m, r, ticks / 2);
    }
  }
}
