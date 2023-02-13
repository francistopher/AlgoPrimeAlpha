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
            this.#mergeSort(0, this.stage.length - 1, this.stage.length * 2000);
            console.log(this.stage);
            setTimeout(()=> {
              this.shuffleButton.style.display = "inline";
            }, (this.stage.length - 1) * 2000);
        });
    }

    #merge(leftIndex, midIndex, rightIndex, ticks) {
        var leftMax = midIndex - leftIndex + 1;
        var rightMax = rightIndex - midIndex;
        var leftArr = new Array(leftMax);
        var rightArr = new Array(rightMax);
        // load left arr with first half of nodes,x
        for (var i = 0; i < leftMax; i++) {
            leftArr[i] = this.stage[leftIndex + i]["node"];
            this.stage[leftIndex + i]["node"].setBackgroundColor("yellow");
        }
        // load right arr with last half of nodes,x
        for (var j = 0; j < rightMax; j++) {
            rightArr[j] = this.stage[midIndex + 1 + j]["node"];
            this.stage[midIndex + 1 + j]["node"].setBackgroundColor("orange");
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
                this.stage[leftIndex + i]["node"].setBackgroundColor("yellow");
            }
            // load right arr with last half of nodes,x
            for (j = 0; j < rightMax; j++) {
                this.stage[midIndex + 1 + j]["node"].setBackgroundColor(
                    "orange"
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

    #mergeSort(l, r, ticks) {
        if (l < r) {
            var m = l + parseInt((r - l) / 2);
            this.#mergeSort(l, m, ticks / 2);
            this.#mergeSort(m + 1, r, ticks / 2);

            setTimeout(() => {
                this.#merge(l, m, r, ticks / 2);
            }, ticks / 2);
        }
       
    }
}
