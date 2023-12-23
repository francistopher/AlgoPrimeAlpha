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
      console.log(typeof x, typeof y);
      this.element.style.position = "absolute";
      if (typeof x === Number) {
         this.element.style.left = x + "vw";
         console.log(x);
         // console.log(x.substring(0, -2));
      } else {
         this.element.style.left = x;
      }
      if (typeof y === Number) {
         this.element.style.top = y + "vh";
         // console.log(y.substring(0, -2));
      } else {
         this.element.style.top = y;
      }
   }
}
