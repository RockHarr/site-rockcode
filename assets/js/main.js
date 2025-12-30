// Back to top logic
document.addEventListener('DOMContentLoaded', () => {
  const btnBackToTop = document.getElementById('btn-back-to-top');
  const skipLink = document.querySelector('.skip-link');

  if (btnBackToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btnBackToTop.classList.add('show');
      } else {
        btnBackToTop.classList.remove('show');
      }
    });

    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Move focus to skip link for accessibility
      if (skipLink) {
        // Ensure it's focusable just in case, though it should be if it's an anchor
        skipLink.focus();
      } else {
        // Fallback: make body focusable temporarily
        document.body.setAttribute('tabindex', '-1');
        document.body.focus();
        document.body.removeAttribute('tabindex');
      }
    });
  }
});
