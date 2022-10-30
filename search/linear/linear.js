/*
 * Class that sorts the node elements
 * via the bubble algorithm
 */
class Linear extends NodeMaster {
	constructor() {
		super();
		console.log("LINEAR");
        this.sortButton.innerHTML = "SEARCH";
	this.sortButton.addEventListener("click", ()=> {
			this.sortButton.style.display = "none";
			this.#search(0, 0, "", 0);
		});
	}

// outer loop
#search(i, j, temp, ticks) {
    console.log("to be continued");
}

}
