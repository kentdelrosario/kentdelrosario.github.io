// Function to generate a random number between min and max
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a rose petal element and animate it
function createRosePetal() {
    const petal = document.createElement('div');
    petal.classList.add('rose-petal');

    // Random horizontal position and animation duration
    petal.style.left = `${getRandom(0, 100)}vw`; // Set random horizontal position
    petal.style.animationDuration = `${getRandom(5, 15)}s`; // Set random fall duration

    // Set random size for variety
    const size = getRandom(20, 50); // Size between 20px and 50px
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;

    // Add some randomness to the animation timing for better realism
    petal.style.animationDelay = `${getRandom(0, 5)}s`; // Random delay for each petal

    // Assign a random z-index to allow petals to fall in front of or behind content
    petal.style.zIndex = `${Math.floor(getRandom(-1, 2))}`; // z-index of -1 (behind) or 0 (in front)

    // Append the petal to the body
    document.body.appendChild(petal);

    // Remove the petal after it completes the fall animation
    setTimeout(() => {
        petal.remove();
    }, parseFloat(petal.style.animationDuration) * 1000); // Duration in ms
}

// Function to continuously create petals
function generateRosePetals() {
    setInterval(createRosePetal, 300); // Create a petal every 300ms
}

// Start generating petals when the page loads
window.onload = generateRosePetals;
