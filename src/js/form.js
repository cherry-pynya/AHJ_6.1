export default class Form {
  constructor(str) {
    if (typeof (str) === 'string') {
      this.element = document.querySelector(str);
    } else {
      this.element = str;
    }

    this.onSubmit = this.onSubmit.bind(this);

    this.element.addEventListener('submit', this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();
    const value = this.element.querySelector('.text-area');
    this.element.remove();
    return new Promise((resolve, reject) => value);
  }
}
