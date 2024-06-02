import { cartStore } from "./Store";
import { renderCart } from "./renderCart";



const headerCartBtn = document.querySelector('.header__cart-btn')
const cartClose = document.querySelector('.cart__close');
const cart = document.querySelector('.cart');
const cartPriceTotal = document.querySelector('.cart__price--total');

const toggleCart = () => {
 
    cart.classList.toggle('cart_open');

    if(cart.classList.contains('cart_open') && window.innerWidth > 1360){
        cart.scrollIntoView({ behavior: 'smooth'});
    }
}

export const initCart =  async () => {

await cartStore.init();


headerCartBtn.textContent = cartStore.getCart().length;

renderCart();
cartStore.subscribe(() => {
    const cart = cartStore.getCart();
    headerCartBtn.textContent = cart.length;
    const totalPriceValue = cart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      );
      cartPriceTotal.innerHTML = `${totalPriceValue}&nbsp;ten`;
});

headerCartBtn.addEventListener("click", toggleCart);

cartClose.addEventListener("click", () => {
 cart.classList.remove('cart_open');
});

}



