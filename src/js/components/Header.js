export class Header {
  constructor(menu) {
    this.menu = menu;
  }

  openMenu() {
    this.menu.style.display = 'flex';
  }

  closeMenu() {
    this.menu.style.display = 'none';
  }
}
