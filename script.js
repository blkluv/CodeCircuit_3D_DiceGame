document.addEventListener('DOMContentLoaded', () => {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const rollBtn = document.getElementById('rollBtn');
    const rollCount = document.getElementById('rollCount');
    const points = document.getElementById('points');
    const matchRate = document.getElementById('matchRate');
    const historyList = document.getElementById('historyList');

    let totalRolls = 0;
    let totalPoints = 0;
    let totalMatches = 0;
    let isRolling = false;

    // Function to animate dice
    function animateDice(dice, roll) {
        return new Promise((resolve) => {
            // Hide all images first
            dice.querySelectorAll('img').forEach(img => {
                img.classList.remove('visible');
            });

            // Generate random rotation values
            const xRand = Math.floor(Math.random() * 360);
            const yRand = Math.floor(Math.random() * 360);
            const zRand = Math.floor(Math.random() * 360);

            // Create multiple random rotation keyframes
            const rotations = [
                { x: 0, y: 0, z: 0 },
                { x: Math.floor(Math.random() * 360), y: Math.floor(Math.random() * 360), z: Math.floor(Math.random() * 360) },
                { x: Math.floor(Math.random() * 360), y: Math.floor(Math.random() * 360), z: Math.floor(Math.random() * 360) },
                { x: Math.floor(Math.random() * 360), y: Math.floor(Math.random() * 360), z: Math.floor(Math.random() * 360) },
                { x: xRand, y: yRand, z: zRand }
            ];

            const animation = new KeyframeEffect(
                dice,
                rotations.map(r => ({
                    transform: `rotateX(${r.x}deg) rotateY(${r.y}deg) rotateZ(${r.z}deg)`
                })),
                {
                    duration: 1500, // Increased duration for slower animation
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
                    iterations: 1
                }
            );

            const animationPlayer = new Animation(animation, document.timeline);
            animationPlayer.play();

            animationPlayer.onfinish = () => {
                // Add a smooth transition to the final position
                dice.style.transition = 'transform 0.5s ease-out';
                
                const faces = {
                    1: { x: 0, y: 0, z: 0 },
                    2: { x: 90, y: 0, z: 0 },
                    3: { x: 0, y: 90, z: 0 },
                    4: { x: 0, y: -90, z: 0 },
                    5: { x: -90, y: 0, z: 0 },
                    6: { x: 180, y: 0, z: 0 }
                };

                dice.style.transform = `rotateX(${faces[roll].x}deg) rotateY(${faces[roll].y}deg) rotateZ(${faces[roll].z}deg)`;
                
                // Show the correct image
                const face = dice.querySelector(`.face img[alt="${roll}"]`);
                if (face) {
                    face.classList.add('visible');
                }
                
                resolve();
            };
        });
    }

    function rollDice() {
        if (isRolling) return;
        isRolling = true;
        rollBtn.disabled = true;

        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        totalRolls++;

        // Update statistics
        rollCount.textContent = totalRolls;

        // Add to history
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${roll1 === roll2 ? 'match' : 'miss'}`;
        historyItem.innerHTML = `
            <span class="result">${roll1 === roll2 ? '✔️' : '❌'}</span>
        `;
        // Remove oldest item if we have more than 5
        if (historyList.children.length >= 5) {
            historyList.removeChild(historyList.lastChild);
        }
        historyList.insertBefore(historyItem, historyList.firstChild);

        // Animate both dice
        Promise.all([
            animateDice(dice1, roll1),
            animateDice(dice2, roll2)
        ]).then(() => {
            // Check for match
            if (roll1 === roll2) {
                totalPoints += 10;
                totalMatches++;
                dice1.classList.add('matched');
                dice2.classList.add('matched');
                
                // Remove matched class after animation
                setTimeout(() => {
                    dice1.classList.remove('matched');
                    dice2.classList.remove('matched');
                }, 1000);
            }

            // Update points and match rate
            points.textContent = totalPoints;
            matchRate.textContent = ((totalMatches / totalRolls) * 100).toFixed(1) + '%';
            
            // Re-enable button
            isRolling = false;
            rollBtn.disabled = false;
        });
    }

    // Add click event listener
    rollBtn.addEventListener('click', rollDice);

    // Add Enter key support
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isRolling) {
            rollBtn.click();
        }const rotations = [
            { x: 0, y: 0, z: 0 },
            { x: Math.floor(Math.random() * 180), y: Math.floor(Math.random() * 180), z: Math.floor(Math.random() * 180) }, // Fast initial rotation
            { x: Math.floor(Math.random() * 70), y: Math.floor(Math.random() * 70), z: Math.floor(Math.random() * 70) }, // Slower rotation
            { x: Math.floor(Math.random() * 25), y: Math.floor(Math.random() * 25), z: Math.floor(Math.random() * 25) }, // Even slower
            { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10), z: Math.floor(Math.random() * 10) }  // Final slow rotation
        ];const animation = new KeyframeEffect(
            dice,
            rotations.map(r => ({
                transform: `rotateX(${r.x}deg) rotateY(${r.y}deg) rotateZ(${r.z}deg)`
            })),
            {
                duration: 1500,
                easing: 'ease-out', // This creates a natural slowdown
                fill: 'forwards'
            }
        );animationPlayer.onfinish = () => {
            dice.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            // ... rest of the code
        };
    });

    // Initial focus
    rollBtn.focus();
});