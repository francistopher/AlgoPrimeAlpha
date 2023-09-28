/*
 * Class that sorts the node elements
 * via the bubble algorithm
 */
class Linear extends NodeMaster {
   constructor() {
      super();
      this.sortButton.innerHTML = "SEARCH";
      this.createSearchField();
      this.sortButton.style.display = "block";
      this.sortButton.addEventListener("click", () => {
         this.sortButton.style.display = "none";
         this.#search(0, 0, "", 0);
      });
   }

   // outer loop
   #search(i, j, temp, ticks) {
      console.log("to be continued");
   }
}
