document.addEventListener('click', async event => {
  const link = event.target.closest('a[download]');
  if (!link || link.dataset.generated) return;
  event.preventDefault();
  const text = link.textContent;
  link.textContent = 'Preparing download…';
  try {
    const response = await fetch(link.href);
    if (!response.ok) throw new Error('File unavailable');
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const save = document.createElement('a');
    save.href = url;
    save.download = new URL(link.href).pathname.split('/').pop();
    save.dataset.generated = 'true';
    document.body.append(save);
    save.click();
    save.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    link.textContent = text;
  } catch (error) {
    link.textContent = text;
    let notice = document.getElementById('download-notice');
    if (!notice) {
      notice = document.createElement('p');
      notice.id = 'download-notice';
      notice.setAttribute('role', 'status');
      link.parentElement.append(notice);
    }
    notice.textContent = 'Download could not start. Open the file to save it: ';
    const fallback = document.createElement('a');
    fallback.href = link.href;
    fallback.target = '_blank';
    fallback.rel = 'noopener';
    fallback.textContent = 'Open file';
    notice.append(fallback);
  }
});
