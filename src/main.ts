const grossInput = document.getElementById("gross-input") as HTMLInputElement | null;
const grossOutput = document.getElementById("gross-output") as HTMLParagraphElement | null;

console.log(grossInput);

grossInput?.addEventListener("keyup", (e) => {
  updateGrossMonhtly();
});

function updateGrossMonhtly() {
  if (grossInput == null || grossOutput == null) return;
  let inputAmount = Number(grossInput.value);
  if (isNaN(inputAmount)) {
    inputAmount = 0;
  }
  console.log(grossInput);

  let monthlyGross = inputAmount / 12;

  grossOutput.textContent = `£${monthlyGross.toFixed(2)}`;
}

export {};
