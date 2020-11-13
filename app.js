class Product {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    productName() {
        const { name } = this;
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    cost() {
        const { price } = this;
        return `$${Number(price).toFixed(2)}`;
    }

    amount() {
        const { quantity } = this;
        return Math.round(quantity);
    }
    addItem() {
        let randomNumber = Math.floor(Math.random() * 10_000);
        return `
        <div class="container">
            <div class="row">
                <div class="list-desc col-sm"><span class="p-3 mb-2 bg-dark text-white">ID#: ${randomNumber}</span>${this.productName()}</div>
                <div class="list-desc col-sm"><span class="p-3 mb-2 bg-primary text-white">Quantity</span>${this.amount()}</div>
                <div class="list-desc col-sm"><span class="p-3 mb-2 bg-danger text-white">Price</span>${this.cost()}</div>
            </div>
        </div>`;
    }
}

const list = document.querySelector('.list-parent');
const enterItemButton = document.querySelector('#add-item');
const product = document.querySelector('#product-name');
const quantity = document.querySelector('#quantity-of-items');
const price = document.querySelector('#item-price');
const allInputs = [product, quantity, price];

const total = document.querySelector('#display-total');

// item accumalator
let accumalator = [];

// enter item on click
enterItemButton.addEventListener('click', () => {
    enterProduct();
});
// enter item on enter
for (let input of allInputs) {
    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            enterProduct();
        }
    });
}

function enterProduct() {
    let productValue = product.value;
    let quantityValue = Number(quantity.value);
    let priceValue = Number(price.value);


    if (isNaN(quantityValue) || isNaN(priceValue)) {
        alert('Only numerical values please!');
        quantity.value = '', price.value = '';
        quantity.classList.add('reddened');
        price.classList.add('reddened');
        return;
    }

    else if (product.value && quantity.value && price.value) {

        for (let input of allInputs) {
            input.classList.remove('reddened');
        }

        for (let i = 0; i < Number(quantity.value); i++) {
            accumalator.push(Number(price.value));
        }

        let newProduct = new Product(productValue, quantityValue, priceValue);

        let newLi = document.createElement('li');
        newLi.classList.add('list-group-item');
        newLi.innerHTML = newProduct.addItem();

        list.append(newLi);
        product.value = '', quantity.value = '', price.value = '';
    }

    else {

        for (let input of allInputs) {
            input.classList.add('reddened');
        }
    }

    let totalPrice = accumalator.reduce((acc, val) => acc + val);


    if (accumalator !== []) {
        total.innerText = `$${totalPrice.toFixed(2)}`;
    } else {
        total.innerText = `0.00`;
    }
}