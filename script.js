// ===== CONFIGURAÇÃO DO CLIENTE (troque aqui ao criar site pra outra barbearia) =====
const CONFIG = {
    nome: 'Studio N',                                              // nome da barbearia (alt das logos)
    bookingUrl: '#',   // link do sistema de agendamento
    logo: ''                                                       // caminho da logo, ex: './assets/logo.png'
};

// Todos os botões de agendar usam o mesmo link
document.querySelectorAll('[data-booking]').forEach(a => {
    a.href = CONFIG.bookingUrl;
    a.target = '_blank';
    a.rel = 'noopener';
});

// Logo (header + hero)
document.querySelectorAll('[data-logo]').forEach(img => {
    if (CONFIG.logo) img.src = CONFIG.logo;
    img.alt = CONFIG.nome;
});

// Menu Mobile
const mobileMenu = document.getElementById('mobile-menu');
const nav = document.getElementById('nav');

mobileMenu.addEventListener('click', () => nav.classList.toggle('active'));
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('active'));
});

// Header aparece depois do hero (IntersectionObserver: sem listener de scroll, sem forçar layout)
const header = document.getElementById('header');
const hero = document.getElementById('hero');

new IntersectionObserver(([entry]) => {
    header.classList.toggle('visible', !entry.isIntersecting);
}, { rootMargin: '-100px 0px 0px 0px', threshold: 0 }).observe(hero);

// Scroll reveal (para de observar depois que o elemento aparece)
const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.hidden').forEach(el => revealObserver.observe(el));

// Partículas douradas (só no hero, poucas, e desligadas se o usuário prefere menos movimento)
(function createParticles() {
    const container = document.getElementById('particles');
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const count = window.matchMedia('(max-width: 768px)').matches ? 8 : 16;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 2;
        p.className = 'particle';
        p.style.cssText =
            `width:${size}px;height:${size}px;` +
            `left:${Math.random() * 100}%;top:${40 + Math.random() * 60}%;` +
            `animation-duration:${Math.random() * 10 + 15}s;` +
            `animation-delay:${Math.random() * 5}s;`;
        frag.appendChild(p);
    }
    container.appendChild(frag);
})();

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => question.parentElement.classList.toggle('active'));
});

// ===== Galeria: filtro + lightbox =====
(function () {
    const tabs = document.querySelectorAll('.galeria-tab');
    const items = document.querySelectorAll('.galeria-item');
    tabs.forEach(tab => tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const f = tab.dataset.filter;
        items.forEach(i => i.classList.toggle('oculto', f !== 'todos' && i.dataset.cat !== f));
    }));

    const box = document.getElementById('lightbox');
    const boxImg = box.querySelector('img');
    items.forEach(item => item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return; // sem foto ainda (placeholder)
        boxImg.src = img.src;
        boxImg.alt = img.alt;
        box.classList.add('aberto');
    }));
    box.addEventListener('click', () => box.classList.remove('aberto'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') box.classList.remove('aberto'); });
})();