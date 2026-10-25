// Начальные отзывы
let reviews = JSON.parse(localStorage.getItem('artur_reviews')) || [
  { id: 1, name: "Михаил", text: "Артур делал санузел под ключ. Керамогранит 120х60 лег идеально, запилы под 45 градусов — просто песня! Сделал душевой поддон и инсталляцию. Рекомендую!" },
  { id: 2, name: "Светлана", text: "Отличный мастер! Очень аккуратный, работал с эпоксидной затиркой в ванной. Все чисто, ровно и в срок. Выезжал за город без проблем." }
];

let isAdmin = false;

function renderReviews() {
  const container = document.getElementById('reviewsContainer');
  container.innerHTML = '';
  reviews.forEach(rev => {
    const div = document.createElement('div');
    div.className = 'review-card';
    div.innerHTML = `
      <button class="delete-review-btn" onclick="deleteReview(${rev.id})"><i class="fa-solid fa-trash"></i> Удалить</button>
      <div class="review-header">
        <span class="review-author">${rev.name}</span>
        <span class="review-stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
      </div>
      <div class="review-text">${rev.text}</div>
    `;
    container.appendChild(div);
  });
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('reviewerName').value;
  const text = document.getElementById('reviewerText').value;
  
  const newRev = {
    id: Date.now(),
    name: name,
    text: text
  };

  reviews.unshift(newRev);
  localStorage.setItem('artur_reviews', JSON.stringify(reviews));
  
  document.getElementById('addReviewForm').reset();
  renderReviews();
  alert('Спасибо! Ваш отзыв добавлен.');
}

function deleteReview(id) {
  if (confirm('Удалить этот отзыв?')) {
    reviews = reviews.filter(r => r.id !== id);
    localStorage.setItem('artur_reviews', JSON.stringify(reviews));
    renderReviews();
  }
}

function toggleAdminPrompt() {
  if (isAdmin) {
    isAdmin = false;
    document.getElementById('body').classList.remove('admin-mode');
    document.getElementById('adminBtnText').innerText = 'Управление';
    alert('Вы вышли из режима управления.');
  } else {
    document.getElementById('adminModal').style.display = 'flex';
  }
}

function checkAdmin() {
  const pin = document.getElementById('adminPin').value;
  if (pin === '1234') {
    isAdmin = true;
    document.getElementById('body').classList.add('admin-mode');
    document.getElementById('adminBtnText').innerText = 'Режим Админа (Вкл)';
    closeModal();
    alert('Режим управления активирован! Теперь на отзывах появились кнопки удаления.');
  } else {
    alert('Неверный пин-код!');
  }
}

function closeModal() {
  document.getElementById('adminModal').style.display = 'none';
  document.getElementById('adminPin').value = '';
}

renderReviews();
