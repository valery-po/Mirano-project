import { ProductCard } from "./ProductCard";
import { productStore } from "./Store";

export const renderProducts = async () => {
    const goodsList = document.querySelector('.goods__list');
    const updateList = () => {
        const products = productStore.getProducts();
        goodsList.innerHTML = '';

        if(!products.length) {
           const messageItem =  document.createElement('li');
           messageItem.textContent = 'К сожалению по вашему запросу ничего не найдено!';
           messageItem.classList.add('goods__no-product');
           goodsList.append(messageItem);
           return;

        } else {
            products.forEach(product => {
    
                const productCard = ProductCard(product);
                goodsList.append(productCard);
        
            });
        }

        
    };
    productStore.subscribe(updateList);
    updateList();
};