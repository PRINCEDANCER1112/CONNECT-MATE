
let isSharingScreen = false;
let screenStream = null;

function generateCode() {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    document.getElementById('generatedCode').textContent = 'Your Code: ' + code;
    alert('Share this code with your partner: ' + code);
}

async function handleScreenShare() {
    const connectionCode = document.getElementById('connectionCode').value;
    if (connectionCode) {
        if (!isSharingScreen) {
            try {
                screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                const videoElement = document.getElementById('screenVideo');
                videoElement.srcObject = screenStream;
                isSharingScreen = true;
            } catch (error) {
                console.error('Screen sharing failed:', error);
            }
        } else {
            const tracks = screenStream.getTracks();
            tracks.forEach(track => track.stop());
            screenStream = null;
            isSharingScreen = false;
        }
    } else {
        alert('Please enter a valid connection code.');
    }
}

function getLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
        document.getElementById('locationDisplay').textContent =
            `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`;
    });
}
