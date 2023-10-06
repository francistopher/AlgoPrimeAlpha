/*
   Manages the node elements of tree like structure
*/
class TreeNodeManager {
   constructor(maxChildren) {
      // variables about the tree itself
      this.values = [];
      this.head;
      this.nodeCount = 1;
      this.maxChildren = maxChildren;
      // components users can see
      this.shuffleButton;
      this.sortButton;
      this.nodeCountSlider;
      this.searchField;
      // create components user can see
      this.#setShuffleButton();
      this.#setBalanceButton();
      this.#setNodeCountSlider();
      this.#setSearchField();
      this.#setSearchButton();
   }

   /**
    * Creates and returns the button that shuffles the nodes of the tree
    */
   #setShuffleButton() {
      this.shuffleButton = document.createElement("BUTTON");
      this.shuffleButton.innerHTML = "SHUFFLE";
      document.body.appendChild(this.shuffleButton);
      this.shuffleButton.style.display = "inline";
      this.shuffleButton.addEventListener("click", () => {
         console.log("SHUFFLE SHUFFLE");
      });
   }

   hideShuffleButton() {
      this.shuffleButton.style.display = "none";
   }

   showShuffleButton() {
      this.shuffleButton.style.display = "inline";
   }

   /**
    * Returns the button which is responsible for sorting the elements in the tree
    */
   #setBalanceButton() {
      this.sortButton = document.createElement("BUTTON");
      this.sortButton.innerHTML = "BALANCE";
      document.body.appendChild(this.sortButton);
      this.sortButton.style.display = "inline";
      this.sortButton.addEventListener("click", () => {
         console.log("BALANCE BALANCE");
      });
   }

   hideBalanceButton() {
      this.sortButton.style.display = "none";
   }

   showBalanceButton() {
      this.sortButton.style.display = "inline";
   }

   /**
    * Returns a slider responsible for updating the number of nodes in the tree
    */
   #setNodeCountSlider() {
      this.nodeCountSlider = document.createElement("input");
      this.nodeCountSlider.type = "range";
      this.nodeCountSlider.value = 0;
      this.nodeCountSlider.min = "0";
      this.nodeCountSlider.max = "20";
      this.nodeCountSlider.style.accentColor = "black";
      document.body.appendChild(this.nodeCountSlider);
      this.nodeCountSlider.style.display = "inline";
   }

   #hideNodeCountSlider() {
      this.nodeCountSlider.style.display = "none";
   }

   #showNodeCountSlider() {
      this.nodeCountSlider.style.display = "inline";
   }

   #setSearchField() {
      this.searchField = document.createElement("input");
      this.searchField.style.borderStyle = "solid";
      this.searchField.style.borderBlockColor = "black";
      this.searchField.placeholder = "Enter value here!";
      this.searchField.style.display = "inline";
      document.body.appendChild(this.searchField);
   }

   #hideSearchField() {
      this.searchField.style.display = "none";
   }

   #showSearchField() {
      this.searchField.style.display = "inline";
   }

   getSearchValue() {
      return this.searchField.value;
   }

   getSearchFieldValue() {
      return this.searchField.value;
   }

   checkForValue() {
      const isSearchFieldClear = this.searchField.value.length == 0;
      if (isSearchFieldClear) {
         this.searchField.placeholder = "ENTER VALUE HERE!";
      }
      return isSearchFieldClear;
   }

   #setSearchButton() {
      console.log("searchhhhhh");
      this.searchButton = document.createElement("BUTTON");
      this.searchButton.innerHTML = "SEARCH";
      this.searchButton.addEventListener("click", () => {
         console.log("SEARCH SEARCH");
      });
      this.searchButton.style.display = "inline";
      document.body.appendChild(this.searchButton);
   }

   hideSearchButton() {
      this.searchButton.style.display = "none";
   }

   showSearchButton() {
      this.searchButton.style.display = "inline";
   }
}

const Tree = {
   BINARY: 0,
   AVL: 1,
};
