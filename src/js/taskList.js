import formFactory from './formFactory';
import Form from './form';

export default class TaskList {
  constructor(str) {
    if (typeof (str) === 'string') {
      this.element = document.querySelector(str);
    } else {
      this.element = str;
    }
    this.btn = this.element.querySelector('.add-btn');
    this.tasks = [];

    this.onBtnClick = this.onBtnClick.bind(this);

    this.btn.addEventListener('click', this.onBtnClick);
  }

  onBtnClick() {
    this.btn.classList.toggle('invalid');
    const form = formFactory();
    this.element.insertAdjacentElement('beforeend', form);
    const submit = new Form(form);
    async function sss() {
      await submit.onSubmit();
      this.tasks.push();
      this.btn.classList.toggle('invalid');
      console.log(1);
    }
    sss();
  }
}
