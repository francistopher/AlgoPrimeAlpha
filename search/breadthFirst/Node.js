class Node {
   constructor() {
      this.element = None;
      this.#createElement();
   }

   #createElement() {
      this.element = document.createElement("LABEL");
      this.element.id = "node";
   }
}
