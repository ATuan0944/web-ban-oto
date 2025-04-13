// const banner = document.querySelector('header');
// const nav = document.querySelector('.row-menu');

// window.addEventListener('scroll', () => {
//     const bannerHeight = banner.offsetHeight; // Chiều cao banner
//     const scrollY = window.scrollY; // Vị trí cuộn hiện tại

//     if (scrollY > bannerHeight) {
//         nav.classList.add('show'); // Hiện nav khi cuộn qua banner
//     } else {
//         nav.classList.remove('show'); // Ẩn nav nếu quay lại banner
//     }
// });

let cart = []; // Lưu danh sách sản phẩm trong giỏ hàng
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (product) {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1; // Tăng số lượng nếu đã tồn tại
        } else {
            cart.push({ ...product, quantity: 1 }); // Thêm sản phẩm mới
        }
        alert(`${product.name} đã được thêm vào giỏ hàng!`);
    }
    renderCart(); // Cập nhật hiển thị giỏ hàng
}
function renderCart() {
    const cartTable = document.querySelector("section table");
    const cartTableBody = cartTable.querySelector("tbody") || cartTable.createTBody();

    cartTableBody.innerHTML = ""; // Xóa nội dung cũ

    if (cart.length === 0) {
        cartTableBody.innerHTML = `<tr><td colspan="5">Giỏ hàng trống.</td></tr>`;
        return;
    }

    cart.forEach((item, index) => {
        const total = item.price * item.quantity;
        const rowHTML = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.price.toLocaleString()} $</td>
                <td>${total.toLocaleString()} $</td>
            </tr>
        `;
        cartTableBody.innerHTML += rowHTML;
    });

    // Hiển thị tổng giá trị giỏ hàng
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalRow = `
        <tr>
            <td colspan="4" style="text-align: right;"><strong>Tổng giá:</strong></td>
            <td>${totalPrice.toLocaleString()} $</td>
        </tr>
    `;
    cartTableBody.innerHTML += totalRow;
}

