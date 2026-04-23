const API = "http://localhost:3000/series";

async function loadSeries() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(s => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${s.name}</b> - ${s.description}
      <button onclick="deleteSeries(${s.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name.value,
      description: desc.value,
      image_url: img.value
    })
  });

  loadSeries();
});

async function deleteSeries(id) {
  await fetch(API + "/" + id, { method: "DELETE" });
  loadSeries();
}

loadSeries();