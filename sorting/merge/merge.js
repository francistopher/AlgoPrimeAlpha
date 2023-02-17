/*
 *	Class that implements the merge
 * 	sort algorithm to sort the nodes
 */
class Merge extends NodeMaster {

    #shuffleColors()
    {
        for (let i = this.colors.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = this.colors[i];
          this.colors[i] = this.colors[j];
          this.colors[j] = temp;
        }
      }

    constructor() {
        super();
        this.colors = ["lightgreen", "yellow", "orange", "red", "mediumpurple", "lightblue", "cyan", "lightpink"]
        this.sortButton.addEventListener("click", () => {
            this.#shuffleColors();
            this.sortButton.style.display = "none";
            this.#mergeSort(0, this.stage.length - 1, 0, this.stage.length * 2750);
            setTimeout(()=> {
            this.nodeCountSlider.style.display = "inline";
              this.shuffleButton.style.display = "inline";
            }, (this.stage.length - 1) * 2750);
        });
    }

    #merge(leftIndex, midIndex, rightIndex, colorIndex, ticks) {
        var leftMax = midIndex - leftIndex + 1;
        var rightMax = rightIndex - midIndex;
        var leftArr = new Array(leftMax);
        var rightArr = new Array(rightMax);
        // load left arr with first half of nodes,x
        for (var i = 0; i < leftMax; i++) {
            leftArr[i] = this.stage[leftIndex + i]["node"];
            this.stage[leftIndex + i]["node"].setBackgroundColor(this.colors[colorIndex]);
        }
        // load right arr with last half of nodes,x
        for (var j = 0; j < rightMax; j++) {
            rightArr[j] = this.stage[midIndex + 1 + j]["node"];
            this.stage[midIndex + 1 + j]["node"].setBackgroundColor(this.colors[colorIndex]);
        }
        var i = 0,
            j = 0,
            k = leftIndex;
        setTimeout(() => {
            while (i < leftMax && j < rightMax) {
                if (leftArr[i].value <= rightArr[j].value) {
                    this.stage[k]["node"] = leftArr[i];
                    this.stage[k]["node"].setPosition(
                        this.stage[k]["x"],
                        "vw",
                        "",
                        ""
                    );
                    i++;
                    k++;
                } else {
                    this.stage[k]["node"] = rightArr[j];
                    this.stage[k]["node"].setPosition(
                        this.stage[k]["x"],
                        "vw",
                        "",
                        ""
                    );
                    j++;
                    k++;
                }
            }
            while (i < leftMax) {
                this.stage[k]["node"] = leftArr[i];
                this.stage[k]["node"].setPosition(
                    this.stage[k]["x"],
                    "vw",
                    "",
                    ""
                );
                i++;
                k++;
            }
            while (j < rightMax) {
                this.stage[k]["node"] = rightArr[j];
                this.stage[k]["node"].setPosition(
                    this.stage[k]["x"],
                    "vw",
                    "",
                    ""
                );
                j++;
                k++;
            }
            for (i = 0; i < leftMax; i++) {
                this.stage[leftIndex + i]["node"].setBackgroundColor(this.colors[colorIndex]);
            }
            // load right arr with last half of nodes,x
            for (j = 0; j < rightMax; j++) {
                this.stage[midIndex + 1 + j]["node"].setBackgroundColor(
                    this.colors[colorIndex]
                );
            }
        }, ticks / 3);
        setTimeout(() => {
            for (i = 0; i < leftMax; i++) {
                this.stage[leftIndex + i]["node"].setBackgroundColor("white");
            }
            // load right arr with last half of nodes,x
            for (j = 0; j < rightMax; j++) {
                this.stage[midIndex + 1 + j]["node"].setBackgroundColor(
                    "white"
                );
            }
        }, (ticks * 2) / 3);
    }

    #mergeSort(l, r, colorIndex, ticks) {
        if (l < r) {
            var m = l + parseInt((r - l) / 2);
            this.#mergeSort(l, m, Math.floor(colorIndex / 2), ticks / 2);
            this.#mergeSort(m + 1, r, (Math.floor(this.colors.length / 2) + colorIndex), ticks / 2);
            setTimeout(() => {
                this.#merge(l, m, r, (colorIndex + 1) % this.colors.length, ticks / 2);
            }, ticks / 2);
        }
       
    }
}
