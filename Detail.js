const params = new URLSearchParams(window.location.search);
const id = params.get("id");

function formatPrix(prix) {
  return Number(prix).toLocaleString("fr-FR");
}

async function afficherHotel() {
  if (!id) {
    document.body.innerHTML = "<h2>ID manquant</h2>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/hotel/${id}`);
    const hotel = await res.json();

    if (!res.ok || !hotel) {
      document.body.innerHTML = "<h2>Hôtel introuvable</h2>";
      return;
    }

    console.log(hotel);

    document.getElementById("name").textContent = hotel.nom;
    document.getElementById("image").src = hotel.image;
    document.getElementById("location").textContent = hotel.adresse;
    document.getElementById("price").textContent = formatPrix(hotel.prix) + " XOF";

  } catch (err) {
    console.log(err);
    document.body.innerHTML = "<h2>Erreur serveur</h2>";
  }
}

afficherHotel();