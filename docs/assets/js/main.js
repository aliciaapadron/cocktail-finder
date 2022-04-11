"use strict";const listFavoriteCoctails=document.querySelector(".js_listFavoriteCoctails"),listCoctails=document.querySelector(".js_listCoctails"),searchInputTitle=document.querySelector(".js_inputCoctail"),buttonSearch=document.querySelector(".js_btnSearch"),buttonReset=document.querySelector(".js_btnReset"),buttonResetFav=document.querySelector(".js-button_reset_fav"),defaultImage="https://via.placeholder.com/210x295/ffffff/666666/?text=coctail%20img";let data=[],dataFav=[];function fetchItems(){fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+searchInputTitle.value).then(t=>t.json()).then(t=>{data=t.drinks,renderAllItems()})}function renderAllItems(){if(listCoctails.innerHTML="",null!==data){for(const t of data)renderItem(t);const t=document.querySelectorAll(".js-list");for(const e of t)e.addEventListener("click",handleCoctailFav)}else listCoctails.innerHTML="Cóctel no encontrado"}function renderItem(t){let e=t.strDrinkThumb;null===t.strDrinkThumb&&(e=defaultImage);const a=document.createElement("li");a.classList.add("js-list"),a.classList.add("generalcoctails__list--item"),a.dataset.name=t.strDrink,a.dataset.img=e;let l=`<img class="js-image generalcoctails__list--img" src="${e}" alt="${t.strDrink}">`;l+=`<h3 class="generalcoctails__list--title js-card__title">${t.strDrink}</h3>`,a.innerHTML=l;void 0!==dataFav.find(e=>e.name===t.strDrink)&&a.classList.add("js-fav"),listCoctails.appendChild(a)}function renderAllItemsFav(){listFavoriteCoctails.innerHTML="";for(const t of dataFav)renderItemFav(t);const t=document.querySelectorAll(".js-favItem");for(const e of t)e.addEventListener("click",handleBoton)}function renderItemFav(t){const e=document.createElement("li");let a=t.img;null===t.img&&(a=defaultImage),e.classList.add("js-favItem"),e.dataset.name=t.name,e.dataset.img=a;let l=`<i class="fa-solid fa-circle-xmark"></i><img class="js-image generalcoctails__list--img" src="${a}" alt="" placeholder="">`;l+=`<h3 class="generalcoctails__list--title js-card__title">${t.name}</h3>`,e.innerHTML=l,listFavoriteCoctails.appendChild(e)}function handleBoton(t){let e=dataFav.filter(e=>e.name!==t.currentTarget.dataset.name);dataFav=e,renderAllItemsFav(),renderAllItems(),setInLocalStorage()}function handleCoctailTitle(t){t.preventDefault(),fetchItems()}function handleCoctailFav(t){void 0===dataFav.find(e=>e.name===t.currentTarget.dataset.name)?(dataFav.push(t.currentTarget.dataset),t.currentTarget.classList.add("list-coctail-favorite"),setInLocalStorage(),renderAllItemsFav()):alert("El cóctel seleccionado ya está en la lista de favoritos")}function handleClickResetAllFav(){dataFav=[],localStorage.clear(),renderAllItemsFav()}function handleClickResetAllList(){data=[],localStorage.clear(),renderAllItems()}function handleClickResetAll(){searchInputTitle.value="",handleClickResetAllFav(),handleClickResetAllList()}function setInLocalStorage(){localStorage.setItem("dataLocalStorageFav",JSON.stringify(dataFav))}function getFromLocalStorage(){const t=localStorage.getItem("dataLocalStorageFav");null===t?dataFav=[]:(dataFav=JSON.parse(t),renderAllItemsFav())}getFromLocalStorage(),buttonSearch.addEventListener("click",handleCoctailTitle),buttonResetFav.addEventListener("click",handleClickResetAllFav),buttonReset.addEventListener("click",handleClickResetAll);