(function(){
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    status.textContent = 'Sending…';
    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = (window.SITE_CONFIG && window.SITE_CONFIG.formsEndpoint) || '';
    try {
      if (endpoint) {
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) });
        if (!res.ok) throw new Error('Failed');
        status.textContent = 'Thank you! We will call you shortly.';
        form.reset();
      } else {
        const mailto = `mailto:${encodeURIComponent('appointments@rajladiestailor.in')}?subject=${encodeURIComponent('Callback Request')}&body=${encodeURIComponent(JSON.stringify(data, null, 2))}`;
        window.location.href = mailto;
        status.textContent = 'Opening your email client…';
      }
    } catch (err) {
      status.textContent = 'Sorry, something went wrong. Please WhatsApp or call us.';
    }
  });
})();

