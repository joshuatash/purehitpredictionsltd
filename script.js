function renderPredictions(filter = 'all') {
    const vipContainer = document.getElementById('vip-list');
    const ordContainer = document.getElementById('ordinary-list');
    const vipSection = document.getElementById('vip-section');
    const categoryLabel = document.getElementById('category-label');

    vipContainer.innerHTML = "";
    ordContainer.innerHTML = "";

    const createCardHTML = (game) => `
        <div class="game-card status-${game.status}">
            <span class="date-time">${game.date} | ${game.time}</span>
            <strong class="matchup">${game.home} vs ${game.away}</strong>
            <div class="prediction-line">
                <span><small style="color:#666">TIP:</small> <strong>${game.prediction}</strong></span>
                <span class="odds-pill">${game.odds}</span>
            </div>
        </div>
    `;

    if (filter === 'all') {
        vipSection.classList.remove('hidden');
        categoryLabel.innerText = "DAILY TOP 5";
        
        // Render 1 VIP Game
        if (PURE_HIT_DATA.vip.length > 0) {
            vipContainer.innerHTML = createCardHTML(PURE_HIT_DATA.vip[0]);
        }
        
        // Render 5 Ordinary Games
        PURE_HIT_DATA.ordinary.forEach(game => ordContainer.innerHTML += createCardHTML(game));
    } else {
        vipSection.classList.add('hidden');
        categoryLabel.innerText = `${filter} MARKET`;
        
        const marketGames = MARKET_DATA[filter];
        if (marketGames && marketGames.length > 0) {
            marketGames.forEach(game => ordContainer.innerHTML += createCardHTML(game));
        } else {
            ordContainer.innerHTML = `<p style="text-align:center; padding:30px; color:#444;">No ${filter} games posted.</p>`;
        }
    }
    lucide.createIcons();
}

function filterGames(category, element) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    renderPredictions(category);
}

window.addEventListener('DOMContentLoaded', () => renderPredictions('all'));