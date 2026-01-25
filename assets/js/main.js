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

  // External link indicators
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  const lang = document.documentElement.lang || 'es';
  const srText = lang === 'en' ? '(opens in new tab)' : '(se abre en una nueva pestaña)';

  // Batch reads: Identify links needing updates
  const linksToUpdate = [];
  externalLinks.forEach(link => {
    // Prevent double injection
    if (!link.querySelector('.rc-external-link-icon')) {
      linksToUpdate.push(link);
    }
  });

  // Batch writes: Apply updates
  linksToUpdate.forEach(link => {
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

  // Copy to clipboard logic
  const copyButtons = document.querySelectorAll('.js-copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Prevent multiple clicks while showing success state
      if (btn.getAttribute('data-copying') === 'true') return;

      const textToCopy = btn.getAttribute('data-copy-text');
      if (!textToCopy) return;
      if (!navigator.clipboard) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        // Set copying flag
        btn.setAttribute('data-copying', 'true');

        // Visual feedback
        const originalIcon = btn.innerHTML; // Store original icon

        // Switch to checkmark
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
          </svg>
        `;

        const originalLabel = btn.getAttribute('aria-label');
        const originalTitle = btn.getAttribute('title');
        const successText = lang === 'en' ? 'Copied!' : '¡Copiado!';

        btn.setAttribute('aria-label', successText);
        if (originalTitle) btn.setAttribute('title', successText);

        setTimeout(() => {
          btn.innerHTML = originalIcon;
          if (originalLabel) btn.setAttribute('aria-label', originalLabel);
          if (originalTitle) btn.setAttribute('title', originalTitle);
          btn.removeAttribute('data-copying');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });
});
