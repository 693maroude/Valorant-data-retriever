let agentUuid = {
  breach: "5f8d3a7f-467b-97f3-062c-13acf203c006",
  raze: "f94c3b30-42be-e959-889c-5aa313dba261",
  kayo: "601dbbe7-43ce-be57-2a40-4abd24953621",
  skye: "6f2a04ca-43e0-be17-7f36-b3908627744d",
  cypher: "117ed9e3-49f3-6512-3ccf-0cada7e3823b",
  sova: "ded3520f-4264-bfed-162d-b080e2abccf9",
  killjoy: "1e58de9c-4950-5125-93e9-a0aee9f98746",
  viper: "707eab51-4836-f488-046a-cda6bf494859",
  phoenix: "eb93336a-449b-9c1b-0a54-a891f7921d69",
  astra: "41fb69c1-4189-7b37-f117-bcaf1e96f1bf",
  brimestone: "9f0d8ba9-4140-b941-57d3-a7ad57c6b417",
  yoru: "7f94d92c-4234-0a36-9646-3a87eb8b5c89",
  sage: "569fdd95-4d10-43ab-ca70-79becc718b46",
  reyna: "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc",
  omen: "8e253930-4c05-31dd-1b6c-968525494517",
  jett: "add6443a-41bd-e414-f6ad-e58d267f4e95",
};

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
    request(queryInput.value);
  }
  btn.addEventListener("blur", () => {
    queryInput.placeholder = "";
  });
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

  xhr.open(
    "GET",
    `https://valorant-api.com/v1/agents/${agentUuid[query]}`,
    true
  );

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
