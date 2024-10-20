interface Category {
    id: number;
    name: string;
    description: string;
    isVisible: boolean;
    views: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    brandId: number;
    categoryId: number;
    description: string;
    image: string;
    quantity: number;
    isVisible: boolean;
    views: number;
}

interface Brand {
    id: number;
    name: string;
    country: string;
    image: string;
    isVisible: boolean;
}

interface Post {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    typeId: number;
    isVisible: boolean;
    views: number;
    image: string;
}
async function fetchData<T>(url: string): Promise<T[]> {
    const response = await fetch(url);
    return await response.json();
}

function displayProducts(products: Product[]): void {
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
                                <p >   ${(product.price).toLocaleString('vi')} đ</p>
                            </div>
                        </div>
                        <!-- Hành động sản phẩm -->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center">
                                <a class="btn btn-outline-dark mt-auto">Xem chi tiết</a>
                            </div>
                        </div>
                    </div>
                `;
                productContainer.appendChild(productElement); // Thêm sản phẩm vào hàng sản phẩm
            }
        });
    }
}
function displayHotProducts(products: Product[]): void {
    const hotProductContainer = document.querySelector("#productsHot .row");
    
    // Lọc và sắp xếp các sản phẩm có lượt view cao nhất
    const topViewedProducts = products
        .filter(product => product.isVisible) // Lọc sản phẩm hiển thị
        .sort((a, b) => b.views - a.views) // Sắp xếp theo lượt view giảm dần
        .slice(0, 8); // Lấy 8 sản phẩm đầu tiên

    if (hotProductContainer) {
        hotProductContainer.innerHTML = ''; // Xóa nội dung cũ
        topViewedProducts.forEach(product => {
            const productElement = document.createElement("div");
            productElement.className = "col mb-5";
            productElement.innerHTML = `
                <div class="card h-100">
                    <a>
                        <img class="card-img-top" src="/images/${product.image}" alt="${product.name}" />
                    </a>
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder ">${product.name}</h5>
                            <p >   ${(product.price).toLocaleString('vi')} đ</p>
                            <p>Lượt xem ${product.views}</p>
                    
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                            <a class="btn btn-outline-dark mt-auto">Xem chi tiết</a>
                        </div>
                    </div>
                </div>
            `;
            hotProductContainer.appendChild(productElement); // Thêm sản phẩm vào hàng sản phẩm hot
        });
    }
}


function displayBrands(brands: Brand[]): void {
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


function displayPosts(posts: Post[]): void {
    const postContainer = document.querySelector("#posts .row");
    if (postContainer) {
        posts.forEach(post => {
            if (post.isVisible) {
                const postElement = document.createElement("div");
                postElement.className = "col mb-5";
                postElement.innerHTML = `


                <div class="card h-100">
                <!-- Hình ảnh sản phẩm -->
                <a>
                    <img class="card-img-top" src="/images/${post.image}" alt="${post.title}" />
                </a>
                <!-- Chi tiết sản phẩm -->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Tên sản phẩm -->
                        <h5 class="fw-bolder">${post.title}</h5>
                        <!-- Giá sản phẩm -->
                        ${post.content}
                    </div>
                </div>
                <!-- Hành động sản phẩm -->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <a class="btn btn-outline-dark mt-auto">${post.views} Lượt xem</a>
                    </div>
                </div>
            </div>
                  
                `;
                postContainer.appendChild(postElement);
            }
        });
    }
}
async function main() {
    const categories = await fetchData<Category>("http://localhost:3000/categories");
    const products = await fetchData<Product>("http://localhost:3000/products");
    const brands = await fetchData<Brand>("http://localhost:3000/brands");
    const posts = await fetchData<Post>("http://localhost:3000/posts");

    // displayCategories(categories);
    displayProducts(products);
    displayBrands(brands);
    displayPosts(posts);
    displayHotProducts(products); 
}

main().catch(err => console.error(err));