function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

function createSection() {
  const section = document.createElement("section");
  section.className = "nav";
  const h3 = document.createElement("h3");
  h3.className = "span";

  for (const c of "分享知识，探索未知") {
    const span = document.createElement("span");
    span.className = "m";
    span.innerText = c;
    h3.appendChild(span);
  }
  section.appendChild(h3);

  return section;
}

async function createLink(site) {
  const a = document.createElement('a');
  a.className = "nav-tab";
  a.href = site.url;
  await preloadImage(`./img/${site.img}`);
  const imgDom = document.createElement("img");
  imgDom.src = `./img/${site.img}`;
  imgDom.alt = site.name;
  a.appendChild(imgDom);
  const span = document.createElement("span");
  span.innerText = site.name;
  a.appendChild(span);
  return a;
}

window.addEventListener('load', async function () {
  const rs = await fetch("/sites.json");
  const r = await rs.json();
  const section = createSection();
  const div = document.createElement("div");
  div.id = "nav-wrap";
  div.className = "nav-container";

  for await (const element of r.sites.map(s => createLink(s))) {
    div.appendChild(element);
  }

  section.appendChild(div);
  const [main] = document.getElementsByTagName("main");
  main.replaceChild(section, document.querySelector('.main-warp'));
});