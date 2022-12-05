/*
 *	Class that implements the merge 
 * 	sort algorithm to sort the nodes
 */

class Merge extends NodeMaster {

    constructor() {
        super()
        this.sortButton.addEventListener("click", () => {
            this.sortButton.style.display = "none"
            console.log(this.stage);
            this.#mergeSort(0, this.stage.length - 1, this.stage.length)
            //console.log(this.stage);
        })
    }

    // outer loop
    #sort(leftIndex, rightIndex) {
        if (leftIndex < rightIndex) {
            return;
        }
        var middleIndex = parseInt((rightIndex - 1) / 2)
        console.log("let's merge sort!")
        // i feel sleepy, have recovered, back in town
    }

    #merge(leftIndex, midIndex, rightIndex) {

        var leftMax = midIndex - leftIndex + 1;
        var rightMax = rightIndex - midIndex;
        var leftArr = new Array(leftMax);
        var rightArr = new Array(rightMax);
        for (var i = 0; i < leftMax; i++)
            leftArr[i] = this.stage[leftIndex + i];
        for (var j = 0; j < rightMax; j++)
            rightArr[j] = this.stage[midIndex + 1 + j];
        var i = 0, j = 0, k = leftIndex;
        while (i < leftMax && j < rightMax) {
            if (leftArr[i]["node"].value <= rightArr[j]["node"].value) {
                this.stage[k++] = leftArr[i++];
            }
            else {
                this.stage[k++]= rightArr[j++];
            }
        }
        while (i < leftMax)
            this.stage[k++] = leftArr[i++];
        while (j < rightMax)
            this.stage[k++] = rightArr[j++];
    }

    #mergeSort(l, r, ticks) {
        if(l < r){
            var m =l+ parseInt((r-l)/2);
            this.#mergeSort(l,m, ticks / 2);
            this.#mergeSort(m+1,r, ticks / 2);
            this.#merge(l,m,r, ticks);
        }
    }



}
