window.onload = async function () {
    const response = await fetch('/api/products');
    const products = await response.json();

    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product._id}</td>
            <td>${product.nombre}</td>
            <td>${product.descripcion}</td>
            <td>${product.precio}</td>
            <td>${product.stock}</td>
            <td>${product.categoria}</td>
            <td>
                <form action="/delete-product/${product._id}" method="POST">
                    <button type="submit">Eliminar</button>
                </form>
            </td>
        `;

        productList.appendChild(row);
    });
}
