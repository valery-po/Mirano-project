import { fetchProducts } from "./API";
import { debounce } from "./debounce";
import { callBackWidthPreload } from "./preload";



export const filterProducts = () => {

    const filterForm = document.querySelector('.filter__form');
    const goodsTitle = document.querySelector('.goods__title');
    const goodsSection = document.querySelector('.goods');


    const applyFilters = (category) => {
        const formData = new FormData(filterForm);
        const type = formData.get('type');
        const minPrice = formData.get('minPrice');
        const maxPrice = formData.get('maxPrice');
        const params = {};
        if(type) params.type = type;
        if(minPrice) params.minPrice = minPrice;
        if(maxPrice) params.maxPrice = maxPrice;
        if(category) params.category = category;
        callBackWidthPreload(goodsSection, fetchProducts, params);
        
    }
        
    applyFilters();

    const applyPriceFilters = debounce(applyFilters, 300);
    
    
    filterForm.addEventListener("input", (event) => {
        const target = event.target;
        if(target.name === 'minPrice' || target.name === 'maxPrice') {
            applyPriceFilters();
        }
       
        if(target.name === 'type') {
            goodsTitle.textContent = target.labels[0].textContent;
            filterForm.minPrice.value = '';
            filterForm.maxPrice.value = '';
            applyFilters();
            return;
        }

        
    });

    filterForm.addEventListener("click", ({ target }) => {
     if(target.closest(".filter__type-btn")){
        applyFilters(target.textContent)
     }
    });
};