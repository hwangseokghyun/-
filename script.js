function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  const sorted = Array.from(numbers).sort((a, b) => a - b);

  displayLottoRow(sorted);
  saveToLocalStorage(sorted);
}

function displayLottoRow(numbers) {
  const row = document.createElement('div');
  row.className = 'row';

  numbers.forEach(num => {
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
  localStorage.removeItem('savedLottoNumbers');
}

function copyLastRow() {
  const rows = document.querySelectorAll('.row');
  if (rows.length === 0) {
    alert("복사할 번호가 없습니다!");
    return;
  }

  const lastRow = rows[rows.length - 1];
  const numbers = Array.from(lastRow.querySelectorAll('.ball'))  // 클래스명 .ball로 명확히 지정
    .map(ball => ball.textContent.trim())
    .join(', ');

  // 복사 기능
  navigator.clipboard.writeText(numbers).then(() => {
    alert(`복사 완료! 🎉\n${numbers}`);
  }).catch(err => {
    console.error('복사 실패:', err);
    alert("복사에 실패했어요. 브라우저 권한 설정을 확인해주세요.");
  });
}


function getColorClass(number) {
  if (number <= 10) return 'yellow';
  if (number <= 20) return 'blue';
  if (number <= 30) return 'red';
  if (number <= 40) return 'black';
  return 'green';
}

function saveToLocalStorage(newNumbers) {
  const saved = JSON.parse(localStorage.getItem('savedLottoNumbers')) || [];
  saved.push(newNumbers);
  localStorage.setItem('savedLottoNumbers', JSON.stringify(saved));
}

function loadFromLocalStorage() {
  const saved = JSON.parse(localStorage.getItem('savedLottoNumbers'));
  if (saved && Array.isArray(saved)) {
    saved.forEach(row => {
      displayLottoRow(row);
    });
  }
}

window.onload = function () {
  loadFromLocalStorage();
};
