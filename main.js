(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-8",headers:{authorization:"fb3eb883-7ac4-4273-84f2-c6471c46b3b2","Content-Type":"application/json"}};function t(e,t){return fetch(e,t).then(c)}var n=function(n){return t("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers})},r=function(n){return t("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers})},o=function(n){return t("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers})},c=function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))},a=document.querySelector("#card-template").content;function u(e,t){o(t).then((function(){return e.target.closest(".card").remove()})).catch((function(e){return console.log(e)}))}function i(e,t,o){(e.target.classList.contains("card__like-button_is-active")?n:r)(t).then((function(t){o.textContent=t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){return console.log(e)}))}function l(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",d)}function s(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d)}function d(e){if("Escape"===e.code){var t=document.querySelector(".popup_is-opened");t&&s(t)}}var p=function(e){var t=e.target.classList;(t.contains("popup")||t.contains("popup__close"))&&s(e.currentTarget)},f=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputError),r.textContent="",r.classList.remove(n.inputTextError)},m=function(e,t){t.disabled=function(e){return e.some((function(e){return!e.validity.valid}))}(e)};function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var _,v=document.querySelector(".places__list"),h=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_edit"),b=S.querySelector(".popup__button"),q=document.querySelector(".profile__edit-button"),g=document.querySelector('form[name="edit-profile"]'),E=g.querySelector('input[name="name"]'),C=g.querySelector('input[name="description"]'),L=document.querySelector(".popup_type_avatar"),k=L.querySelector(".popup__button"),x=document.querySelector('form[name="new-place"]'),A=x.querySelector('input[name="place-name"]'),T=x.querySelector('input[name="link"]'),U=document.querySelector(".popup_type_image").querySelector(".popup__caption"),w=document.querySelector(".profile__title"),j=document.querySelector(".profile__description"),I=document.querySelector(".profile__add-button"),O=h.querySelector(".popup__button"),D=document.querySelector(".popup_type_image"),P=document.querySelector(".popup__image"),M=document.querySelector(".profile__image"),N=M.style,B=document.querySelector('form[name="edit-avatar"]'),J=B.querySelector('input[name="link"]'),F=(document.querySelectorAll(".popup__close"),{myForm:".popup__form",popupInput:".popup__input",popupButton:".popup__button",inputError:"popup__input-error",inputTextError:"popup__input-error-text-active"});function G(e,t){var n=function(e,t,n,r,o){var c=a.querySelector(".places__item").cloneNode(!0),u=c.querySelector(".card__delete-button"),i=c.querySelector(".card__like-button");e.likes.some((function(e){return e._id===o}))&&i.classList.add("card__like-button_is-active"),c.querySelector(".card__title").textContent=e.name;var l=c.querySelector(".card__image");l.src=e.link,l.alt=e.name;var s=c.querySelector(".card__like-container");return s.textContent=e.likes.length,e.owner._id===o?u.addEventListener("click",(function(n){t(n,e._id)})):u.classList.add("card__delete-button-hide"),i.addEventListener("click",(function(t){n(t,e._id,s)})),l.addEventListener("click",r),c}(e,u,i,H,t);v.prepend(n)}function H(e){var t=e.target.closest(".places__item").querySelector(".card__image");P.src=t.src,P.alt=t.alt,U.textContent=e.target.alt,l(D)}Promise.all([t("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}),t("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers})]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];_=o._id;var a=o.avatar;w.textContent=o.name,j.textContent=o.about,N.backgroundImage="url('".concat(a,"')"),c.reverse().forEach((function(e){G(e,_)}))})).catch((function(e){console.log(e)})),I.addEventListener("click",(function(){return l(h)})),q.addEventListener("click",(function(){l(S),E.value=w.textContent,C.value=j.textContent,function(e,t){var n=Array.from(e.querySelectorAll(t.popupInput)),r=e.querySelector(t.popupButton);n.forEach((function(n){f(e,n,t)})),m(n,r)}(S,F)})),Array.from(document.querySelectorAll(".popup")).forEach((function(e){e.addEventListener("mouseup",p)})),M.addEventListener("click",(function(){return l(L)})),B.addEventListener("submit",(function(n){var r;n.preventDefault(),k.textContent="Сохранение...",(r=J.value,t("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})})).then((function(e){N.backgroundImage="url('".concat(e.avatar,"')"),B.reset(),s(L)})).catch((function(e){console.log(e)})).finally((function(){k.textContent="Cохранить"}))})),g.addEventListener("submit",(function(n){var r,o;n.preventDefault(),b.textContent="Сохранение...",(r=E.value,o=C.value,t("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})})).then((function(){w.textContent=E.value,j.textContent=C.value,s(S)})).catch((function(e){console.log(e)})).finally((function(){b.textContent="Cохранить"}))})),x.addEventListener("submit",(function(n){var r,o;n.preventDefault(),O.textContent="Сохранение...",(r=A.value,o=T.value,t("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r,link:o})})).then((function(e){G(e,_),x.reset(),s(h)})).catch((function(e){console.log(e)})).finally((function(){O.textContent="Cохранить"}))})),function(e){Array.from(document.querySelectorAll(e.myForm)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.popupInput)),r=e.querySelector(t.popupButton);m(n,r),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?f(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputError),o.textContent=n,o.classList.add(r.inputTextError)}(e,t,t.validationMessage,n)}(e,o,t),m(n,r)}))}))}(t,e)}))}(F)})();