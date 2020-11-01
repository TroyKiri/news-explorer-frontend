export class BaseComponent {
  _findElement(container, element) {
    return container.querySelector(element);
  }
}
