export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // Array de datos para renderizar
    this._renderer = renderer; // Función para renderizar cada elemento
    this._container = document.querySelector(containerSelector); // Selector del contenedor
  }

  // Método para renderizar todos los elementos
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Llamada a la función renderer para cada item
    });
  }

  // Método para agregar un nuevo elemento al contenedor
  addItem(element) {
    this._container.prepend(element); // Añade el elemento al inicio del contenedor
  }
}
