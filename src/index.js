queryInput.addEventListener("focus", () => {
  inputLabel.setAttribute("class", "input-placeholder input-label");
});

queryInput.addEventListener("blur", () => {
  if (queryInput.value === "") {
    inputLabel.classList.remove("input-label");
  }
});

btnClicked = (btn) => {
  if (queryInput.value === "") {
    console.error("invalid input");
    queryInput.placeholder = "NO query my guy :(";
  }
  btn.addEventListener("blur", () => {
    queryInput.placeholder = "";
  });
};
