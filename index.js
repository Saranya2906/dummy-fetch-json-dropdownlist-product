document.addEventListener('DOMContentLoaded', function() {
    fetch('https://dummyjson.com/products') // Update the API endpoint for products
        .then(res => res.json())
        .then(data => {
            Dropdown(data.products);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
});

function Dropdown(products) {
    const dropdown = document.getElementById('product-dropdown');

    products.forEach(product => {
        let option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.title;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', function() {
        const selectedId = this.value;
        DisplayProduct(selectedId);
    });
}

function DisplayProduct(selectedId) {
    fetch(`https://dummyjson.com/products/${selectedId}`)
        .then(res => res.json())
        .then(data => {
            populateTable([data]);
        })
        .catch(error => {
            console.error('Error fetching product data: ', error);
        });
}

function populateTable(products) {
    const tableBody = document.getElementById('product-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    products.forEach(product => {
        let row = tableBody.insertRow();

        let Id = row.insertCell(0);
        Id.textContent = product.id;

        let Title = row.insertCell(1);
        Title.textContent = product.title;

        let Description = row.insertCell(2);
        Description.textContent = product.description;

        let Stock = row.insertCell(3);
        Stock.textContent = product.stock;

        let Category = row.insertCell(4);
        Category.textContent = product.category;

        let Ratings = row.insertCell(5);
        Ratings.textContent = product.rating;
    });
}
