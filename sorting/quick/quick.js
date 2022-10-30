/*
 *	Class that implements the merge 
 * 	sort algorithm to sort the nodes
 */

class Quick extends NodeMaster {
	
	constructor() {
		super()
		this.sortButton.addEventListener("click", () => {
			this.sortButton.style.display = "none"
			this.#sort(0, this.stage.length - 1)
		})
	}

	// outer loop
	#sort(leftIndex, rightIndex) {
		if (leftIndex >= rightIndex) {
			return;
		}
		var middleIndex = parseInt((rightIndex - 1) / 2)
		console.log("let's quick sort!")
		// ucf library is going to close in 15 minutes
	}

    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function partition(arr, low, high) {
        let pivot = arr[high];

        let i = (low - 1);

        for (let j = low; j <= high - 1; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return (i + 1);
    }


}
