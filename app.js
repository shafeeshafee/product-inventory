class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
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
        return quantity;
    }
    addItem() {
        return `
        <div class="container">
            <div class="row">
                <div class="list-desc col-sm"><span class="p-3 mb-2 bg-dark text-white">Item</span>${this.productName()}</div>
                <div class="list-desc col-sm"><span class="p-3 mb-2 bg-danger text-white">Price</span>${this.cost()}</div>
                <div class="list-desc col-sm"><span class="p-3 mb-2 bg-primary text-white">Quantity</span>${this.amount()}</div>
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
    if (product.value && quantity.value && price.value) {
        let productValue = product.value;
        let quantityValue = parseInt(quantity.value);
        let priceValue = parseInt(price.value);
        // push into accumalator
        accumalator.push(Number(price.value));
        // new product
        let newProduct = new Product(productValue, quantityValue, priceValue);
        // create a li node
        let newLi = document.createElement('li');
        newLi.classList.add('list-group-item');
        newLi.innerHTML = newProduct.addItem();
        //append it
        list.append(newLi);
    } else {
        alert('Enter all product input fields');
    }
    product.value = '', quantity.value = '', price.value = '';

    let totalPrice = accumalator.reduce((acc, val) => acc + val);

    total.innerText = `$${totalPrice.toFixed(2)}`;
});
