// Get token from localStorage
const token = localStorage.getItem("authToken");

// Redirect to login if not logged in
if (!token) {
  window.location.href = "index.html";
}

// Fetch inventory from backend
async function fetchInventory() {
  try {
    const res = await fetch("http://localhost:4000/inventory", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (!res.ok) throw new Error("Failed to fetch inventory");

    const inventory = await res.json();
    populateTable(inventory);
  } catch (err) {
    alert("Backend not reachable or token expired.");
    console.error(err);
  }
}

// Populate HTML table with inventory data
function populateTable(items) {
  const tbody = document.querySelector("#inventory-table tbody");
  tbody.innerHTML = ""; // Clear previous rows

  items.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.stock}</td>
      <td>${item.price}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Logout button
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  window.location.href = "index.html";
});

// Call fetchInventory on load
fetchInventory();
