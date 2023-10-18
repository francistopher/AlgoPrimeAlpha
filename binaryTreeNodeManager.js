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
      // pre post in order
      this.searchTypeMenu = NaN;
      this.searchTypes = ["Value-Comparison", "Pre-Order", "In-Order", "Post-Order"];
      this.#createSearchTypeMenu();
      this.#setSearchButton();
   }

   #createSearchTypeMenu() {
      // create the dropdown menu
      this.searchTypeMenu = document.createElement("SELECT");
      document.body.appendChild(this.searchTypeMenu);
      this.searchTypeMenu.style.height = "1vw";
      this.searchTypeMenu.style.width = "10vw";
      //console.log(this.searchTypes.length);
      for (var i = 0; i < this.searchTypes.length; i++) {
         var anOption = document.createElement("OPTION");
         anOption.text = this.searchTypes[i];
         anOption.value = this.searchTypes[i];
         this.searchTypeMenu.appendChild(anOption);
      }
      this.searchTypeMenu.style.display = "block";
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
      this.searchButton = document.createElement("BUTTON");
      this.searchButton.innerHTML = "SEARCH";
      var theMenu = this.searchTypeMenu;
      this.searchButton.addEventListener("click", () => {
         console.log(theMenu.value);
         this.nodeCountSlider.disabled = true;
         this.searchField.disabled = true;
         this.searchButton.disabled = true;
         this.#unColorAllNodes(this.root);
         if (theMenu.value == this.searchTypes[0]) {
            this.#startSearch(this.root);
         }
      });
      this.searchButton.style.display = "inline";
      document.body.appendChild(this.searchButton);
   }

   #unColorAllNodes(node) {
      if (node && node.label.style.borderColor != "black" && node.label.style.borderColor != "") {
         if (node.parentBranch) {
            node.parentBranch.style.backgroundColor = "black";
         }
         node.label.style.borderColor = "black";
         if (node.leftChild) {
            this.#unColorAllNodes(node.leftChild);
         }
         if (node.rightChild) {
            this.#unColorAllNodes(node.rightChild);
         }
      }
   }

   #startSearch(node) {
      // the node exists
      if (node) {
         // set yellow for comparing
         node.label.style.borderColor = "yellow";
         setTimeout(() => {
            if (node.value == this.searchField.value) {
               node.label.style.borderColor = "green";
               this.#enableSearchConfigurations();
            } else {
               node.label.style.borderColor = "red";
               if (node.value > this.searchField.value) {
                  if (node.leftChild) {
                     node.leftChild.parentBranch.style.backgroundColor = "green";
                     this.#startSearch(node.leftChild);
                  } else {
                     this.#enableSearchConfigurations();
                  }
               } else if (node.value < this.searchField.value) {
                  if (node.rightChild) {
                     node.rightChild.parentBranch.style.backgroundColor = "green";
                     this.#startSearch(node.rightChild);
                  } else {
                     this.#enableSearchConfigurations();
                  }
               }
            }
         }, 1000);
      }
   }

   #enableSearchConfigurations() {
      this.nodeCountSlider.disabled = false;
      this.searchField.disabled = false;
      this.searchButton.disabled = false;
   }
}
