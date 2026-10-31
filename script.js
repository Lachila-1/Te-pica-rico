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
