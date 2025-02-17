document.getElementById("qr-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById("url-input").value;
  if (!urlInput) return;

  const resultDiv = document.getElementById("qr-result");
  resultDiv.classList.add("hidden");

  try {
    const response = await fetch("http://localhost:3000/generate-qr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: urlInput }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate QR code");
    }

    const blob = await response.blob();
    const qrImage = document.getElementById("qr-image");
    const downloadLink = document.getElementById("download-link");

    const qrImageUrl = URL.createObjectURL(blob);
    qrImage.src = qrImageUrl;
    downloadLink.href = qrImageUrl;

    resultDiv.classList.remove("hidden");
  } catch (error) {
    alert("Error: " + error.message);
  }
});

document.getElementById("hamburger").addEventListener("click", function () {
  const navItems = document.querySelector(".nav-items");
  navItems.classList.toggle("active");
});
