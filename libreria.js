const getLibreria = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 404) {
          throw new Error("404- pagina non trovata");
        } else if (response.status === 500) {
          throw new Error("500- Internal server error");
        } else {
          throw new Error("Errore generico");
        }
      }
    })
    .then((data) => {
      const rowContainer = document.getElementsByClassName("row")[0];
      const cartList = document.getElementById("cart-list");
      data.forEach((libro) => {
        const card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
        <div class="card">
              <img src="${libro.img}" class="card-img-top img-fluid" alt="${libro.title}">
              <div class="card-body">
                <h5 class="card-title">${libro.title}</h5>
                <p class="card-text">Prezzo: ${libro.price}</p>
                <button href="#" class="btn btn-primary" onclick="rimuoviCard(this)">Scarta</button>
                <button href="#" class="btn btn-success" onclick="aggiungiAlCarrello('${libro.title}', ${libro.price})">Compra ora</button>
              </div>
            </div>
          `;
        rowContainer.appendChild(card);
      });
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart(savedCart);
};

//RIMUOVO LA CARD PREMENDO IL BOTTONE
function rimuoviCard(button) {
  const card = button.closest(".col");
  card.remove();
}

//FUNZIONE PER AGGIUNGERE UN LIBRO NEL CARRELLO
function aggiungiAlCarrello(title, price) {
  const book = { title, price };
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(cart);
}

//FUNZIONE PER RIMUOVERE IL LIBRO NEL CARRELLO
function rimuoviDalCarrello(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(cart);
}

//FUNZIONE PER VISUALIZZARE IL CARRELLO
function renderCart(cart) {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    listItem.innerHTML = `
      <span>${item.title} - Prezzo: ${item.price} €</span>
      <button class="btn btn-danger" onclick="rimuoviDalCarrello(${index})">Rimuovi</button>
    `;
    cartList.appendChild(listItem);
  });
}

getLibreria();
