const questions = document.querySelectorAll('.questions__item');
questions.forEach(item => {
  let hide = item.querySelector('.questions__item-text');
  item.addEventListener('click', function () {
    if (hide.style.display === 'none') {
      hide.style.display = 'block';
      item.classList.add('active');
    } else {
      hide.style.display = 'none';
      item.classList.remove('active');
    }
  });
})