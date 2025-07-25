const drawButton = document.getElementById('draw-button');
const winnerList = document.getElementById('winner-list');
const drumRollContainer = document.getElementById('drum-roll-container');
const settingsButton = document.getElementById('settings-button');
const settingsModal = document.getElementById('settings-modal');
const closeButton = settingsModal.querySelector('.close-button');
const lotteryItemsInput = document.getElementById('lottery-items-input');
const saveSettingsButton = document.getElementById('save-settings-button');

let lotteryItems = JSON.parse(localStorage.getItem('lotteryItems')) || ["🍭2コ", "🍬3コ", "🍫4コ", "✨もう１回"];

// Initialize input with current lottery items
lotteryItemsInput.value = lotteryItems.join(', ');

drawButton.addEventListener('click', () => {
    // Reset previous results
    winnerList.innerHTML = '';
    drumRollContainer.textContent = '';
    drawButton.disabled = true;

    // Drum roll animation
    let drumRollInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * lotteryItems.length);
        drumRollContainer.textContent = lotteryItems[randomIndex];
    }, 100);

    // Stop the drum roll and show the winner
    setTimeout(() => {
        clearInterval(drumRollInterval);
        drumRollContainer.textContent = ''; // Clear the drum roll text

        // Select one winner
        const randomIndex = Math.floor(Math.random() * lotteryItems.length);
        const winner = lotteryItems[randomIndex];

        // Display the winner
        const li = document.createElement('li');
        li.textContent = `🎉 ${winner} 🎉`;
        winnerList.appendChild(li);
        // Trigger the CSS transition
        setTimeout(() => {
            li.classList.add('visible');
        }, 50);

        // Re-enable the button after the winner is displayed
        setTimeout(() => {
            drawButton.disabled = false;
        }, 1000); // Re-enable after 1 second

    }, 3000); // Drum roll for 3 seconds
});

// Settings Modal Logic
settingsButton.addEventListener('click', () => {
    lotteryItemsInput.value = lotteryItems.join(', '); // Load current items into textarea
    settingsModal.style.display = 'flex'; // Show modal
});

closeButton.addEventListener('click', () => {
    settingsModal.style.display = 'none'; // Hide modal
});

saveSettingsButton.addEventListener('click', () => {
    const newItems = lotteryItemsInput.value.split(',').map(item => item.trim()).filter(item => item !== '');
    if (newItems.length > 0) {
        lotteryItems = newItems;
        localStorage.setItem('lotteryItems', JSON.stringify(lotteryItems)); // Save to local storage
        alert('抽選内容が保存されました！');
        settingsModal.style.display = 'none'; // Hide modal
    } else {
        alert('抽選項目を1つ以上入力してください。');
    }
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target == settingsModal) {
        settingsModal.style.display = 'none';
    }
});
