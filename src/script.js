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
    console.log('containerWidth / containerHeight', containerWidth / containerHeight);
    console.log('aspect ratio', aspectRatio);
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

    // Update the positions of the coordinates
    // const bottomLeftCoordinates = document.getElementById('coordinates-bottom-left');
    // const topRightCoordinates = document.getElementById('coordinates-top-right');

    // const rectLeft = (containerWidth - rectWidth) / 2;
    // const rectRight = rectLeft + rectWidth;
    // const rectBottom = (containerHeight - rectHeight) / 2;
    // const rectTop = rectBottom + rectHeight;

    // bottomLeftCoordinates.style.left = `${Math.max(rectLeft - bottomLeftCoordinates.offsetWidth, 0)}px`;
    // bottomLeftCoordinates.style.bottom = `${Math.max(containerHeight - rectBottom, 0)}px`;
    // topRightCoordinates.style.left = `${Math.min(rectRight, containerWidth - topRightCoordinates.offsetWidth)}px`;
    // topRightCoordinates.style.bottom = `${Math.min(containerHeight - rectTop + topRightCoordinates.offsetHeight, containerHeight)}px`;

    // topRightCoordinates.textContent = `(${width}, ${height})`;
    // Set the width of the visualization container explicitly
    const visualizationContainer = document.getElementById('visualization');
    visualizationContainer.style.width = containerWidth + 'px';
    visualizationContainer.style.height = containerHeight + 'px';
}

// Add event listeners to the input fields
document.addEventListener('DOMContentLoaded', function() {
    const triangles = document.querySelectorAll('.triangle');

    triangles.forEach(triangle => {
        let startX, startY;
        let originalLeft, originalTop;

        // Get the bounding rect of the triangle and its parent
        const parentBox = triangle.parentElement;

        triangle.addEventListener('mousedown', (event) => {
            // Calculate the center of the triangle
            const parentRect = parentBox.getBoundingClientRect();
            const triangleRect = triangle.getBoundingClientRect();

            parentBox.classList.add('dragging');

            // Store the triangle's position relative to its parent box
            originalLeft = triangleRect.left - parentRect.left + (triangleRect.width / 2);
            originalTop = triangleRect.top - parentRect.top + (triangleRect.height / 2);

            offsetX = event.clientX - triangleRect.left;
            offsetY = event.clientY - triangleRect.top;

            startX = event.clientX + offsetX;
            startY = event.clientY + offsetY;

            triangle.style.cursor = 'grabbing';
            triangle.style.position = 'absolute';
            triangle.style.zIndex = '1000'; // Bring to front

            const onMouseMove = (event) => {
                const deltaX = event.clientX - startX;
                const deltaY = event.clientY - startY;

                triangle.style.left = `${originalLeft + deltaX}px`;
                triangle.style.top = `${originalTop + deltaY}px`;
            };

            const onMouseUp = () => {
                triangle.style.cursor = 'grab';
                triangle.style.position = '';
                triangle.style.zIndex = '';

                // Snap back to the center of the parent box
                const parentBoxRect = parentBox.getBoundingClientRect();
                triangle.style.left = `${parentBoxRect.width / 2 - triangle.offsetWidth / 2}px`;
                triangle.style.top = `${parentBoxRect.height / 2 - triangle.offsetHeight / 2}px`;

                parentBox.classList.remove('dragging');

                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });

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
