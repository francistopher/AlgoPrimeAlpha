/*
 *	Class that implements the quick
 * 	sort algorithm to sort the nodes
 */

class Quick extends NodeMaster {
    constructor() {
        super();
        this.sortButton.addEventListener("click", () => {
            this.sortButton.style.display = "none";
            console.log(this.stage);
            this.#sort(0, this.stage.length - 1, this.stage.length * 1000);
            console.log(this.stage);
        });
    }

    #swap(i, j) {
        let temp = this.stage[j]["node"];
        this.stage[j]["node"] = this.stage[i]["node"];
        this.stage[j]["node"].setPosition(this.stage[j]["x"], "vw", "", "");
        this.stage[i]["node"] = temp;
        this.stage[i]["node"].setPosition(this.stage[i]["x"], "vw", "", "");
    }

    #partition(leftIndex, rightIndex) {
        // node at the rightmost index is the pivot
        let pivot = this.stage[rightIndex]["node"];
        let i = leftIndex - 1;
        for (let j = leftIndex; j <= rightIndex - 1; j++) {
            if (this.stage[j]["node"].value < pivot.value) {
                i++;
                this.#swap(i, j);
            }
        }
        this.#swap(i + 1, rightIndex);
        return i + 1;
    }

    #sort(leftIndex, rightIndex, ticks) {
        if (leftIndex < rightIndex) {
            let parti = this.#partition(leftIndex, rightIndex);
            this.#sort(leftIndex, parti - 1, ticks);
            this.#sort(parti + 1, rightIndex, ticks);
        }
    }
}
