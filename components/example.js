class example extends HTMLElement {
    constructor() {
      super();
    }
  
    // NOTE The commented code is for when the component is no dynamic

    // static get observedAttributes(){
    //     return[]
    // }
  
    // attributeChangedCallback(attr, oldVal, newVal){
    //     const attributes = cardSide.observedAttributes;
    //     if (attributes.includes(attr)){
    //         this[attr] = newVal;
    //     }
    // }
  
    setComponent() {
      const template = document.createElement("template");
      //  NOTE Here goes HTML
      template.innerHTML = `
        <p class="hello-world">Hello World!</p>
      `;
      return template;
    }
  
    render() {
      this.appendChild(this.setComponent().content.cloneNode(true));
    }
    connectedCallback() {
      this.render();
    }
  }
  
  //   NOTE Define components name always with - and lowercase (this name will be how we should call the element in HTML), after the comma is the name of the class
  customElements.define("example-comp", example);
  