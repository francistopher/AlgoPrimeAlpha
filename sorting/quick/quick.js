/*
 *	Class that implements the quick
 * 	sort algorithm to sort the nodes
 */

class Quick extends NodeMaster {

    #showShuffleIfSorted()
    {
        setTimeout(()=> {
            var isSorted = true;
            for (var i = 0, prev = -1; i < this.stage.length; i++)
            {
                if (prev < this.stage[i]["node"].value)
                {
                    prev = this.stage[i]["node"].value;
                }
                else
                {
                    isSorted = false;
                    break;
                }
            }
            if (isSorted)
            {
                this.shuffleButton.style.display = "inline"; 
            }
            else
            {
                this.#showShuffleIfSorted();
            }
        }, 2000);
    }

    constructor() {
        super();
        this.sortButton.addEventListener("click", () => {
            this.sortButton.style.display = "none";
            console.log(this.stage);
            this.#sort(0, this.stage.length - 1, this.stage.length * 1000);
            console.log(this.stage);
            this.#showShuffleIfSorted();
        });
    }

    #swap(i, j) {
        let temp = this.stage[j]["node"];
        this.stage[j]["node"] = this.stage[i]["node"];
        this.stage[j]["node"].setPosition(this.stage[j]["x"], "vw", "", "");
        this.stage[i]["node"] = temp;
        this.stage[i]["node"].setPosition(this.stage[i]["x"], "vw", "", "");
    }

    #partition(leftIndex, rightIndex, ticks) {
        // node at the rightmost index is the pivot
        let pivot = this.stage[rightIndex]["node"];
        let i = leftIndex - 1;
        for (let j = leftIndex; j <= rightIndex - 1; j++) {
            if (this.stage[j]["node"].value < pivot.value) {
                i++;
                this.#swap(i, j);
            }
        }
        for (let j = leftIndex; j <= rightIndex - 1; j++)
        {
            this.stage[j]["node"].setBackgroundColor('orange');
        }
        pivot.setBackgroundColor('yellow')
        setTimeout(()=> {
            for (var j = leftIndex; j < rightIndex; j++)
            {   
                this.stage[j]["node"].setBackgroundColor('white');
            }
            pivot.setBackgroundColor('white');
            this.#swap(i + 1, rightIndex);
        }, ticks);
        return i + 1;
    }


    #sort(leftIndex, rightIndex, ticks) {
        if (leftIndex < rightIndex) {
            let parti = this.#partition(leftIndex, rightIndex, ticks/1.5);
            setTimeout(()=> {
                this.#sort(leftIndex, parti - 1, ticks / 1.5);
                this.#sort(parti + 1, rightIndex, ticks / 1.5);
            }, ticks / 1.5);
        }

    }
}
