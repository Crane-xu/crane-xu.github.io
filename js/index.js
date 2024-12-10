fetch("/sites.json")
  .then((r) => r.json())
  .then((r) => {
    let domString = "";
    r.sites.forEach((site) => {
      domString += `
        <a class="nav-tab" href="${site.url}">
            <img src="./img/${site.img}" alt="${site.name}">
            <span>${site.name}</span>
        </a>`;
    });
    document.getElementById("nav-wrap").innerHTML = domString;
  });
