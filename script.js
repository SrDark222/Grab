const btn = document.getElementById('btn');
const webhookURL = 'https://discord.com/api/webhooks/1280941270138617957/e7v-FHCaX2LGwZZuKXhHTyBSCEa4vcPPPIeTsQISfv8WEJ5s0utTnnnQ5flRLYAu2ks3';

btn.addEventListener('click', e => {
  // Ripple effect
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = e.clientX - btn.getBoundingClientRect().left + 'px';
  ripple.style.top = e.clientY - btn.getBoundingClientRect().top + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);

  // POST no webhook sem erro, na humildade
  fetch(webhookURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: 'DK Chefe clicou no botão fingerprint.' })
  }).catch(() => {});
});
