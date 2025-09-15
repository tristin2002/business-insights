(function(){
  const items = [
    { src: 'https://images.unsplash.com/photo-1542060748-10c28b62716b?q=80&w=1000&auto=format&fit=crop', cat: 'Bridal' },
    { src: 'https://images.unsplash.com/photo-1503342394129-539efe6cf1fa?q=80&w=1000&auto=format&fit=crop', cat: 'Partywear' },
    { src: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1000&auto=format&fit=crop', cat: 'Casual' },
    { src: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop', cat: 'Casual' },
    { src: 'https://images.unsplash.com/photo-1520975624748-0a7b2e37eb81?q=80&w=1000&auto=format&fit=crop', cat: 'Partywear' },
    { src: 'https://images.unsplash.com/photo-1614032686310-7c016cbf3779?q=80&w=1000&auto=format&fit=crop', cat: 'Bridal' }
  ];
  const grid = document.getElementById('gallery');
  const filters = document.getElementById('filters');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  function render(filter){
    grid.innerHTML = '';
    items.filter(i => filter==='all' || i.cat===filter).forEach(({src, cat})=>{
      const a = document.createElement('a');
      a.href = src;
      a.dataset.cat = cat;
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${cat} outfit`;
      img.loading = 'lazy';
      a.appendChild(img);
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        lightboxImg.src = src;
        lightbox.classList.add('open');
      });
      grid.appendChild(a);
    });
  }
  if (filters) {
    filters.addEventListener('click', (e)=>{
      const btn = e.target.closest('button');
      if (!btn) return;
      filters.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b===btn));
      render(btn.dataset.filter);
    });
  }
  if (lightboxClose) lightboxClose.addEventListener('click', ()=> lightbox.classList.remove('open'));
  if (lightbox) lightbox.addEventListener('click', (e)=>{ if (e.target===lightbox) lightbox.classList.remove('open'); });
  render('all');
})();

