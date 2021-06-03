export default function taskFactory(obj) {
  const item = document.createElement('li');
  item.className = 'list-item';
  const element = document.createElement('div');
  element.className = 'list-item-container';
  item.insertAdjacentElement('afterbegin', element);
  const btn = document.createElement('button');
  btn.className = 'list-item-btn invalid';
  const text = document.createElement('span');
  text.className = 'item-text';
  text.textContent = obj.text;
  item.dataset.id = obj.type;
  element.insertAdjacentElement('afterbegin', text);
  text.style = 'word-wrap: break-word';
  element.insertAdjacentElement('afterbegin', text);
  element.insertAdjacentElement('beforeend', btn);
  return item;
}
