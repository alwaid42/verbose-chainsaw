import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { capitalize, getParam, loadHeaderFooter, qs } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const title = qs(".title");
title.textContent = capitalize(category);
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);
myList.init();
