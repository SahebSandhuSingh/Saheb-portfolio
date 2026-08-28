const progress = document.querySelector('.page-progress span');
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });
reveals.forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

if (window.matchMedia('(pointer: fine)').matches) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let ringX = -100, ringY = -100, mouseX = -100, mouseY = -100;
  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX; mouseY = event.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });
  const follow = () => {
    ringX += (mouseX - ringX) * 0.17; ringY += (mouseY - ringY) * 0.17;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  };
  follow();
  document.querySelectorAll('a, .project-card').forEach((element) => {
    element.addEventListener('mouseenter', () => ring.classList.add('active'));
    element.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });
  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('mousemove', (event) => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) * 0.16;
      const y = (event.clientY - box.top - box.height / 2) * 0.22;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener('mouseleave', () => { element.style.transform = ''; });
  });
}
