class MyNode {
   constructor(value) {
      console.log("Hello World! I am node!");
      this.element;
      this.x;
      this.y;
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

   reposition(x, y) {
      this.element.style.position = "absolute";
      if (typeof x === Number) {
         this.element.style.left = x + "vw";
         this.x = x;
      } else {
         this.element.style.left = x;
         this.x = parseInt(x.substring(0, x.length - 2), 10);
      }
      if (typeof y === Number) {
         this.element.style.top = y + "vh";
         this.y = y;
      } else {
         this.element.style.top = y;
         this.y = parseInt(y.substring(0, y.length - 2), 10);
      }
   }
}
