/*
 *	Class that implements the quick
 * 	sort algorithm to sort the nodes
 */

class Quick extends NodeMaster {
    constructor() {
        super();
        this.sortButton.addEventListener("click", ()=> {
            this.sortButton.style.display = "none";
            console.log(this.stage);
            this.#sort(0, this.stage.length - 1);
            console.log(this.stage);
        });
    }

    #swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    #partition(arr, leftIndex, rightIndex) {
        // node at the rightmost index is the pivot
        let pivot = this.stage[rightIndex]["node"];
        let i = leftIndex - 1;
        for (let j = leftIndex; j <= rightIndex - 1; j++) {
            if (this.stage[j]["node"].value < pivot.value) {
                i++;
                this.#swap(this.stage, i, j);
            }
        }
        this.#swap(arr, i + 1, rightIndex);
        return i + 1;
    }

    #sort(arr, leftIndex, rightIndex) {
        if (leftIndex < rightIndex) {
            let parti = this.#partition(arr, leftIndex, rightIndex);
            this.#sort(arr, leftIndex, parti - 1);
            this.#sort(arr, parti + 1, rightIndex);
        }
    }
}
