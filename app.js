const nameInput = document.getElementById("name");
const descInput = document.getElementById("desc");
const imgInput = document.getElementById("img");
const ratingInput = document.getElementById("rating");
const genre1Input = document.getElementById("genre1");
const genre2Input = document.getElementById("genre2");
const API = "http://localhost:3000/series";






async function loadSeries() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(s => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <b>${s.name}</b> - ${s.description}
        <p>Rating: ${s.rating||"-"}/5</p>
        <p>Genres: ${s.genre1||"N/A"}, ${s.genre2||"N/A"}</p>
        ${ s.image_url ? `<img src="${s.image_url}" alt="${s.name}" width="100">` : "" }
        <br>
        <button onclick="deleteSeries(${s.id})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("Submitting...");
  console.log("NAME:", nameInput.value);

  await fetch("http://localhost:3000/series", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: nameInput.value,            //  THIS WAS MISSING
      description: descInput.value,
      image_url: imgInput.value,
      rating: ratingInput.value ? Number(ratingInput.value) : null,
      genre1: genre1Input.value,
      genre2: genre2Input.value
    })
  });

  loadSeries();
});
async function deleteSeries(id) {
  await fetch(API + "/" + id, { method: "DELETE" });
  loadSeries();
}

loadSeries();