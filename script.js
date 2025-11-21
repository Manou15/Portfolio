document.querySelectorAll('.nav-list a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        const id = this.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if(target){
            target.scrollIntoView({ behavior: 'smooth', block: 'start'});
            history.replaceState(null, '', '#' + id);
        }
    })
});

const sectionNodes = Array.from(document.querySelectorAll('main [id]'));

const idToLink = {};
document.querySelectorAll('.nav-list a[href^="#"]').forEach(a => {
  const id = a.getAttribute('href').slice(1);
  if (id) idToLink[id] = a;
});

// callback de l'observer
const observerCallback = (entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = idToLink[id];
    if (!link) return;

    if (entry.isIntersecting) {

      Object.values(idToLink).forEach(a => {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      });

      link.classList.add('active');
      link.setAttribute('aria-current', 'true');
    }
  });
};


const observer = new IntersectionObserver(observerCallback, {
  root: null,
  rootMargin: '0px 0px -40% 0px', 
  threshold: 0.15
});

sectionNodes.forEach(sec => observer.observe(sec));

const scrollHeight = document.documentElement.scrollHeight;
console.log(scrollHeight);

const scrollPosition = document.documentElement.scrollTop;
console.log(scrollPosition);

