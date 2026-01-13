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

  // Copy to clipboard logic
  const copyBtns = document.querySelectorAll('.js-copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy-text');
      const originalTitle = btn.getAttribute('title');
      const originalLabel = btn.getAttribute('aria-label');

      try {
        await navigator.clipboard.writeText(text);

        // Visual feedback
        const icon = btn.querySelector('svg');
        const checkIconHtml = '<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>';
        const clipboardIconHtml = '<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>';

        icon.innerHTML = checkIconHtml;
        btn.classList.remove('link-secondary');
        btn.classList.add('text-success');

        // Localization for success message
        const lang = document.documentElement.lang || 'es';
        const successMsg = lang === 'en' ? 'Copied!' : '¡Copiado!';

        btn.setAttribute('aria-label', successMsg);
        btn.setAttribute('title', successMsg);

        // Reset after 2 seconds
        setTimeout(() => {
          icon.innerHTML = clipboardIconHtml;
          btn.classList.remove('text-success');
          btn.classList.add('link-secondary');
          btn.setAttribute('aria-label', originalLabel);
          btn.setAttribute('title', originalTitle);
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  });

  // External link indicators
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  const lang = document.documentElement.lang || 'es';
  const srText = lang === 'en' ? '(opens in new tab)' : '(se abre en una nueva pestaña)';

  externalLinks.forEach(link => {
    // Prevent double injection
    if (link.querySelector('.rc-external-link-icon')) return;

    // Add screen reader text
    const srSpan = document.createElement('span');
    srSpan.className = 'visually-hidden';
    srSpan.textContent = ` ${srText}`;
    link.appendChild(srSpan);

    // Add visual icon
    // Using Bootstrap Icons 'box-arrow-up-right' path
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '1em');
    svg.setAttribute('height', '1em');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'rc-external-link-icon');
    // Minimal styling to align it nicely
    svg.style.marginLeft = '4px';
    svg.style.verticalAlign = 'text-bottom';

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('fill-rule', 'evenodd');
    path1.setAttribute('d', 'M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z');

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path2.setAttribute('fill-rule', 'evenodd');
    path2.setAttribute('d', 'M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z');

    svg.appendChild(path1);
    svg.appendChild(path2);
    link.appendChild(svg);
  });
});
