/*
 *	Class that implements the merge 
 * 	sort algorithm to sort the nodes
 */

class Merge extends NodeMaster {
	
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
		console.log("let's merge sort!")
		// i feel sleepy, have recovered, back in town
	}



}
