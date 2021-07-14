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
  } else {
    request();
  }
  btn.addEventListener("blur", () => {
    queryInput.placeholder = "";
  });
};

displayResponse = (responseJSON) => {
  responseOBJ = JSON.parse(responseJSON);
  console.log(responseOBJ.data[1].displayName);
};

request = () => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://valorant-api.com/v1/weapons", true);

  xhr.onprogress = function () {
    console.log("on progress");
  };

  xhr.onload = function () {
    console.log(this.status);
    if (this.status === 200) {
      displayResponse(this.responseText);
    }
  };

  xhr.send();
};
