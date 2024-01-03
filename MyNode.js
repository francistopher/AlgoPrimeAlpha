class MyNode {
   constructor(value) {
      console.log("Hello World! I am node!");
      this.element;
      this.x;
      this.y;
      this.#createElement(value);
   }

   getElement() {
      return this.element;
   }

   #createElement(value) {
      this.element = document.createElement("button");
      this.element.classList.add("MyNode");
      this.element.value = value;
      this.element.innerHTML = value;
      document.body.appendChild(this.element);
   }

   removeFromDocument() {
      this.element.remove();
   }

   reposition(x, y) {
      if (typeof x === "number") {
         this.element.style.left = x + "vh";
         this.x = x;
      } else {
         this.element.style.left = x;
         this.x = parseInt(x.substring(0, x.length - 2), 10);
      }
      if (typeof y === "number") {
         this.element.style.top = y + "vh";
         this.y = y;
      } else {
         this.element.style.top = y;
         this.y = parseInt(y.substring(0, y.length - 2), 10);
      }
   }
}
