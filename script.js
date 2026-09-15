document.addEventListener('DOMContentLoaded', () => {
    // Inicializar ícones da biblioteca Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // 1. Dados dos Projetos
    const projectsData = {
        projeto1: {
            title: "CASA VAZIO & HORIZONTE",
            tag: "RESIDENCIAL // BIM",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
            description: "Desenvolvida com modelagem BIM completa até o LOD 350. O projeto explora balanços estruturais arrojados ancorados em rocha viva, lajes nervuradas e caixilhos embutidos piso-teto que dissolvem a fronteira entre estar e a vegetação nativa.",
            specs: [
                { label: "ÁREA DO TERRENO", val: "2.400 m²" },
                { label: "ÁREA CONSTRUÍDA", val: "480 m²" },
                { label: "BALANÇO MÁXIMO", val: "7,80 metros livres" },
                { label: "ESTRUTURAL", val: "Concreto Armado + Protensão" },
                { label: "STATUS", val: "Concluído" }
            ]
        },
        projeto2: {
            title: "PAVILHÃO DA MEMÓRIA & LUZ",
            tag: "CULTURAL // PARAMÉTRICO",
            image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
            description: "Vencedor em 1º Lugar em concurso de anteprojetos. A volumetria monolítica recebe envoltória em chapas de aço corten com orifícios gerados por algoritmo no Rhino + Grasshopper para calibrar o sombreamento e a iluminância difusa interna.",
            specs: [
                { label: "CAPACIDADE ANFITEATRO", val: "320 espectadores" },
                { label: "ÁREA COBERTA", val: "1.650 m²" },
                { label: "ALGORITMO FACHADA", val: "Voronoi Gradient" },
                { label: "CONFORTO LUMÍNICO", val: "300 lux médios constantes" }
            ]
        },
        projeto3: {
            title: "PARQUE LINEAR ECOLOGIAS URBANAS",
            tag: "MASTERPLAN // CIDADE",
            image: "https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1600&q=80",
            description: "Intervenção urbana territorial com ênfase em Soluções Baseadas na Natureza (SbN). O desenho incorpora jardins de chuva, desassoreamento controlado e transposição segura de pedestres com passarelas bioclimáticas.",
            specs: [
                { label: "EXTENSÃO", val: "4.200 metros lineares" },
                { label: "ÁREA DE INTERVENÇÃO", val: "340.000 m²" },
                { label: "CICLOVIA", val: "Faixa exclusiva 3.00m" },
                { label: "BIOVALETAS", val: "14 bacias de retenção" }
            ]
        }
    };

    // 2. Elementos DOM
    const stretchRoll = document.getElementById('stretchRoll');
    const rollImageLayer = document.getElementById('rollImageLayer');
    const elevationGauge = document.getElementById('elevationGauge');

    const backgroundRenders = [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=85',
        'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=2400&q=85'
    ];

    // 3. Efeito de Esticamento Conforme o Scroll
    function updateStretchEffect() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(Math.max(scrollY / (docHeight || 1), 0), 1);

        const scaleY = 0.94 + (scrollProgress * 0.22);
        const scaleX = 0.96 + (scrollProgress * 0.04);
        const translateY = (scrollProgress * -25);

        if (stretchRoll) {
            stretchRoll.style.transform = `scale(${scaleX}, ${scaleY}) translateY(${translateY}px)`;
        }

        if (elevationGauge) {
            const elevationLevel = (scrollProgress * 18.5).toFixed(2);
            const percent = Math.round(scrollProgress * 100);
            elevationGauge.textContent = `LVL +${elevationLevel}m // BIM SCROLL: ${percent}%`;
        }

        if (rollImageLayer) {
            if (scrollProgress < 0.25) {
                rollImageLayer.style.backgroundImage = `url('${backgroundRenders[0]}')`;
            } else if (scrollProgress < 0.55) {
                rollImageLayer.style.backgroundImage = `url('${backgroundRenders[1]}')`;
            } else if (scrollProgress < 0.85) {
                rollImageLayer.style.backgroundImage = `url('${backgroundRenders[2]}')`;
            } else {
                rollImageLayer.style.backgroundImage = `url('${backgroundRenders[3]}')`;
            }
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateStretchEffect);
    }, { passive: true });

    updateStretchEffect();

    // 4. Alternar Render vs Planta Baixa (Projeto 01)
    const btnTogglePlan1 = document.getElementById('btnTogglePlan1');
    if (btnTogglePlan1) {
        btnTogglePlan1.addEventListener('click', () => {
            const renderEl = document.getElementById('planView1_render');
            const planEl = document.getElementById('planView1_plan');
            if (renderEl && planEl) {
                renderEl.classList.toggle('hidden');
                planEl.classList.toggle('hidden');
            }
        });
    }

    // 5. Controle de Modais
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    // Botões de fechar modal
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            closeModal(modalId);
        });
    });

    // Abrir modal de contato
    const btnOpenContactNav = document.getElementById('btnOpenContactNav');
    const btnOpenContactFooter = document.getElementById('btnOpenContactFooter');
    if (btnOpenContactNav) btnOpenContactNav.addEventListener('click', () => openModal('contactModal'));
    if (btnOpenContactFooter) btnOpenContactFooter.addEventListener('click', () => openModal('contactModal'));

    // Abrir modais de projetos
    document.querySelectorAll('.btn-open-project').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project-target');
            const data = projectsData[projectId];
            if (!data) return;

            document.getElementById('modalProjectTitle').textContent = data.title;
            document.getElementById('modalProjectTag').textContent = data.tag;
            document.getElementById('modalProjectImage').src = data.image;
            document.getElementById('modalProjectDescription').textContent = data.description;

            const specsContainer = document.getElementById('modalProjectSpecs');
            specsContainer.innerHTML = '';
            data.specs.forEach(s => {
                const div = document.createElement('div');
                div.className = 'border-b border-white/10 pb-1.5';
                div.innerHTML = `<span class="text-arch-300 block text-[10px]">${s.label}</span><span class="text-white font-medium">${s.val}</span>`;
                specsContainer.appendChild(div);
            });

            openModal('projectModal');
        });
    });

    // Fechar ao clicar fora do conteúdo
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            e.target.classList.add('hidden');
            document.body.style.overflow = '';
        }
    });

    // Envio do formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedback = document.getElementById('contactFeedback');
            if (feedback) {
                feedback.classList.remove('hidden');
                setTimeout(() => {
                    closeModal('contactModal');
                    feedback.classList.add('hidden');
                    contactForm.reset();
                }, 1800);
            }
        });
    }
});