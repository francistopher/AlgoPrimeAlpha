/*
   Manages the node elements of tree like structure
*/
class BinaryTreeNodeManager {
   constructor(maxChildren) {
      // variables about the tree itself
      this.values = [];
      this.root = NaN;
      this.nodeCount = 1;
      this.maxChildren = maxChildren;
      // components users can see
      this.sortButton;
      this.nodeCountSlider;
      this.searchField;
      // create components user can see
      this.#setNodeCountSlider();
      this.#setSearchField();
      this.#setSearchButton();
   }

   // returns the root of the tree
   getRoot() {
      return this.root;
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

   #setSearchField() {
      this.searchField = document.createElement("input");
      this.searchField.style.borderStyle = "solid";
      this.searchField.style.borderBlockColor = "black";
      this.searchField.placeholder = "Enter value here!";
      this.searchField.style.display = "inline";
      document.body.appendChild(this.searchField);
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
         if (this.getSearchFieldValue()) {
            this.nodeCountSlider.disabled = true;
            this.searchField.disabled = true;
            this.searchButton.disabled = true;
            this.#startSearch(this.root);
         }
      });
      this.searchButton.style.display = "inline";
      document.body.appendChild(this.searchButton);
   }

   #startSearch(node) {
      // the node exists
      if (node) {
         // set yellow for comparing
         node.label.style.borderColor = "yellow";
         setTimeout(() => {
            if (node.value == this.searchField.value) {
               node.label.style.borderColor = "green";
               this.nodeCountSlider.disabled = false;
               this.searchField.disabled = false;
               this.searchButton.disabled = false;
            } else {
               node.label.style.borderColor = "red";
               if (node.value > this.searchField.value) {
                  node.leftChild.parentBranch.style.backgroundColor = "green";
                  this.#startSearch(node.leftChild);
               } else if (node.value < this.searchField.value) {
                  node.rightChild.parentBranch.style.backgroundColor = "green";
                  this.#startSearch(node.rightChild);
               }
            }
         }, 1000);
      }
   }
}
