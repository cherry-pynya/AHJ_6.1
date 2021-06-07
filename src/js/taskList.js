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
    this.cross = this.element.querySelector('.form-close');

    this.onBtnClick = this.onBtnClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showBtn = this.showBtn.bind(this);
    this.taskRemove = this.taskRemove.bind(this);
    this.close = this.close.bind(this);

    this.btn.addEventListener('click', this.onBtnClick);
    this.form.addEventListener('submit', this.onSubmit);
    this.taskContainer.addEventListener('click', this.taskRemove);
    this.cross.addEventListener('click', this.close);
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
    localStorage.setItem('data', JSON.stringify(arr));
    input.value = '';
    this.render();
  }

  render() {
    [...this.element.querySelectorAll('.list-item')].forEach((el) => {
      el.remove();
    });
    const arr = JSON.parse(localStorage.getItem('data')).filter((el) => {
      if (el.type === this.type) return el;
    });
    arr.forEach((el) => {
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
      const arr = JSON.parse(localStorage.getItem('data'));
      const text = e.target.closest('.list-item-container').querySelector('.item-text');
      const task = arr.find((el) => {
        if (el.text === text.textContent) return el;
      });
      arr.splice(arr.indexOf(task), 1);
      localStorage.setItem('data', JSON.stringify(arr));
      this.render();
    }
  }

  close() {
    this.btn.classList.toggle('invalid');
    this.form.classList.toggle('invalid');
  }
}
