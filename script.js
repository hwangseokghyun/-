const container = document.getElementById('lottoNumbers');
const generateButton = document.getElementById('generateButton');
const resetButton = document.getElementById('resetButton');
const copyButton = document.getElementById('copyButton');

let lastNumbers = [];

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  const sorted = Array.from(numbers).sort((a, b) => a - b);
  lastNumbers = sorted;

  const row = document.createElement('div');
  row.classList.add('row');

  sorted.forEach(number => {
    const ball = document.createElement('div');
    ball.className = 'ball ' + getColorClass(number);
    ball.innerText = number;
    row.appendChild(ball);
  });

  container.appendChild(row);
  saveToLocal();
}

function getColorClass(number) {
  if (number <= 10) return 'yellow';
  if (number <= 20) return 'blue';
  if (number <= 30) return 'red';
  if (number <= 40) return 'black';
  return 'green';
}

function resetLottoNumbers() {
  container.innerHTML = '';
  lastNumbers = [];
  localStorage.removeItem('lottoHistory');
}

function copyLastNumbers() {
  if (lastNumbers.length === 0) return alert("복사할 번호가 없어요!");
  navigator.clipboard.writeText(lastNumbers.join(', '));
  alert("복사 완료! 🎉");
}

function saveToLocal() {
  let history = JSON.parse(localStorage.getItem('lottoHistory')) || [];
  history.push(lastNumbers);
  localStorage.setItem('lottoHistory', JSON.stringify(history));
}

generateButton.addEventListener('click', generateLottoNumbers);
resetButton.addEventListener('click', resetLottoNumbers);
copyButton.addEventListener('click', copyLastNumbers);
