function updateRectangle() {
    const widthInput = document.getElementById('room-width');
    const heightInput = document.getElementById('room-height');
    const errorMessage = document.getElementById('error-message');

    let width = parseFloat(widthInput.value);
    let height = parseFloat(heightInput.value);

    // Handle cases where fields are blank
    if (isNaN(width) && isNaN(height)) {
        width = 1;
        height = 1;
    } else if (isNaN(width)) {
        width = height; // if width is blank, use height value
    } else if (isNaN(height)) {
        height = width; // if height is blank, use width value
    }

    let aspectRatio;

    if (width <= 0 || height <= 0) {
        errorMessage.textContent = 'Values must be greater than 0.';
        aspectRatio = 0;
    } else {
        errorMessage.textContent = '';
        aspectRatio = width / height;
    }

    const containerWidth = document.getElementById('main-container').offsetWidth;
    const containerHeight = document.getElementById('container').offsetHeight - document.getElementById('input-container').offsetHeight;

    let rectWidth, rectHeight;

    if (containerWidth / containerHeight > aspectRatio) {
        rectHeight = aspectRatio != 0 ? containerHeight : 0;
        rectWidth = containerHeight * aspectRatio;
    } else {
        rectWidth = containerWidth;
        rectHeight = aspectRatio != 0 ? containerWidth / aspectRatio : 0;
    }

    const rectangle = document.getElementById('rectangle');
    rectangle.style.width = rectWidth + 'px';
    rectangle.style.height = rectHeight + 'px';
    // Set the width of the visualization container explicitly
    const visualizationContainer = document.getElementById('visualization');
    visualizationContainer.style.width = containerWidth + 'px';
    visualizationContainer.style.height = containerHeight + 'px';
}

// Add event listeners to the input fields
document.addEventListener('DOMContentLoaded', function() {
    const widthInput = document.getElementById('room-width');
    const heightInput = document.getElementById('room-height');
    widthInput.addEventListener('input', updateRectangle);
    heightInput.addEventListener('input', updateRectangle);

    const toggleButton = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContainer = document.getElementById('main-container');

    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContainer.classList.toggle('shifted');

        if (sidebar.classList.contains('collapsed')) {
            toggleButton.classList.remove('active');
            toggleButton.classList.add('inactive');
            mainContainer.style.width = '100%';
        } else {
            toggleButton.classList.remove('inactive');
            toggleButton.classList.add('active');
            mainContainer.style.width = 'calc(100% - 250px)';
        }
        // TODO: make this not rely on 300ms time delay
        setTimeout(updateRectangle, 300); // Delay to allow layout changes to appl
    });

    // Initial state
    toggleButton.classList.add('active');
    updateRectangle();
});

window.onresize = () => {
    updateRectangle();
};
