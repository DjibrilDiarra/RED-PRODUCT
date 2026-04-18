const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const hotel = hotels[id];

if (!hotel) {
    document.body.innerHTML = "<h2> Hôtel introuvable</h2>";
} else {
    document.getElementById("name").textContent = hotel.name;
    document.getElementById("image").src = hotel.image;
    document.getElementById("location").textContent = hotel.location;
    document.getElementById("stars").textContent = hotel.stars;
    document.getElementById("rooms").textContent = hotel.rooms;
    document.getElementById("restaurant").textContent = hotel.restaurant;
    document.getElementById("services").textContent = hotel.services;
    document.getElementById("price").textContent = hotel.price;
}

function goBack(){
    window.location.href = "liste des hotels.html";
}