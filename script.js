document.getElementById("estimateBtn").addEventListener("click", () => {
  const weight = parseFloat(document.getElementById("weight").value) || 0;
  const value = parseFloat(document.getElementById("value").value) || 0;
  const length = parseFloat(document.getElementById("length").value) || 0;
  const width = parseFloat(document.getElementById("width").value) || 0;
  const height = parseFloat(document.getElementById("height").value) || 0;
  const service = document.getElementById("service").value;
  const fromRegion = document.getElementById("fromRegion").value;
  const toRegion = document.getElementById("toRegion").value;

  const volume = (length * width * height) / 5000;
  const chargeableWeight = Math.max(weight, volume);

  let baseRate = 50;
  if (service === "express") baseRate = 80;
  if (service === "overnight") baseRate = 120;

  let regionFactor = 1;
  if (fromRegion !== toRegion) {
    if (toRegion === "regional") regionFactor = 1.2;
    if (toRegion === "national") regionFactor = 1.5;
    if (toRegion === "international") regionFactor = 3.0;
  }

  const shippingCost = (chargeableWeight * baseRate * regionFactor).toFixed(2);
  const insurance = (value * 0.02).toFixed(2);

  const resultBox = document.getElementById("resultBox");
  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <div class="row"><strong>Chargeable Weight:</strong><span>${chargeableWeight.toFixed(2)} kg</span></div>
    <div class="row"><strong>Service:</strong><span>${service}</span></div>
    <div class="row"><strong>From:</strong><span>${fromRegion}</span></div>
    <div class="row"><strong>To:</strong><span>${toRegion}</span></div>
    <div class="row"><strong>Shipping Cost:</strong><span>₹${shippingCost}</span></div>
    <div class="row"><strong>Insurance (2%):</strong><span>₹${insurance}</span></div>
    <div class="row"><strong>Total:</strong><span>₹${(parseFloat(shippingCost) + parseFloat(insurance)).toFixed(2)}</span></div>
  `;
});

document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("calcForm").reset();
  document.getElementById("resultBox").style.display = "none";
});

document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});
