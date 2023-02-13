/*
 *	Class that implements the quick
 * 	sort algorithm to sort the nodes
 */

class Quick extends NodeMaster {
    constructor() {
        super();
        this.sortButton.style.display = "none";
        var nums = [76, 2, 6, 7, 4, 9, 10, 11, 13, 91];

        console.log(nums);
        this.#sort(nums, 0, nums.length - 1);
        console.log(nums);
    }

    #swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    #partition(arr, leftIndex, rightIndex) {
        let pivot = arr[rightIndex];
        let i = leftIndex - 1;
        for (let j = leftIndex; j <= rightIndex - 1; j++) {
            if (arr[j] < pivot) {
                i++;
                this.#swap(arr, i, j);
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
