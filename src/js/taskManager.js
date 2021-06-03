import TaskList from './taskList';

export default class TaskManager {
  constructor(str) {
    if (typeof (str) === 'string') {
      this.element = document.querySelector(str);
    } else {
      this.element = str;
    }

    this.lists = this.element.querySelectorAll('.task-list');
  }

  activateLists() {
    [...this.lists].forEach((el) => {
      const list = new TaskList(el);
    });
  }
}
