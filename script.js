document.addEventListener("DOMContentLoaded", () => {
  const estimateBtn = document.getElementById("estimateBtn");
  const resetBtn = document.getElementById("resetBtn");
  const printBtn = document.getElementById("printBtn");
  const resultBox = document.getElementById("resultBox");

  function showError(input, message) {
    let oldError = input.parentElement.querySelector(".error");
    if (oldError) oldError.remove();
    let error = document.createElement("small");
    error.classList.add("error");
    error.innerText = message;
    input.parentElement.appendChild(error);
  }

  function clearErrors() {
    document.querySelectorAll(".error").forEach(el => el.remove());
  }

  function validateForm() {
    clearErrors();
    let isValid = true;

    const weight = document.getElementById("weight");
    const value = document.getElementById("value");
    const length = document.getElementById("length");
    const width = document.getElementById("width");
    const height = document.getElementById("height");

    if (weight.value <= 0 || weight.value === "") {
      showError(weight, "Weight must be greater than 0");
      isValid = false;
    }
    if (value.value < 0 || value.value === "") {
      showError(value, "Declared value cannot be empty or negative");
      isValid = false;
    }
    if (length.value <= 0) {
      showError(length, "Length must be greater than 0");
      isValid = false;
    }
    if (width.value <= 0) {
      showError(width, "Width must be greater than 0");
      isValid = false;
    }
    if (height.value <= 0) {
      showError(height, "Height must be greater than 0");
      isValid = false;
    }

    return isValid;
  }

  estimateBtn.addEventListener("click", () => {
    if (!validateForm()) {
      resultBox.style.display = "none";
      return;
    }

    const weight = parseFloat(document.getElementById("weight").value);
    const value = parseFloat(document.getElementById("value").value);
    const length = parseFloat(document.getElementById("length").value);
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    const service = document.getElementById("service").value;
    const fromRegion = document.getElementById("fromRegion").value;
    const toRegion = document.getElementById("toRegion").value;

    const volume = (length * width * height) / 5000;
    const chargeableWeight = Math.max(weight, volume);
    let baseRate = 50;

    if (service === "express") baseRate = 80;
    if (service === "overnight") baseRate = 120;
    if (fromRegion !== toRegion) baseRate += 30;

    const cost = baseRate * chargeableWeight + value * 0.01;

    resultBox.style.display = "block";
    resultBox.innerHTML = `
      <div class="row"><strong>Chargeable Weight:</strong><span>${chargeableWeight.toFixed(2)} kg</span></div>
      <div class="row"><strong>Service:</strong><span>${service}</span></div>
      <div class="row"><strong>From → To:</strong><span>${fromRegion} → ${toRegion}</span></div>
      <div class="row"><strong>Estimated Cost:</strong><span>₹${cost.toFixed(2)}</span></div>
    `;
  });

  resetBtn.addEventListener("click", () => {
    document.getElementById("calcForm").reset();
    clearErrors();
    resultBox.style.display = "none";
  });

  printBtn.addEventListener("click", () => {
    if (resultBox.style.display === "block") {
      window.print();
    } else {
      alert("Please estimate cost before printing.");
    }
  });
});
