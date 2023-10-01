class Binary extends NodeMaster {
   constructor() {
      super();
      // has to be ordered for binary search to work
      this.shuffleButton.style.display = "none";
      this.sortButton.innerHTML = "Search";
      this.sortButton.style.display = "block";
      this.createSearchField();
      this.sortButton.addEventListener("click", () => {
         if (!this.checkForValue()) {
            console.log("index", this.#binarySearch(0, this.stage.length));
         }
      });
   }

   #binarySearch(startIndex, endIndex) {
      console.log(startIndex, endIndex);
      if (endIndex > startIndex) {
         const mid = Math.floor(startIndex + (endIndex - startIndex) / 2);
         //console.log(mid);
         const midElement = this.stage[mid]["node"];
         //console.log(midElement);
         if (midElement.value + 1 == this.getSearchFieldValue()) {
            return mid;
         }
         if (midElement.value + 1 < this.getSearchFieldValue()) {
            return this.#binarySearch(mid + 1, endIndex);
         } else {
            return this.#binarySearch(startIndex, mid);
         }
      }
      return -1;
   }
}
