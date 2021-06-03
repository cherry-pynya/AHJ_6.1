/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
import itemFactory from './itemFactory';
import taskFactory from './taskFactory';

export default class TaskList {
  constructor(str1, str2, arr = []) {
    if (typeof (str) === 'string') {
      this.element = document.querySelector(str1);
    } else {
      this.element = str1;
    }
    this.btn = this.element.querySelector('.add-btn');
    this.form = this.element.querySelector('.add-form');
    this.tasks = arr;
    this.type = str2;

    this.onBtnClick = this.onBtnClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showBtn = this.showBtn.bind(this);

    this.btn.addEventListener('click', this.onBtnClick);
    this.form.addEventListener('submit', this.onSubmit);
  }

  onBtnClick() {
    this.btn.classList.toggle('invalid');
    this.form.classList.toggle('invalid');
  }

  onSubmit(e) {
    e.preventDefault();
    this.form.classList.toggle('invalid');
    this.btn.classList.toggle('invalid');
    const input = this.form.querySelector('.input-text');
    this.tasks.push(itemFactory(this.type, input.value));
    input.value = '';
    this.render();
  }

  render() {
    [...this.element.querySelectorAll('.list-item')].forEach((el) => {
      el.remove();
    });
    this.tasks.forEach((el) => {
      const item = taskFactory(el);
      item.addEventListener('mouseenter', this.showBtn);
      item.addEventListener('mouseleave', this.showBtn);
      this.element.querySelector('.list').insertAdjacentElement('afterbegin', item);
    });
  }

  showBtn(e) {
    if (e.target.classList.contains('list-item')) {
      e.target.querySelector('.list-item-btn').classList.toggle('invalid');
    }
  }

  removeTask(str) {
    const item = this.tasks.find((el) => {
      if (el.text === str) return el;
    });
    this.tasks.splice(this.tasks.indexOf(item), 1);
    this.render();
  }
}
