class BreadthFirstSearch extends Graph {
   constructor() {
      super();
      console.log("Hello, World! I am Breadth First Search!");
      // create html elements
      this.searchLabel;
      this.searchField;
      this.searchInstructions;
      this.#createSearchLabel();
      this.#createTextField();
      this.#createSearchInstructions();

      this.numberToSearch;
      this.qualifiedNodes;
      this.#rememberNumberToSearch();
   }

   #createSearchInstructions() {
      this.searchInstructions = document.createElement("label");
      this.searchInstructions.style.display = "block";
      this.searchInstructions.style.height = "4vh";
      this.searchInstructions.style.width = "45vh";
      this.searchInstructions.style.fontSize = "2vh";
      this.searchInstructions.innerHTML = "Enter number above and click on node to search from!";
      document.body.appendChild(this.searchInstructions);
   }

   #createSearchLabel() {
      this.searchLabel = document.createElement("label");
      this.searchLabel.style.display = "block-line";
      this.searchLabel.style.height = "4vh";
      this.searchLabel.style.width = "20vh";
      this.searchLabel.style.fontSize = "2vh";
      this.searchLabel.innerHTML = "Number to Search:";
      document.body.appendChild(this.searchLabel);
   }

   #createTextField() {
      this.searchField = document.createElement("input");
      this.searchField.type = "text";
      this.searchField.style.display = "block-line";
      this.searchField.style.height = "2vh";
      this.searchField.style.width = "3vh";
      this.searchField.style.fontSize = "2vh";
      document.body.appendChild(this.searchField);
   }

   #rememberNumberToSearch() {
      // get number to search from
      this.searchField.addEventListener("input", () => {
         this.numberToSearch = this.searchField.value;
      });
   }
}
