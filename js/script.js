let limit = "11"
let offset = 2

const nextButton = document.getElementById('nextPage')
const prevButton = document.getElementById('prevPage')

nextButton.addEventListener('click',nextPage)
prevButton.addEventListener('click',prevPage)
function nextPage(){
    console.log("jola")
    if (offset<100){
        offset = offset +1
        getComics()
        setTimeout(addListenerAddCart,1500)

    }
    else{
        offset= 1
        getComics()
        addListenerAddCart()

    }
    console.log(offset)
}
function prevPage(){
    console.log("jola")
    if (offset<100){
        offset = offset -1
        getComics()
        setTimeout(addListenerAddCart,1000)

    }
    else{
        offset= 100
        getComics()
        addListenerAddCart()

    }
    console.log(offset)
}


const containerComics = document.getElementById("containerComics");

let carrito =[]

function buscarLocalStorage(){
    if(carrito.length< 1){
        carrito = JSON.parse(localStorage.getItem("playersKey"));
    }
}
buscarLocalStorage()


function getComics() {
  fetch(  `https://gateway.marvel.com:443/v1/public/comics?limit=${limit}&offset=${offset}&format=comic&formatType=comic&ts=1&apikey=b4ebf467190f0ee393e6c3650e0bba27&hash=b3af39bf8b3ddd162f654bb148762ae3`
  )
    .then((response) => response.json())
    .then((res) => {
        let comics = res.data.results;
        console.log(comics)

      let comicsWithImages = comics.filter(function(comicWithImage){
        return comicWithImage.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
      })

      html = ``;
      comicsWithImages.map((comic) => {
        html =
          html +
           `<div class="container_comic">
                <img class="img_comic" src="${comic.thumbnail.path}.jpg" alt="imagendeCOmic">
                <h4 class="comic_title">${comic.title} </h4>
                <h5 class="comic_price">${comic.prices[0].price}</h5>
                <button class="btn_add_cart" id="btnAddCart">ADD TO CART</button>
            </div>`;
        });
      containerComics.innerHTML = html;
    });
    
}
getComics()



// funcion para crear añadir elementos al carrito

function addListenerAddCart (){

    let btnAddCart = document.querySelectorAll(".btn_add_cart");
    if (btnAddCart.length == 0){
         setTimeout(addListenerAddCart,200)
    }
    else{
        console.log(btnAddCart)
        btnAddCart.forEach((addCartButton) =>
        addCartButton.addEventListener("click", addCart))
    }
}

addListenerAddCart()

function addCart(e){
    let title = e.target.parentNode.childNodes[3].textContent;
    let price = e.target.parentNode.childNodes[5].textContent;
    let path = e.target.parentNode.childNodes[1].src;
    console.log("hoal")
    carrito.push({
        title:`${title}`,
        price:price,
        path:`${path}`,
        id:`${carrito.length}`
    })
    console.log("carrito",carrito)
    renderCart()
    guardarEnStorage(carrito)
}

//end añadir a carrito


// funcion nav bar

const iconMenu = document.getElementById("iconMenu");
const iconCart = document.getElementById("iconCart");
const containerMenu = document.getElementById("containerMenu");
const containerCart = document.getElementById("containerCart");
const closeMenu = document.getElementById("closeMenu");
const closeCart = document.getElementById("closeCart");

iconCart.addEventListener("click",()=>{
    containerCart.classList.toggle("active")
})
iconMenu.addEventListener("click",()=>{
    containerMenu.classList.toggle("active")
})
closeCart.addEventListener("click",()=>{
    containerCart.classList.toggle("active");
    renderCart()
})
closeMenu.addEventListener("click",()=>{
    containerMenu.classList.toggle("active")
})



function guardarEnStorage(object) {
    let playersLocal = object;
    localStorage.setItem("playersKey", JSON.stringify(playersLocal));
  }
// renderizando el carrito

const cart = document.getElementById('listProducts')
function renderCart(){
    
    let html = ``
    carrito.map((product)=>{
        html = html + `<li class="item_list"id="${product.id}">
        <img class="image_list"src="${product.path}" alt="">
        <div class="container_title_product">
            <h4 class="title_cart">${product.title}</h4>
        </div>
        <h4 class="price_cart">${product.price}</h4>
        <i class="bi bi-x-lg delete_product" id="${product.id}"></i>
    </li>`
    })
    cart.innerHTML=html

    guardarEnStorage(carrito)
    addListenerDeleteProduct()
    getTotalPrice ()
}

function addListenerDeleteProduct(){
    let btn_delete = document.querySelectorAll('.delete_product')
    if (btn_delete.length == 0){
         setTimeout(addListenerDeleteProduct,200)
    }
    else{
        console.log(btn_delete)
        btn_delete.forEach((btn) =>
        btn.addEventListener("click", deleteProducts))
    }
}
addListenerDeleteProduct()

function deleteProducts(e){
    console.log(e.target.id)
    // console.log(e.target.parentNode)
    carrito = carrito.filter(function(carritoDeleted){
        return carritoDeleted.id !== e.target.id
    })
    renderCart()
}

// renderCart()
const price = document.getElementById('totalPrice');

//redondear el numero 
function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}

function getTotalPrice (){
    let totalprice = 0

    carrito.map((product)=>{
        totalprice = totalprice + Number(product.price)
    })

    totalprice = financial(totalprice)
    price.innerHTML= totalprice
}
renderCart()
// funcion para recibir el precio total

// Botón de realizar envio

let text = `quiero un comic`
let link = ` https://wa.me/+34632455863?text=${text}`

const sell= document.getElementById('buttonSell');
sell.addEventListener('click', abrir)

function abrir (){
    window.open(link)
}