class MyNode {
   constructor(value) {
      console.log("Hello World! I am node!");
      this.element;
      this.#createElement(value);
   }

   #createElement(value) {
      this.element = document.createElement("LABEL");
      this.element.classList.add("MyNode");
      this.element.value = value;
      this.element.innerHTML = value;
      document.body.appendChild(this.element);
   }

   removeFromDocument() {
      this.element.remove();
   }
}
