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
            this.#binarySearch(0, this.stage.length);
         }
      });
   }

   #binarySearch(startIndex, endIndex) {
      //console.log(startIndex, endIndex);
      if (endIndex > startIndex) {
         const mid = Math.floor(startIndex + (endIndex - startIndex) / 2);
         //console.log(mid);
         const midElement = this.stage[mid]["node"];
         //console.log(midElement);
         midElement.label.style.borderColor = "yellow";
         setTimeout(() => {
            midElement.label.style.borderColor = "black";
            if (midElement.value + 1 == this.getSearchFieldValue()) {
               midElement.label.style.borderColor = "green";
               return mid;
            } else {
               if (midElement.value + 1 < this.getSearchFieldValue()) {
                  for (var i = startIndex; i < mid + 1; i++) {
                     const ignoredElement = this.stage[i]["node"];
                     ignoredElement.label.style.borderColor = "red";
                  }
                  return this.#binarySearch(mid + 1, endIndex);
               } else {
                  for (var i = mid; i < endIndex; i++) {
                     const ignoredElement = this.stage[i]["node"];
                     ignoredElement.label.style.borderColor = "red";
                  }
                  return this.#binarySearch(startIndex, mid);
               }
            }
         }, 1000);
      }
      return -1;
   }
}
