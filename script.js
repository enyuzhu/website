(function () {
    const heroCopy = document.getElementById('heroCopy');
    const projectTitle = document.getElementById('projectTitle');
    const cardSlots = Array.from(document.querySelectorAll('.card-slot'));

    if (!heroCopy || cardSlots.length === 0) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadyPlayed = sessionStorage.getItem('introPlayed') === '1';
    const STAGGER_MS = 110;
    const START_DELAY_MS = 200;

    function settleImmediately() {
        cardSlots.forEach((slot) => {
            slot.classList.add('in', 'idle');
        });
    }

    function runIntro() {
        const last = cardSlots.length - 1;
        cardSlots.forEach((slot, i) => {
            const order = last - i;
            setTimeout(() => slot.classList.add('in'), START_DELAY_MS + order * STAGGER_MS);
        });
        const settleDelay = START_DELAY_MS + cardSlots.length * STAGGER_MS + 500;
        setTimeout(() => {
            cardSlots.forEach((slot) => slot.classList.add('idle'));
            sessionStorage.setItem('introPlayed', '1');
        }, settleDelay);
    }

    if (reduceMotion || alreadyPlayed) {
        settleImmediately();
    } else {
        runIntro();
    }

    if (projectTitle) {
        let leaveTimer = null;

        function showProject(title) {
            clearTimeout(leaveTimer);
            projectTitle.textContent = title;
            heroCopy.classList.add('showing-project');
        }

        function scheduleHideProject() {
            clearTimeout(leaveTimer);
            leaveTimer = setTimeout(() => {
                heroCopy.classList.remove('showing-project');
            }, 80);
        }

        cardSlots.forEach((slot) => {
            const card = slot.querySelector('.card');
            if (!card) return;
            const title = card.dataset.title || '';
            card.addEventListener('pointerenter', () => showProject(title));
            card.addEventListener('pointerleave', scheduleHideProject);
            card.addEventListener('focus', () => showProject(title));
            card.addEventListener('blur', scheduleHideProject);
        });
    }
})();

(function () {
    document.querySelectorAll('.see-more').forEach((toggle) => {
        const targetId = (toggle.getAttribute('href') || '').slice(1);
        const target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();
