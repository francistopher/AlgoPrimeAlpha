class Node {
   constructor(value) {
      console.log("Hello World! I am node!");
      this.element;
      this.#createElement(value);
   }

   #createElement(value) {
      this.element = document.createElement("LABEL");
      this.element.id = "node";
      this.element.value = value;
   }
}
