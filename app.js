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
        return `
        <div class="container">
            <div class="row">
                <div class="list-desc col-sm"><span class="p-3 mb-2 bg-dark text-white">Item</span>${this.productName()}</div>
                <div class="list-desc col-sm"><span class="p-3 mb-2 bg-primary text-white">Quantity</span>${this.amount()}</div>
                <div class="list-desc col-sm"><span class="p-3 mb-2 bg-danger text-white">Price</span>${this.cost()}</div>
            </div>
        </div>`;
    }
}

// list div: list-parent
const list = document.querySelector('.list-parent');
// button: add-item
const enterItemButton = document.querySelector('#add-item');
// product: product-name
const product = document.querySelector('#product-name');
// quantity: quantity-of-items
const quantity = document.querySelector('#quantity-of-items');
// price: item-price
const price = document.querySelector('#item-price');

// total: display-total
const total = document.querySelector('#display-total');

// item accumalator
let accumalator = [];

// enter item on click
enterItemButton.addEventListener('click', () => {
    enterProduct();
});

function enterProduct() {
    let productValue = product.value;
    let quantityValue = Number(quantity.value);
    let priceValue = Number(price.value);

    // if price or quantity are not numbers
    if (isNaN(quantityValue) || isNaN(priceValue)) {
        alert('Only numerical values please!');
        quantity.value = '', price.value = '';
        quantity.classList.add('reddened');
        price.classList.add('reddened');
        return;
    }
    // if everything is good
    else if (product.value && quantity.value && price.value) {
        product.classList.remove('reddened');
        quantity.classList.remove('reddened');
        price.classList.remove('reddened');
        // push into accumalator
        accumalator.push(Number(price.value) * Math.round((Number(quantity.value))));
        // new product
        let newProduct = new Product(productValue, quantityValue, priceValue);
        // create a li node
        let newLi = document.createElement('li');
        newLi.classList.add('list-group-item');
        newLi.innerHTML = newProduct.addItem();
        //append it
        list.append(newLi);
        product.value = '', quantity.value = '', price.value = '';
    }
    // if no input at all
    else {
        product.classList.add('reddened');
        quantity.classList.add('reddened');
        price.classList.add('reddened');
    }

    let totalPrice = accumalator.reduce((acc, val) => acc + val);

    // add all items
    if (accumalator !== []) {
        total.innerText = `$${totalPrice.toFixed(2)}`;
    } else {
        total.innerText = `0.00`;
    }
}