
const input = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const clearBtn = document.getElementById("clear-btn");
const downloadBtn = document.getElementById("download-btn");
const qrContainer = document.getElementById("qr-container");
const message = document.getElementById("message");

let qrCode = null;

// Generate QR Code
function generateQRCode() {
    const text = input.value.trim();

    if (text === "") {
        qrContainer.innerHTML = "";
        qrCode = null;
        message.textContent = "Please enter text or URL!";
        message.style.color = "#c44343";
        return;
    }

    qrContainer.innerHTML = "";

    qrCode = new QRCode(qrContainer, {
        text: text,
        width: 108,
        height: 108,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    message.textContent = "QR code generated successfully!";
    message.style.color = "#303a33";
}

// Clear input and QR Code
function clearQRCode() {
    input.value = "";
    qrContainer.innerHTML = "";
    qrCode = null;

    message.textContent = "";
    input.focus();
}

// Download QR Code as PNG
function downloadQRCode() {
    const canvas = qrContainer.querySelector("canvas");
    const image = qrContainer.querySelector("img");

    if (!canvas && !image) {
        message.textContent = "Please generate a QR Code first!";
        message.style.color = "#c44343";
        return;
    }

    let imageURL;

    if (canvas) {
        imageURL = canvas.toDataURL("image/png");
    } else {
        imageURL = image.src;
    }

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "my-qr-code.png";

    document.body.appendChild(link);
    link.click();
    link.remove();
}

// Button events
generateBtn.addEventListener("click", generateQRCode);
clearBtn.addEventListener("click", clearQRCode);
downloadBtn.addEventListener("click", downloadQRCode);

// Generate initial QR Code for "Mohamud"
generateQRCode();
