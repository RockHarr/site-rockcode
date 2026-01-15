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
        skipLink.focus();
      } else {
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
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);

        // Visual feedback
        const originalIcon = btn.innerHTML;
        const successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>`;

        btn.innerHTML = successIcon;
        btn.classList.add('text-success');

        // Reset after 2s
        setTimeout(() => {
          btn.innerHTML = originalIcon;
          btn.classList.remove('text-success');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });

  // External link indicators
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  const lang = document.documentElement.lang || 'es';
  const srText = lang === 'en' ? '(opens in new tab)' : '(se abre en una nueva pestaña)';

  externalLinks.forEach(link => {
    // Prevent double injection
    if (link.querySelector('.rc-external-link-icon') || link.querySelector('svg')) return;

    // Add screen reader text
    const srSpan = document.createElement('span');
    srSpan.className = 'visually-hidden';
    srSpan.textContent = ` ${srText}`;
    link.appendChild(srSpan);

    // Add visual icon
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '1em');
    svg.setAttribute('height', '1em');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'rc-external-link-icon');
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
