import TaskList from './taskList';

export default class TaskManager {
  constructor(str) {
    if (typeof (str) === 'string') {
      this.element = document.querySelector(str);
    } else {
      this.element = str;
    }
    this.toDo = new TaskList(this.element.querySelector('.todo-list'));
    this.inProgress = new TaskList(this.element.querySelector('.progress-list'));
    this.done = new TaskList(this.element.querySelector('.done-list'));
  }
}
