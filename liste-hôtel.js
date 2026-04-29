const cards = document.querySelector('.cards')

// TOKEN
const token = localStorage.getItem("token")

if (!token) {
  alert("Veuillez vous connecter")
  window.location.href = "connexion.html"
}


//  FORMAT PRIX
function formatPrix(prix) {
  return Number(prix).toLocaleString("fr-FR")
}


// CREER HOTEL
async function creerHotel(event) {
  event.preventDefault()

  const nom = document.getElementById("nom").value
  const adresse = document.getElementById("adresse").value
  const prix = parseInt(document.getElementById("prix").value.replace(/\D/g, "")) || 0
  const photo = document.getElementById("photo").files[0]

  if (!nom || !adresse) {
    alert("Nom et adresse obligatoires")
    return
  }

  try {
    const formData = new FormData()
    formData.append("nom", nom)
    formData.append("adresse", adresse)
    formData.append("prix", prix)
    formData.append("photo", photo)

    const res = await fetch("http://localhost:5000/hotel", {
      method: "POST",
      headers: {
        Authorization: token
      },
      body: formData
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message || "Erreur création hôtel")
      return
    }

    alert("Hôtel créé avec succès")

    document.getElementById("hotelForm").reset()

    afficherHotels()

  } catch (err) {
    console.log(err)
    alert("Erreur serveur")
  }
}


// AFFICHER HOTELS
async function afficherHotels() {
  try {
    const res = await fetch("http://localhost:5000/hotels", {
      headers: {
        Authorization: token
      }
    })

    const hotels = await res.json()

    if (!res.ok) {
      alert("Erreur chargement hôtels")
      return
    }

    cards.innerHTML = ""

    hotels.forEach((hotel) => {
      const card = document.createElement('div')
      card.classList.add('card')

      card.innerHTML = `
        <img src="${hotel.image}" onclick="goToDetail('${hotel._id}')">

        <div class="texte">
          <p>${hotel.adresse || 'Adresse inconnue'}</p>
          <h3>${hotel.nom}</h3>
          <h5>${formatPrix(hotel.prix)} XOF par nuit</h5>

          <button onclick="supprimerHotel('${hotel._id}')">
            Supprimer
          </button>
        </div>
      `

      cards.appendChild(card)
    })

  } catch (err) {
    console.log(err)
    alert("Erreur chargement")
  }
}


// SUPPRIMER HOTEL
async function supprimerHotel(id) {
  const confirmDelete = confirm("Supprimer cet hôtel ?")
  if (!confirmDelete) return

  try {
    const res = await fetch(`http://localhost:5000/hotel/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message || "Erreur suppression")
      return
    }

    alert("Hôtel supprimé")

    afficherHotels()

  } catch (err) {
    console.log(err)
    alert("Erreur serveur")
  }
}


// DETAIL
function goToDetail(id) {
  window.location.href = `Detail-hôtel.html?id=${id}`
}


window.creerHotel = creerHotel
window.afficherHotels = afficherHotels
window.supprimerHotel = supprimerHotel
window.goToDetail = goToDetail


afficherHotels()