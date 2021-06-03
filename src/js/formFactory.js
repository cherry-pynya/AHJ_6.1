export default function formFactory() {
  const form = document.createElement('form');
  const textArea = document.createElement('input');
  const btn = document.createElement('button');
  textArea.type = 'text';
  textArea.placeholder = 'Add task...';
  textArea.className = 'text-area';
  btn.type = 'submit';
  btn.textContent = 'Add Card';
  btn.className = 'form-btn';
  form.className = 'add-form';
  form.insertAdjacentElement('afterbegin', textArea);
  form.insertAdjacentElement('beforeend', btn);
  return form;
}
