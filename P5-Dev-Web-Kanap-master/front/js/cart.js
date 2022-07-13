function displayCart () {
    let products = JSON.parse(localStorage.getItem("cart"));
    let totalQty = 0;
    let total = 0;

    products.forEach(product => {
        
        let productId = product._id;
        let productColor = product.color;
        let productQuantity = product.quantity;

        //article
        let art = document.createElement("article");
        art.classList.add("cart__item");
        art.setAttribute('data-id', productId);
        art.setAttribute('data-color', productColor);
        document.querySelector("#cart__items").appendChild(art);

        //image
        const divImg = document.createElement("div");
        divImg.classList.add("cart__item__img");
        art.appendChild(divImg);

        const img = document.createElement("img");
        img.setAttribute('src', `${product.imageUrl}`);
        img.setAttribute('alt', `${product.altTxt}`);
        divImg.appendChild(img);

        const divItem = document.createElement("div");
        divItem.classList.add("cart__item__content");
        art.appendChild(divItem);

        //description
        const divDesc = document.createElement("div");
        divDesc.classList.add("cart__item__content__description");
        divItem.appendChild(divDesc);

        //name
        const name = document.createElement("h2");
        name.textContent = `${product.name}`;
        divDesc.appendChild(name);

        //color
        const color = document.createElement("p");
        color.textContent = "Couleur : " + productColor;
        divDesc.appendChild(color);

        //price
        const price = document.createElement("p");
        price.textContent = "Prix : " + `${product.price}` + " €";
        divDesc.appendChild(price);

        //settings
        const divSet = document.createElement("div");
        divSet.classList.add("cart__item__content__settings");
        divItem.appendChild(divSet);

        //quantity
        const divQty = document.createElement("div");
        divQty.classList.add("cart__item__content__settings__quantity");
        divSet.appendChild(divQty);

        const quantity = document.createElement("p");
        quantity.textContent = "Qté : ";
        divQty.appendChild(quantity);

        const inputQty = document.createElement("input");
        inputQty.setAttribute('type', "number");
        inputQty.classList.add("itemQuantity");
        inputQty.setAttribute('name', "itemQuantity");
        inputQty.setAttribute('min', "1");
        inputQty.setAttribute('max', "100");
        inputQty.setAttribute('value', productQuantity);
        divQty.appendChild(inputQty);

        //delete
        const divDlt = document.createElement("div");
        divDlt.classList.add("cart__item__content__settings__delete");
        divSet.appendChild(divDlt);

        let btnDlt = document.createElement("p");
        btnDlt.classList.add("deleteItem");
        btnDlt.textContent = "Supprimer";
        divDlt.appendChild(btnDlt);

        btnDlt.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart"));
            cart = cart.filter(product => product.id != productId && product.color != productColor);
            localStorage.removeItem("product");
            localStorage.setItem("cart", JSON.stringify(cart));
        });

        //total quantity
        let totalProduct = document.querySelector("#totalQuantity");
        totalQty += productQuantity;
        totalProduct.textContent = totalQty;

        //total price
        let totalPrice = document.querySelector("#totalPrice");
        total += product.price * productQuantity;
        totalPrice.textContent = total;
    });

    //order
    document.querySelector("#order").addEventListener("click", () => {

        const form = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value
        }

        localStorage.setItem("form", JSON.stringify(form));

        const sendConfirmation = {
            products,
            form
        }
    });

    let dataLocalStorage = JSON.parse(localStorage.getItem("form"));

    function dataInput(input) {
        dataLocalStorage == null ? console.log() : document.querySelector(`#${input}`).value = dataLocalStorage[input];
    }

    dataInput("firstName");
    dataInput("lastName");
    dataInput("address");
    dataInput("city");
    dataInput("email");
}

displayCart();