/* eslint-disable class-methods-use-this */
import TaskList from './taskList';
import itemFactory from './itemFactory';

export default class TaskManager {
  constructor(str) {
    if (typeof (str) === 'string') {
      this.element = document.querySelector(str);
    } else {
      this.element = str;
    }
    this.lists = Array.from(document.querySelectorAll('.task-list'));
    this.startDrag = this.startDrag.bind(this);
    this.finishDrag = this.finishDrag.bind(this);
    this.drag = this.drag.bind(this);
  }

  init() {
    if (JSON.parse(localStorage.getItem('data')) !== null) {
      this.data = JSON.parse(localStorage.getItem('data'));
    } else {
      this.data = [];
      localStorage.setItem('data', JSON.stringify(this.data));
    }
    this.lists.forEach((el) => {
      const list = new TaskList(el, el.dataset.id, this.data);
      this.addDraged();
      list.render();
    });
  }

  addDraged() {
    this.lists.forEach((el) => {
      el.addEventListener('mousedown', this.startDrag);
    });
  }

  startDrag(e) {
    if (e.target.closest('.list-item') && !e.target.classList.contains('list-item-btn')) {
      e.preventDefault();
      const { target } = e;
      this.currentDragedElement = target.closest('.list-item');
      this.currentDragedElement.classList.add('dragged');
      document.addEventListener('mouseup', this.finishDrag);
      document.addEventListener('mousemove', this.drag);
      this.drag(e);
    }
  }

  finishDrag(e) {
    this.currentDragedElement.style.pointerEvents = 'none';
    const { clientX, clientY } = e;
    const target = this.checkBounds(clientX, clientY);
    if (target.closest('.task-list-container') !== null) {
      target.closest('.task-list-container').querySelector('.list').insertAdjacentElement('afterbegin', this.currentDragedElement);
      this.currentDragedElement.dataset.id = target.closest('.task-list').dataset.id;
      this.changDdata();
    }
    this.currentDragedElement.classList.remove('dragged');
    this.currentDragedElement.style.position = '';
    this.currentDragedElement.style.cursor = 'default';
    this.currentDragedElement.style.pointerEvents = 'auto';
    this.currentDragedElement = undefined;
    document.removeEventListener('mouseup', this.finishDrag);
    document.removeEventListener('mousemove', this.drag);
    this.changDdata();
  }

  drag(e) {
    this.currentDragedElement.style.cursor = 'grabbing';
    this.currentDragedElement.style.position = 'absolute';
    const { clientX, clientY } = e;
    const shiftX = clientX - this.currentDragedElement.offsetWidth / 2;
    const shiftY = clientY - this.currentDragedElement.offsetHeight / 2;
    this.currentDragedElement.style.top = `${shiftY}px`;
    this.currentDragedElement.style.left = `${shiftX}px`;
  }

  checkBounds(x, y) {
    const el = document.elementFromPoint(x, y);
    return el;
  }

  changDdata() {
    const arr = [];
    this.lists.forEach((el) => {
      Array.from(el.querySelectorAll('.list-item')).forEach((item) => {
        const str1 = item.dataset.id;
        const str2 = item.querySelector('.item-text').textContent;
        const task = itemFactory(str1, str2);
        arr.push(task);
      });
    });
    localStorage.setItem('data', JSON.stringify(arr));
  }
}
