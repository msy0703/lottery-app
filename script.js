const drawButton = document.getElementById('draw-button');
const winnerList = document.getElementById('winner-list');
const drumRollContainer = document.getElementById('drum-roll-container');

const lotteryItems = ["2コ", "３コ", "４コ", "もう１回"];

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
