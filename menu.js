// Set up the document body styles for a clean look
document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.backgroundColor = "black";

// Create the Galaxy Menu container
const menuContainer = document.createElement("div");
menuContainer.style.position = "absolute";
menuContainer.style.width = "300px";
menuContainer.style.padding = "20px";
menuContainer.style.backgroundColor = "#111";
menuContainer.style.borderRadius = "10px";
menuContainer.style.boxShadow = "0 0 20px rgba(255, 255, 255, 0.2)";
menuContainer.style.overflow = "hidden";
menuContainer.style.cursor = "grab";
document.body.appendChild(menuContainer);

// Title for the Galaxy Menu
const title = document.createElement("h2");
title.innerText = "Galaxy Menu";
title.style.color = "white";
title.style.textAlign = "center";
title.style.marginBottom = "20px";
title.style.fontFamily = "Arial, sans-serif";
menuContainer.appendChild(title);

// "Add Feature" button
const addButton = document.createElement("button");
addButton.innerText = "Add Feature";
addButton.style.width = "100%";
addButton.style.padding = "10px";
addButton.style.backgroundColor = "#333";
addButton.style.color = "white";
addButton.style.border = "none";
addButton.style.cursor = "pointer";
addButton.style.fontFamily = "Arial, sans-serif";
addButton.style.marginBottom = "15px";
menuContainer.appendChild(addButton);

// Container for dynamically added buttons
const buttonContainer = document.createElement("div");
menuContainer.appendChild(buttonContainer);

// Function to create moving star particles
function createStar() {
    const star = document.createElement("div");
    star.style.position = "absolute";
    star.style.width = "2px";
    star.style.height = "2px";
    star.style.backgroundColor = "white";
    star.style.borderRadius = "50%";
    star.style.opacity = Math.random();
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    menuContainer.appendChild(star);

    // Animate the star
    function animateStar() {
        star.style.top = Math.random() * 100 + "%";
        star.style.left = Math.random() * 100 + "%";
        setTimeout(animateStar, 2000 + Math.random() * 3000);
    }
    animateStar();
}

// Generate multiple stars for the galaxy effect
for (let i = 0; i < 100; i++) {
    createStar();
}

// Add feature button functionality
addButton.addEventListener("click", () => {
    const featureName = prompt("Enter the feature name:");
    const featureCode = prompt("Enter JavaScript code for the feature:");

    if (featureName && featureCode) {
        // Save the feature in localStorage
        const features = JSON.parse(localStorage.getItem('features')) || [];
        features.push({ name: featureName, code: featureCode });
        localStorage.setItem('features', JSON.stringify(features));

        // Create and add the feature button
        createFeatureButton(featureName, featureCode);
    }
});

// Function to create feature buttons
function createFeatureButton(name, code) {
    const featureButton = document.createElement("button");
    featureButton.innerText = name;
    featureButton.style.margin = "5px 0";
    featureButton.style.width = "100%";
    featureButton.style.padding = "10px";
    featureButton.style.backgroundColor = "#555";
    featureButton.style.color = "white";
    featureButton.style.border = "none";
    featureButton.style.cursor = "pointer";
    featureButton.style.fontFamily = "Arial, sans-serif";

    // Execute the custom JavaScript code when button is clicked
    featureButton.addEventListener("click", () => {
        try {
            eval(code); // Run the user-provided JavaScript code
        } catch (error) {
            alert("Error in feature code: " + error.message);
        }
    });

    buttonContainer.appendChild(featureButton); // Add the new button to the menu
}

// Load saved features from localStorage when the page loads
function loadFeatures() {
    const features = JSON.parse(localStorage.getItem('features')) || [];
    features.forEach(feature => createFeatureButton(feature.name, feature.code));
}

// Call loadFeatures when the page loads to render saved features
window.onload = loadFeatures;

// Make the menu draggable
let isDragging = false;
let offsetX, offsetY;

menuContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - menuContainer.offsetLeft;
    offsetY = e.clientY - menuContainer.offsetTop;
    menuContainer.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        menuContainer.style.left = e.clientX - offsetX + "px";
        menuContainer.style.top = e.clientY - offsetY + "px";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    menuContainer.style.cursor = "grab";
});
