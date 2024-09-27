import { setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
    const htmDiscounted = product.FinalPrice < product.SuggestedRetailPrice ? `<span class="product-card__discounted">$${product.SuggestedRetailPrice}</span>` : ""
  return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>
        <h2 class="divider">Ajax Tent - 3-Person, 3-Season</h2>
        <img
          class="divider"
          src="${product.Image}"
          alt="${product.NameWithoutBrand}"
        />
        <p class="product-card__price">$${product.FinalPrice}${htmDiscounted}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  async addToCart(detail) {
    const product = await this.dataSource.findProductById(
      detail.srcElement.dataset.id,
    );
    let insideCart = JSON.parse(localStorage.getItem("so-cart")) || [];

    if (!Array.isArray(insideCart)) {
      insideCart = [insideCart];
    }

    insideCart.push(product);
    setLocalStorage("so-cart", insideCart);
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    const template = productDetailsTemplate(this.product);
    element.insertAdjacentHTML("afterBegin", template);
  }
}
