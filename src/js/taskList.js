/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
import itemFactory from './itemFactory';
import taskFactory from './taskFactory';

export default class TaskList {
  constructor(str1, str2, arr) {
    if (typeof (str) === 'string') {
      this.element = document.querySelector(str1);
    } else {
      this.element = str1;
    }
    this.type = str2;
    this.tasks = arr.filter((el) => {
      if (el.type === this.type) return el;
    });
    this.btn = this.element.querySelector('.add-btn');
    this.form = this.element.querySelector('.add-form');
    this.taskContainer = this.element.querySelector('.task-list-container');

    this.onBtnClick = this.onBtnClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showBtn = this.showBtn.bind(this);
    this.taskRemove = this.taskRemove.bind(this);

    this.btn.addEventListener('click', this.onBtnClick);
    this.form.addEventListener('submit', this.onSubmit);
    this.taskContainer.addEventListener('click', this.taskRemove);
  }

  onBtnClick() {
    this.btn.classList.toggle('invalid');
    this.form.classList.toggle('invalid');
  }

  onSubmit(e) {
    e.preventDefault();
    const input = this.form.querySelector('.input-text');
    if (input.value.length === 0) {
      return false;
    }
    this.form.classList.toggle('invalid');
    this.btn.classList.toggle('invalid');
    const arr = JSON.parse(localStorage.getItem('data'));
    arr.push(itemFactory(this.type, input.value));
    this.tasks = arr;
    localStorage.setItem('data', JSON.stringify(arr));
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

  taskRemove(e) {
    if (e.target.classList.contains('list-item-btn')) {
      const text = e.target.closest('.list-item-container').querySelector('.item-text');
      const task = this.tasks.find((el) => {
        if (el.text === text.textContent) return el;
      });
      this.tasks.splice(this.tasks.indexOf(task), 1);
      this.render();
    }
  }
}
