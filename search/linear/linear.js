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
         if (!this.checkForValue()) {
            this.sortButton.style.display = "none";
            this.shuffleButton.style.display = "none";
            this.nodeCountSlider.style.display = "none";
            this.#search(0, this.nodeCount);
         }
      });
   }

   #checkElement(index) {
      const currentElement = this.stage[index];
      const elementFound = currentElement["node"].value + 1 == this.getSearchFieldValue();
      if (elementFound) {
         currentElement["node"].label.style.borderColor = "yellowgreen";
         console.log("found");
      } else {
         currentElement["node"].label.style.borderColor = "red";
      }
      return elementFound;
   }

   // outer loop
   #search(index, count) {
      if (index < count) {
         if (this.#checkElement(index)) {
            return;
         }
         this.#search(index + 1, count);
      } else {
         // nothing found
      }
   }
}
