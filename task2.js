const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  alert(`Высота экрана: ${window.innerHeight} Ширина экрана: ${window.innerWidth}`);
});