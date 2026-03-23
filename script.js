const API_BASE = CONFIG.API_BASE_URL;

async function loadProducts() {
    const response = await fetch(API_BASE + "/products");
    const products = await response.json();

    const list = document.getElementById("products");
    list.innerHTML = "";

    products.forEach(p => {
        const item = document.createElement("li");
        item.innerHTML =
            p.sku + " - €" + p.price +
            ' <button onclick="createOrder(\'' + p.sku + '\')">Order</button>';
        list.appendChild(item);
    });
}

async function createOrder(sku) {
    const response = await fetch(API_BASE + "/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sku: sku,
            quantity: 1
        })
    });

    const result = await response.json();
    alert("Order submitted. Order ID: " + result.orderId);
}