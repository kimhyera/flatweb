import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initMotion(root) {
  gsap.registerPlugin(ScrollTrigger);
  const abort = new AbortController();
  const on = (el, event, callback) => el?.addEventListener(event, callback, { signal: abort.signal });
  const select = selector => root.querySelector(selector);
  const menu = select('.menu');
  const nav = select('#navigation');
  const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', '메뉴 열기'); };
  on(menu, 'click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기'); });
  nav.querySelectorAll('a').forEach(link => on(link, 'click', closeMenu));
  on(document, 'keydown', event => { if (event.key === 'Escape') closeMenu(); });
  on(document, 'click', event => { if (!event.target.closest('.header')) closeMenu(); });
  const dialog = select('#inquiry');
  on(select('#inquiry-open'), 'click', () => dialog.showModal());
  dialog.querySelectorAll('button').forEach(button => on(button, 'click', () => dialog.close()));
  on(dialog, 'click', event => { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });
  select('#year').textContent = new Date().getFullYear();
  let active = true;
  let projectCount = 0;
  root.querySelectorAll('[data-asset]').forEach(element => {
    const image = new Image();
    image.onload = () => { if (!active) return; element.style.backgroundImage = `url("${element.dataset.asset}")`; element.classList.add('has-asset'); if (element.classList.contains('project-image') && ++projectCount === 3) select('.asset-note').hidden = true; };
    image.src = element.dataset.asset;
  });
  const hero = new Image();
  hero.onload = () => { if (!active) return; select('.hero').style.setProperty('--hero-image', 'url("./assets/hero.jpg")'); select('.hero').classList.add('has-hero'); };
  hero.src = './assets/hero.jpg';
  const mm = gsap.matchMedia();
  const ctx = gsap.context(() => {
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.header', { y: -15, autoAlpha: 0, duration: .9, ease: 'power2.out' });
      gsap.from('.hero-copy > *', { y: 24, autoAlpha: 0, duration: 1.2, stagger: .12, ease: 'power3.out', delay: .15 });
      gsap.utils.toArray('.float-card').forEach((card, index) => {
        const rotation = parseFloat(getComputedStyle(card).getPropertyValue('--rotate')) || 0;
        gsap.set(card, { rotation });
        gsap.to(card, { y: -14 - index * 3, rotation: rotation + 3, duration: 3.4 + index * .4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: index * .25 });
      });
      gsap.to('.orb, .mockup, .ai-screen', { y: -14, duration: 4, stagger: .3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-art', { y: 100, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.4 } });
      gsap.utils.toArray('.reveal').forEach(element => {
        gsap.from(element, { y: 32, autoAlpha: 0, duration: .95, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
      });
    });
  }, root);
  return () => { active = false; abort.abort(); mm.revert(); ctx.revert(); };
}
