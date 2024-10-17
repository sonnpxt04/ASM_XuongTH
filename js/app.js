"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        return yield response.json();
    });
}
function displayProducts(products) {
    const productContainer = document.querySelector("#products .row"); // Sử dụng querySelector để lấy đúng hàng sản phẩm
    if (productContainer) {
        products.forEach(product => {
            if (product.isVisible) {
                const productElement = document.createElement("div");
                productElement.className = "col mb-5"; // Thêm class col vào đây
                productElement.innerHTML = `
                    <div class="card h-100">
                        <!-- Hình ảnh sản phẩm -->
                        <a>
                            <img class="card-img-top" src="/images/${product.image}" alt="${product.name}" />
                        </a>
                        <!-- Chi tiết sản phẩm -->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Tên sản phẩm -->
                                <h5 class="fw-bolder">${product.name}</h5>
                                <!-- Giá sản phẩm -->
                                ${product.price}
                            </div>
                        </div>
                        <!-- Hành động sản phẩm -->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center">
                                <a class="btn btn-outline-dark mt-auto">Thêm vào giỏ hàng</a>
                            </div>
                        </div>
                    </div>
                `;
                productContainer.appendChild(productElement); // Thêm sản phẩm vào hàng sản phẩm
            }
        });
    }
}
function displayBrands(brands) {
    const brandContainer = document.querySelector("#brands .container");
    if (brandContainer) {
        brands.forEach(brand => {
            if (brand.isVisible) {
                const brandElement = document.createElement("div");
                brandElement.className = "item"; // Thêm class item
                brandElement.innerHTML = `
                    <img class="imgbrand" src="/images/${brand.image}" alt="${brand.name}">
                `;
                brandContainer.appendChild(brandElement);
            }
        });
    }
}
function displayPosts(posts) {
    const postContainer = document.getElementById("posts");
    if (postContainer) {
        posts.forEach(post => {
            if (post.isVisible) {
                const postElement = document.createElement("div");
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <img src="${post.image}" alt="${post.title}" />
                `;
                postContainer.appendChild(postElement);
            }
        });
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield fetchData("http://localhost:3000/categories");
        const products = yield fetchData("http://localhost:3000/products");
        const brands = yield fetchData("http://localhost:3000/brands");
        const posts = yield fetchData("http://localhost:3000/posts");
        // displayCategories(categories);
        displayProducts(products);
        displayBrands(brands);
        displayPosts(posts);
    });
}
main().catch(err => console.error(err));
