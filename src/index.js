let agentUuid = [];

window.onload = () => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://valorant-api.com/v1/agents/", true);
  xhr.send();
  xhr.onload = function () {
    let agentData = JSON.parse(this.responseText);
    agentData.data.forEach((element) => {
      agentUuid.push(element.developerName);
      agentUuid.push(element.displayName.toLowerCase());
      agentUuid.push(element.uuid);
    });
    let filterIndex = agentUuid.indexOf("Hunter_NPE");
    agentUuid.splice(filterIndex, 3);
    console.log(agentUuid);
  };
};

queryInput.addEventListener("focus", () => {
  inputLabel.setAttribute("class", "input-placeholder input-label");
});

queryInput.addEventListener("blur", () => {
  if (queryInput.value === "") {
    inputLabel.classList.remove("input-label");
  }
});

sendRequest.addEventListener("blur", () => {
  queryInput.placeholder = "";
});

btnClicked = (btn) => {
  if (queryInput.value === "") {
    console.error("invalid input");
    queryInput.placeholder = "NO query my guy :(";
  } else {
    request(queryInput.value);
  }
};

displayResponse = (responseJSON) => {
  responseOBJ = JSON.parse(responseJSON);
  agentContainer.style.display = "grid";
  agentChild = agentContainer.children;
  agentChild[0].textContent = responseOBJ.data.displayName;
  agentChild[1].children[0].src = responseOBJ.data.bustPortrait;
  agentChild[2].textContent = responseOBJ.data.role.displayName;
  agentChild[3].children[0].src = responseOBJ.data.role.displayIcon;
  agentChild[4].textContent = responseOBJ.data.role.description;
  agentChild[5].textContent = responseOBJ.data.description;
  for (i = 7; i < 11; i++) {
    agentChild[i].children[0].children[0].src =
      responseOBJ.data.abilities[i - 7].displayIcon;
    agentChild[i].children[1].textContent =
      responseOBJ.data.abilities[i - 7].displayName;
    agentChild[i].children[2].textContent =
      responseOBJ.data.abilities[i - 7].description;
  }
};

request = (query) => {
  const xhr = new XMLHttpRequest();
  query = query.toLowerCase();
  let queryIndex = agentUuid.indexOf(query);

  if (queryIndex === -1) {
    queryInput.placeholder = "No such agent exists";
  } else {
    xhr.open(
      "GET",
      `https://valorant-api.com/v1/agents/${agentUuid[queryIndex + 1]}`,
      true
    );

    xhr.onprogress = function () {
      console.log("on progress");
    };

    xhr.onload = function () {
      console.log(this.status);
      if (this.status === 200) {
        displayResponse(this.responseText);
      } else {
        console.error(this.status);
        console.error(this.statusText);
      }
    };

    xhr.send();
  }
};
