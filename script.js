const poster = document.querySelector('#poster');
const feelButton = document.querySelector('#feel-button');
const buttonCopy = feelButton.querySelector('.button-copy');
const reaction = document.querySelector('#reaction');

const reactions = [
  'Ay, ay, ay... \u00a1qu\u00e9 rico!',
  '\u00a1Eso s\u00ed pica rico!',
  'Una picadita y sonrisa.'
];

let reactionIndex = 0;
let resetTimer;

feelButton.addEventListener('click', () => {
  poster.classList.remove('is-hot');
  // Restart the short animation for every tap, including consecutive ones.
  void poster.offsetWidth;
  poster.classList.add('is-hot');

  reactionIndex = (reactionIndex + 1) % reactions.length;
  reaction.textContent = reactions[reactionIndex];
  buttonCopy.textContent = '\u00a1OTRA VEZ!';

  window.clearTimeout(resetTimer);
  resetTimer = window.setTimeout(() => {
    poster.classList.remove('is-hot');
    buttonCopy.textContent = 'TOCA EL CHILE';
  }, 1100);
});
// Selección accesible de salsas y enlace de pedido personalizado.
const salsaCards = document.querySelectorAll('.salsa-card');
const salsaOrderPanel = document.querySelector('#salsa-order-panel');
const salsaOrderSummary = document.querySelector('#salsa-order-summary');
const salsaOrderLink = document.querySelector('#salsa-order-link');

salsaCards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-selected');

    salsaCards.forEach((option) => {
      const selected = option.classList.contains('is-selected');
      option.setAttribute('aria-pressed', String(selected));
      option.querySelector('.salsa-card-hint').textContent = selected
        ? 'Seleccionada ✓'
        : 'Toca para elegir';
    });

    const selectedCards = Array.from(salsaCards).filter((option) =>
      option.classList.contains('is-selected')
    );

    if (selectedCards.length === 0) {
      salsaOrderPanel.classList.remove('is-visible');
      salsaOrderPanel.hidden = true;
      return;
    }

    const names = selectedCards.map((option) => option.dataset.name);
    const products = selectedCards.map((option) =>
      option.dataset.name + ' ($' + option.dataset.price + ' MXN)'
    );
    const subtotal = selectedCards.reduce(
      (sum, option) => sum + Number(option.dataset.price),
      0
    );
    const total = subtotal.toFixed(2);

    salsaOrderSummary.textContent =
      'Elegiste ' + names.join(' + ') +
      ' · Subtotal (una de cada sabor): $' + total + ' MXN';

    const message =
      'Hola, quiero pedir una de cada uno de estos sabores: ' +
      products.join(', ') +
      '. Subtotal: $' + total +
      ' MXN. ¿Podemos acordar la compra?';

    salsaOrderLink.href =
      'https://wa.me/529982188205?text=' + encodeURIComponent(message);
    salsaOrderLink.setAttribute(
      'aria-label',
      'Hacer pedido por WhatsApp de ' + names.join(', ')
    );

    const wasHidden = salsaOrderPanel.hidden;
    salsaOrderPanel.hidden = false;
    if (wasHidden) {
      window.requestAnimationFrame(() =>
        salsaOrderPanel.classList.add('is-visible')
      );
    }
  });
});
