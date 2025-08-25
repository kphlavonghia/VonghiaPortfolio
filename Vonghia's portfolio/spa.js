document.addEventListener("click", function (e) {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    const page = link.getAttribute("href");
    loadPage(page);
    history.pushState({ page }, "", page);
  }
});

window.addEventListener("popstate", function (e) {
  if (e.state && e.state.page) {
    loadPage(e.state.page);
  }
});

async function loadPage(page) {
  try {
    const res = await fetch(page + ".html");
    if (!res.ok) throw new Error("Page not found");
    const html = await res.text();
    document.getElementById("app").innerHTML = html;
  } catch (err) {
    document.getElementById("app").innerHTML = "<h1>404 Not Found</h1>";
  }
}
