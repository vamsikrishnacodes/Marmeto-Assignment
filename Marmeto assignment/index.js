function productsList(category) {
    //console.log(category)

    // Hide all product cards
    document.getElementById('Men').style.display = 'none';
    document.getElementById('Women').style.display = 'none';
    document.getElementById('Kids').style.display = 'none';

    // Show the selected category product cards
    document.getElementById(category).style.display = 'flex';
    if (category === "Men") {
        document.getElementById("men").classList.add("active-tab");
        document.getElementById("women").classList.remove("active-tab");
        document.getElementById("kids").classList.remove("active-tab");
    } else if (category === "Women") {
        document.getElementById("women").classList.add("active-tab");
        document.getElementById("men").classList.remove("active-tab");
        document.getElementById("kids").classList.remove("active-tab");
    } else {
        document.getElementById("kids").classList.add("active-tab");
        document.getElementById("women").classList.remove("active-tab");
        document.getElementById("men").classList.remove("active-tab");
    }

}
function createProductCard(containerId, product) {
    const container = document.getElementById(containerId);

    let ulElement = document.createElement("ul");
    ulElement.classList.add("list-container");
    container.appendChild(ulElement);

    for (let i of product) {
        const listEl = document.createElement("li");
        listEl.classList.add("list-item");

        const imageEl = document.createElement("div");
        let urlImage = i.image;
        imageEl.style.backgroundImage = `url('${urlImage}')`;
        imageEl.classList.add("image-container");
        listEl.appendChild(imageEl);

        const badge = document.createElement('p');
        badge.classList.add('badge');
        badge.textContent = i.badge_text;
        if (i.badge_text === null) {
            badge.classList.remove("badge");
        }
        imageEl.appendChild(badge);


        const divEl = document.createElement("div");
        divEl.classList.add("title-vendor-container");
        listEl.appendChild(divEl);

        const title = document.createElement('h1');
        title.classList.add("title");
        title.textContent = i.title;
        divEl.appendChild(title);

        const vendor = document.createElement('span');
        vendor.textContent = ". " + i.vendor;
        divEl.appendChild(vendor);

        const divEle = document.createElement("div");
        divEle.classList.add("discount-price-container");
        listEl.appendChild(divEle);


        const price = document.createElement('p');
        price.classList.add("price");
        price.textContent = "Rs " + i.price + ".00";
        divEle.appendChild(price);

        const comparePrice = document.createElement('p');
        comparePrice.classList.add("comparePrice");
        comparePrice.textContent = i.compare_at_price + ".00";
        divEle.appendChild(comparePrice);

        const discount = document.createElement('p');
        const discountPercentage = ((i.compare_at_price - i.price) / i.compare_at_price) * 100;
        discount.classList.add("discount");
        discount.textContent = `${discountPercentage.toFixed(2)}% Off`;
        divEle.appendChild(discount);

        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        listEl.appendChild(button);
        ulElement.appendChild(listEl);
    }
}

// Fetch products from API (replace with actual API call)
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
        const {
            categories
        } = data;

        for (let each of categories) {

            const containerId = each.category_name;
            const product = each.category_products;
            //console.log(containerId, product)
            createProductCard(containerId, product);
        }

    })
    .catch(error => {
        console.error('Error fetching data from the API:', error);
    });
