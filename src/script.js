function updateRectangle() {
    const width = parseFloat(document.getElementById('room-width').value);
    const height = parseFloat(document.getElementById('room-height').value);

    const beaconListWidth = document.getElementById('beacon-list').offsetWidth;
    const bodyWidth = document.body.clientWidth;;
    const containerWidth = bodyWidth - beaconListWidth;
    const containerHeight = document.getElementById('right-container').offsetHeight - document.getElementById('input-container').offsetHeight;

    const aspectRatio = width / height;
    console.log("aspect ratio", aspectRatio);
    let rectWidth, rectHeight;


    if (containerWidth / containerHeight > aspectRatio) {
        rectHeight = containerHeight;
        rectWidth = containerHeight * aspectRatio;
    } else {
        rectWidth = containerWidth;
        rectHeight = containerWidth / aspectRatio;
    }

    const rectangle = document.getElementById('rectangle');
    rectangle.style.width = rectWidth + 'px';
    rectangle.style.height = rectHeight + 'px';

    // Set the width of the visualization container explicitly
    const visualizationContainer = document.getElementById('visualization');
    visualizationContainer.style.width = containerWidth + 'px';
    visualizationContainer.style.height = containerHeight + 'px';
}

window.onload = () => {
    updateRectangle();
};

window.onresize = () => {
    updateRectangle();
};