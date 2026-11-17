document.addEventListener('click', async event => {
  const button = event.target.closest('[data-copy-path]');
  if (!button) return;
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  const textarea = panel.querySelector('textarea');
  const status = panel.querySelector('.copy-status');
  panel.classList.add('open');
  button.setAttribute('aria-expanded', 'true');
  try {
    await navigator.clipboard.writeText(textarea.value);
    button.textContent = 'Copied';
    status.textContent = 'Complete fields copied. The same text is visible here for review.';
  } catch {
    textarea.focus();
    textarea.select();
    button.textContent = 'Fields selected';
    status.textContent = 'Text selected. Use your device’s Copy command, or Download Text.';
  }
});
