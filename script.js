function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  const sorted = Array.from(numbers).sort((a, b) => a - b);

  const row = document.createElement('div');
  row.className = 'row';

  sorted.forEach(num => {
    const ball = document.createElement('div');
    ball.className = `ball ${getColorClass(num)}`;
    ball.textContent = num;
    row.appendChild(ball);
  });

  const container = document.getElementById('lottoNumbers');
  container.appendChild(row);
}

function clearLottoNumbers() {
  document.getElementById('lottoNumbers').innerHTML = '';
}

function copyLastRow() {
  const rows = document.querySelectorAll('.row');
  if (rows.length === 0) {
    alert("복사할 번호가 없습니다!");
    return;
  }

  const lastRow = rows[rows.length - 1];
  const numbers = Array.from(lastRow.children)
                       .map(ball => ball.textContent)
                       .join(', ');

  navigator.clipboard.writeText(numbers).then(() => {
    alert(`복사 완료! 🎉\n${numbers}`);
  });
}

function getColorClass(number) {
  if (number <= 10) return 'yellow';
  if (number <= 20) return 'blue';
  if (number <= 30) return 'red';
  if (number <= 40) return 'black';
  return 'green';
}
