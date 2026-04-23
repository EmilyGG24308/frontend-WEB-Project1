const nameInput = document.getElementById("name");
const descInput = document.getElementById("desc");
const imgInput = document.getElementById("img");
const ratingInput = document.getElementById("rating");
const genre1Input = document.getElementById("genre1");
const genre2Input = document.getElementById("genre2");
const API = "http://localhost:3000/series";

let currentPage = 1;
const limit = 4;






async function loadSeries() {
  const res = await fetch(`${API}?sort=id&order=desc&page=${currentPage}&limit=${limit}`);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(s => {
    const li = document.createElement("li");
    console.log("EDIT ID:", s.id);
    li.innerHTML = `
      <div>
        <b>${s.name}</b> - ${s.description}
        <p>Rating: ${s.rating||"-"}/5</p>
        <p>Genres: ${s.genre1||"N/A"}, ${s.genre2||"N/A"}</p>
        ${ s.image_url ? `<img src="${s.image_url}" alt="${s.name}" width="100">` : "" }
        <br>
        <button onclick="editSeries(${s.id})">Edit</button>
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

//DELETE
async function deleteSeries(id) {
  await fetch(API + "/" + id, { method: "DELETE" });
  loadSeries();
}

//edit
async function editSeries(id) {
  const name = prompt("New name (if applicable):");
  const description = prompt("New description (if applicable):");
  const image_url = prompt("New image URL (if applicable):");
  const rating = prompt("New rating (if applicable):");
  const genre1 = prompt("New genre 1 (if applicable):");
  const genre2 = prompt("New genre 2 (if applicable):");

  const body = {};



  if (name !== null && name.trim() !== "") body.name = name;
  if (description !== null && description.trim() !== "") body.description = description;
  if (image_url !== null && image_url.trim() !== "") body.image_url = image_url;
  if (rating !== null && rating.trim() !== "") body.rating = Number(rating);
  if (genre1 !== null && genre1.trim() !== "") body.genre1 = genre1;
  if (genre2 !== null && genre2.trim() !== "") body.genre2 = genre2;

  console.log("Sending update...", body);

  await fetch(`http://localhost:3000/series/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  loadSeries();
}

//search series
async function searchSeries() {
  const q = document.getElementById("search").value;
  console.log("Searching for:", q);

  const res = await fetch(`http://localhost:3000/series?q=${q}`);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";


  data.forEach(s => {
    const li = document.createElement("li");

    li.innerHTML += `
      <div>
        <h3>${s.name}</h3>
        <p>${s.description}</p>
        <p>Rating: ${s.rating||"-"}/5</p>
        <p>Genres: ${s.genre1||"N/A"}, ${s.genre2||"N/A"}</p>
        ${ s.image_url ? `<img src="${s.image_url}" alt="${s.name}" width="100">` : "" }
      </div>
    `;
    list.appendChild(li);
  });
}
//SORT
async function sortSeries(sort, order) {
  console.log("Sorting:", sort, order);

  const res = await fetch(`${API}?sort=${sort}&order=${order}`);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(s => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <b>${s.name}</b> - ${s.description}
        <p>Rating: ${s.rating || "-"}/5</p>
        <p>Genres: ${s.genre1 || "N/A"}, ${s.genre2 || "N/A"}</p>
        ${s.image_url ? `<img src="${s.image_url}" width="100">` : ""}
        <br>
        <button onclick="editSeries(${s.id})">Edit</button>
        <button onclick="deleteSeries(${s.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

//nextPAGE AND PREV
function nextPage() {
  console.log("Next CLICKED");
  currentPage++;
  loadSeries();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadSeries();
  }
}
loadSeries();