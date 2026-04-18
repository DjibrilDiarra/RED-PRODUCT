
function togglePopup(){
    const popup = document.querySelector("#modal");
    if (popup) {
        popup.classList.toggle("open");
    }
}

function goToDetail(id){
    window.location.href = "Detail hôtel.html?id=" + id;
}