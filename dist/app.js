/*! For license information please see app.js.LICENSE.txt */
!function(e){function a(a){for(var r,s,c=a[0],i=a[1],d=a[2],u=0,m=[];u<c.length;u++)s=c[u],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&m.push(n[s][0]),n[s]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(l&&l(a);m.length;)m.shift()();return o.push.apply(o,d||[]),t()}function t(){for(var e,a=0;a<o.length;a++){for(var t=o[a],r=!0,c=1;c<t.length;c++){var i=t[c];0!==n[i]&&(r=!1)}r&&(o.splice(a--,1),e=s(s.s=t[0]))}return e}var r={},n={app:0},o=[];function s(a){if(r[a])return r[a].exports;var t=r[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=e,s.c=r,s.d=function(e,a,t){s.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,a){if(1&a&&(e=s(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var r in e)s.d(t,r,function(a){return e[a]}.bind(null,r));return t},s.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(a,"a",a),a},s.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},s.p="";var c=window.webpackJsonp=window.webpackJsonp||[],i=c.push.bind(c);c.push=a,c=c.slice();for(var d=0;d<c.length;d++)a(c[d]);var l=i;o.push([5,"vendors"]),t()}({"./src/js/app/App.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-router-dom/esm/react-router-dom.js"),s=t("./node_modules/react-router-last-location/dist/index.js"),c=t("./node_modules/react-redux/es/index.js"),i=t("./src/js/app/components/Login/index.jsx"),d=t("./src/js/app/components/Home.jsx"),l=t("./src/js/app/components/Creator/index.jsx"),u=t("./src/js/app/components/Orders/index.jsx"),m=t("./src/js/app/components/common/NavigatePages/index.jsx");a.default=Object(o.withRouter)(e=>{const a=Object(c.useSelector)(e=>e.auth.auth);return n.a.createElement("div",{className:"content"},a&&n.a.createElement(m.default,null),n.a.createElement(s.LastLocationProvider,{watchOnlyPathname:!0},n.a.createElement(o.Switch,null,n.a.createElement(o.Route,{exact:!0,path:"/admin",render:()=>n.a.createElement(d.default,null)}),n.a.createElement(o.Route,{path:"/admin/creator/:nameMenu?",render:()=>n.a.createElement(l.default,null)}),n.a.createElement(o.Route,{path:"/admin/orders",render:()=>n.a.createElement(u.default,null)}),n.a.createElement(o.Route,{path:"/admin/login",render:()=>n.a.createElement(i.default,null)}),n.a.createElement(o.Route,{render:()=>n.a.createElement(d.default,null)}))))})},"./src/js/app/api/api.js":function(e,a,t){"use strict";t.r(a),t.d(a,"authAPI",(function(){return o})),t.d(a,"appAPI",(function(){return s}));var r=t("./src/js/app/api/instance.js");function n(e={}){return{...e,Authorization:`Bearer ${localStorage.getItem("token")}`}}const o={login:async(e,a)=>await r.default.post("/v1/login",{login:e,password:a}),getAuth:async e=>await r.default.post("/v1/auth",{token:e})},s={addNewGroup:async(e,a)=>await r.default.post("/v1/group/create",{categoryId:e,name:a},{headers:n()}),renameGroup:async(e,a)=>r.default.post("/v1/group/update",{id:e,name:a},{headers:n()}),deleteGroup:async e=>await r.default.delete("/v1/group/delete",{headers:n(),data:{id:e}}),getAllGroups:async()=>await r.default.get("/v1/categories",{headers:n()}),getGroups:async e=>await r.default.post("/v1/category",{id:e},{headers:n()}),getGroup:async e=>await r.default.post("/v1/group",{id:e},{headers:n()}),async saveItem(e,a,t){const o=new FormData,s=t?"/v1/item/create":"/v1/item/update";return o.append("file",a),o.append("properties",new Blob([JSON.stringify(e)],{type:"application/json"})),await r.default.post(s,o,{headers:n(),"Content-Type":void 0})},deleteItem:async e=>await r.default.delete("/v1/item/delete",{headers:n(),data:{id:e}})}},"./src/js/app/api/instance.js":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/axios/index.js");const n=t.n(r).a.create({baseURL:"/api",withCredentials:!1});a.default=n},"./src/js/app/common/categoriesName.js":function(e,a,t){"use strict";t.r(a),t.d(a,"idsCategoryByName",(function(){return r})),t.d(a,"namesCategoryById",(function(){return n})),t.d(a,"nameMenu",(function(){return o}));const r=new Map([["rolls",1],["sets",2],["rolls_hot",3],["salad",4],["hot_meat",5],["sup",6],["fastfood",7],["beverages",8],["desert",9],["child",10],["pizza",11]]),n=new Map([[1,"rolls"],[2,"sets"],[3,"rolls_hot"],[4,"salad"],[5,"hot_meat"],[6,"sup"],[7,"fastfood"],[8,"beverages"],[9,"desert"],[10,"child"],[11,"pizza"]]),o=new Map([["rolls","Суши и роллы"],["sets","Сеты"],["rolls_hot","Горячие роллы"],["salad","Салаты"],["hot_meat","Горячие блюда"],["sup","Супы"],["fastfood","Фаст-фуд"],["child","Детское меню"],["beverages","Напитки"],["desert","Десерты"],["pizza","Пицца"]])},"./src/js/app/common/item.js":function(e,a,t){"use strict";function r(e,a=0,t="/img/logo.png",r="",n="",o="",s="",c={hit:!1,new:!1},i=[{name:"scorched",price:"",weight:""},{name:"hot",price:"",weight:""},{name:"big",price:"",weight:""}]){return{groupId:e,id:a,img:t,name:r,structure:n,options:i,labels:c,weight:o,price:s}}t.r(a),t.d(a,"item",(function(){return r}))},"./src/js/app/common/makeObjectFromArray.js":function(e,a,t){"use strict";function r(e,a=!1){return e.reduce((e,t)=>({...e,[t.id]:{...t,goods:!a&&t.goods.map(e=>{const a=[...e.options];return a.sort((function(e,a){return e.name>a.name?-1:e.name<a.name?1:0})),{...e,options:a}})}}),{})}t.r(a),t.d(a,"makeObjectFromArray",(function(){return r}))},"./src/js/app/common/sortOptionInItem.js":function(e,a,t){"use strict";t.r(a),a.default=function(e){return{...e,options:e.options.sort((function(e,a){return e.name>a.name?-1:e.name<a.name?1:0}))}}},"./src/js/app/components/Creator/ItemCard/index.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./src/js/app/common/item.js"),s=t("./node_modules/react-redux/es/index.js"),c=t("./src/js/app/redux/app-reducer.js");a.default=Object(s.connect)(null,{saveItem:c.saveItem,deleteItem:c.deleteItem})(({idCategory:e,idGroup:a,idItem:t,img:s="",name:c="",structure:i="",options:d=[],labels:l={},weight:u="",price:m="",saveItem:p,deleteItem:g})=>{const j=t||Math.floor(Math.random()*new Date),y=n.a.createRef(),[_,h]=Object(r.useState)(0===t),[f,b]=Object(r.useState)(s),[v,C]=Object(r.useState)(null),[w,E]=Object(r.useState)(c),[x,N]=Object(r.useState)(i),[O,k]=Object(r.useState)(u),[I,G]=Object(r.useState)(m),[A,S]=Object(r.useState)(d[0]?d[0].price:""),[L,P]=Object(r.useState)(d[0]?d[0].weight:""),[B,M]=Object(r.useState)(d[1]?d[1].price:""),[R,T]=Object(r.useState)(d[1]?d[1].weight:""),[z,F]=Object(r.useState)(d[2]?d[2].price:""),[D,$]=Object(r.useState)(d[2]?d[2].weight:""),H=Object(r.useCallback)(()=>{const r=!!t.toString().match(/new/);h(!1),p(Object(o.item)(a,r?0:t,"",w,x,O,I,{hit:!1,new:!1},[{name:"scorched",price:A,weight:L},{name:"hot",price:B,weight:R},{name:"big",price:z,weight:D}]),v,r,e),r&&g(e,a,t,!0)},[e,a,t,w,x,O,I,z,D,B,R,A,L,v]),J=Object(r.useCallback)(()=>{g(e,a,t,!!t.toString().match(/new/))},[e,a,t]),U=Object(r.useCallback)(e=>{h(!0)}),X=Object(r.useCallback)(()=>{const e=y.current.files[0];if(!e.type.match("image.*"))return!1;C(e);const a=new FileReader;a.onload=function(e){b(e.target.result)},a.readAsDataURL(e),h(!0)}),q=Object(r.useCallback)(e=>{const a=e.target.name,t=e.target.value;switch(a){case"name":E(t);break;case"structure":N(t);break;case"weight":k(t);break;case"price":G(t);break;case"scorched-price":S(t);break;case"scorched-weight":P(t);break;case"hot-price":M(t);break;case"hot-weight":T(t);break;case"big-price":F(t);break;case"big-weight":$(t)}});return n.a.createElement("div",{className:"admin-card admin-card--margin-bottom"},n.a.createElement("div",{className:"admin-card__main admin-card--styles"},n.a.createElement("div",{className:"admin-card__wrapper"},n.a.createElement("span",{className:"admin-card__wrapper-id"},"id: ",t),n.a.createElement("button",{className:"admin-card__wrapper-close",onClick:J},n.a.createElement("i",null),n.a.createElement("i",null)),n.a.createElement("div",{className:"admin-card__wrapper-inner"},n.a.createElement("div",{className:"admin-card__img",style:{backgroundImage:`url("${f}")`}},n.a.createElement("label",{htmlFor:`${j}`,className:"admin-card__img-label"}),n.a.createElement("input",{type:"file",id:`${j}`,ref:y,accept:"image/*",className:"admin-card__img-input",onChange:X})),n.a.createElement("textarea",{name:"name",className:"admin-card__name",placeholder:"Название блюда...",value:w,onChange:q,onBlur:U}),n.a.createElement("textarea",{name:"structure",className:"admin-card__structure",placeholder:"Состав блюда...",onChange:q,onBlur:U,value:x}),n.a.createElement("div",{className:"admin-card__options"},n.a.createElement("div",{className:"admin-card__option"},n.a.createElement("input",{name:"scorched-price",type:"number",placeholder:"Цена...",className:"admin-card__option-input",value:A,onChange:q,onBlur:U}),n.a.createElement("input",{name:"scorched-weight",type:"text",placeholder:"Вес...",className:"admin-card__option-input",value:L,onChange:q,onBlur:U}),n.a.createElement("p",{className:"admin-card__option-description"},"опаленный")),n.a.createElement("div",{className:"admin-card__option"},n.a.createElement("input",{name:"hot-price",type:"number",placeholder:"Цена...",className:"admin-card__option-input",value:B,onChange:q,onBlur:U}),n.a.createElement("input",{name:"hot-weight",type:"text",placeholder:"Вес...",className:"admin-card__option-input",value:R,onChange:q,onBlur:U}),n.a.createElement("p",{className:"admin-card__option-description"},"«хот»")),n.a.createElement("div",{className:"admin-card__option"},n.a.createElement("input",{name:"big-price",type:"number",placeholder:"Цена...",className:"admin-card__option-input",value:z,onChange:q,onBlur:U}),n.a.createElement("input",{name:"big-weight",type:"text",placeholder:"Вес...",className:"admin-card__option-input",value:D,onChange:q,onBlur:U}),n.a.createElement("p",{className:"admin-card__option-description"},"«биг»")))),n.a.createElement("div",{className:"admin-card__wrapper-inner"},n.a.createElement("input",{name:"weight",type:"text",className:"admin-card__weight",placeholder:"Вес...",value:O,onChange:q,onBlur:U}),n.a.createElement("span",{className:"admin-card__weight"},"гр."),n.a.createElement("input",{name:"price",type:"number",className:"admin-card__price",placeholder:"Цена...",value:I,onChange:q,onBlur:U})))),n.a.createElement("div",{className:`admin-card__save-wrapper ${_?"admin-card__save-wrapper--show":""}`},n.a.createElement("button",{className:"admin-card__save-wrapper-button",onClick:H},"Сохранить")))})},"./src/js/app/components/Creator/ItemGroup/index.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-redux/es/index.js"),s=t("./src/js/app/redux/app-reducer.js"),c=t("./src/js/app/components/Creator/ItemCard/index.jsx"),i=t("./src/js/app/components/Creator/NewItemCard/index.jsx");a.default=Object(o.connect)(null,{deleteGroup:s.deleteGroup,renameGroup:s.renameGroup})(({title:e="",id:a,idCategory:t,items:o,localItems:s,deleteGroup:d,renameGroup:l})=>{const[u,m]=Object(r.useState)(e),p=Object(r.useCallback)(e=>{m(e.target.value)}),g=Object(r.useCallback)(()=>{d(t,a)},[t,a]),j=Object(r.useCallback)(()=>{l(t,a,u)},[t,a,u]);return n.a.createElement("div",{className:"admin-item-group admin-item-group--styles"},n.a.createElement("div",{className:"admin-item-group__header"},n.a.createElement("input",{className:"admin-item-group__input",placeholder:"Название группы...",value:u,onChange:p}),n.a.createElement("button",{className:"btn btn--styles btn--stroke btn--min admin-item-group__header-btn admin-item-group__header-btn--margin-right",onClick:g},"Удалить группу"),n.a.createElement("button",{className:"btn btn--styles btn--stroke btn--min admin-item-group__header-btn",onClick:j},"Переименовать"),n.a.createElement("span",{className:"admin-item-group__id-group"},"id: ",a)),n.a.createElement("div",{className:"admin-item-group__wrapper"},o&&o.sort((e,a)=>e.id-a.id).map(e=>n.a.createElement(c.default,{key:e.id||Math.floor(Math.random()*new Date),idCategory:t,idGroup:a,idItem:e.id,img:e.img,name:e.name,structure:e.structure,options:e.options,labels:e.labels,weight:e.weight,price:e.price})),s&&s.map(e=>n.a.createElement(c.default,{key:e.id||Math.floor(Math.random()*new Date),idCategory:t,idGroup:a,idItem:e.id,img:e.img,name:e.name,structure:e.structure,options:e.options,labels:e.labels,weight:e.weight,price:e.price})),n.a.createElement(i.default,{idCategory:t,idGroup:a})))})},"./src/js/app/components/Creator/NewItemCard/index.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-redux/es/index.js"),s=t("./src/js/app/redux/app-reducer.js");a.default=Object(o.connect)(null,{addNewItem:s.addNewItem})(({idCategory:e,idGroup:a,addNewItem:t})=>{const o=Object(r.useCallback)(()=>{t(e,a)},[e,a]);return n.a.createElement("div",{className:"admin-card admin-card--styles admin-card--margin-bottom",onClick:o},n.a.createElement("div",{className:"admin-card__new"},"Добавить новый продукт"))})},"./src/js/app/components/Creator/NewItemGroup/index.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-redux/es/index.js"),s=t("./src/js/app/redux/app-reducer.js");a.default=Object(o.connect)(null,{addNewGroup:s.addNewGroup})(({idCategory:e,addNewGroup:a})=>{const[t,o]=Object(r.useState)(""),s=Object(r.useCallback)(e=>{o(e.target.value)},[]),c=Object(r.useCallback)(r=>{a(e,t),o("")},[e,t]);return n.a.createElement("div",{className:"admin-item-group admin-item-group--styles admin-item-group--align-items-center"},n.a.createElement("input",{className:"admin-item-group__input",placeholder:"Название группы...",onChange:s,value:t}),n.a.createElement("button",{className:"btn btn--styles btn--stroke btn--min admin-item-group__input-btn",onClick:c},"Добавить группу"))})},"./src/js/app/components/Creator/index.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-router-dom/esm/react-router-dom.js"),s=t("./node_modules/redux/es/redux.js"),c=t("./node_modules/react-redux/es/index.js"),i=t("./node_modules/reselect/es/index.js"),d=t("./src/js/app/hooks/useRedirectToHome.jsx"),l=t("./src/js/app/redux/app-reducer.js"),u=t("./src/js/app/common/categoriesName.js"),m=t("./src/js/app/components/common/NavigateCategory/index.jsx"),p=t("./src/js/app/components/Creator/ItemGroup/index.jsx"),g=t("./src/js/app/components/Creator/NewItemGroup/index.jsx"),j=t("./src/js/app/hooks/useRedirectToCreator.jsx");const y=Object(i.createSelector)(e=>e.app.categories,e=>e.app.currentNamePage,(e,a)=>{const t=e&&e[a],r=t&&t.groups&&Object.values(t.groups);return r&&r.sort((e,a)=>e.id-a.id)}),_=Object(i.createSelector)(e=>e.app.localCategories,e=>e.app.currentNamePage,(e,a)=>{const t=e&&e[a],r=t&&t.groups&&Object.values(t.groups);return r&&r.sort((e,a)=>e.id-a.id)});a.default=Object(s.compose)(Object(c.connect)(null,{getAllGroups:l.getAllGroups,setCurrentPage:l.setCurrentPage}),o.withRouter)(({match:e,getAllGroups:a,setCurrentPage:t})=>{const o=Object(d.default)(),s=Object(j.default)(e.params.nameMenu),[i,l]=Object(r.useState)(u.idsCategoryByName.get(e.params.nameMenu)),[h,f]=Object(r.useState)(!1),b=Object(c.useSelector)(y),v=Object(c.useSelector)(_);return Object(r.useEffect)(()=>{const a=e.params.nameMenu;document.title=`${a?`${u.nameMenu.get(a)} | `:""}Редактор меню | Админ-панель | Суши-бар "Токио"`}),Object(r.useEffect)(()=>{t(e.params.nameMenu),l(u.idsCategoryByName.get(e.params.nameMenu))},[e]),Object(r.useEffect)(()=>{h||(a(),f(!0))},[h]),o||s||n.a.createElement("div",{className:"admin-page admin-page--styles"},n.a.createElement("h1",{className:"h1"},"Редактор меню"),n.a.createElement(m.default,null),b&&b.map((e,a)=>n.a.createElement(p.default,{key:e.id,id:e.id,title:e.name,idCategory:i,items:e.goods,localItems:v&&v[a]&&v[a].goods})),n.a.createElement(g.default,{idCategory:i}))})},"./src/js/app/components/Home.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-router-dom/esm/react-router-dom.js"),s=t("./node_modules/react-redux/es/index.js"),c=t("./node_modules/react-router-last-location/dist/index.js"),i=t("./src/js/app/redux/auth-reducer.js");a.default=Object(s.connect)(null,{getAuth:i.getAuth})(({getAuth:e})=>{const a=Object(s.useSelector)(e=>e.auth.auth),t=Object(s.useSelector)(e=>e.auth.initialized),i=Object(c.useLastLocation)();return Object(r.useEffect)(()=>{e(t)},[t]),t?a?n.a.createElement(o.Redirect,{to:i?i.pathname:"/admin/creator/rolls"}):n.a.createElement(o.Redirect,{to:"/admin/login"}):n.a.createElement("p",null,"Загрузка...")})},"./src/js/app/components/Login/index.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-redux/es/index.js"),s=t("./node_modules/react-router-dom/esm/react-router-dom.js"),c=t("./src/js/app/redux/auth-reducer.js"),i=t("./src/js/app/components/common/Input/index.jsx");a.default=Object(o.connect)(null,{login:c.login})(({login:e})=>{const[a,t]=Object(r.useState)({login:"",password:""}),c=Object(o.useSelector)(e=>e.auth.auth);function d(e,r){t({...a,[e]:r})}return Object(r.useEffect)(()=>{document.title='Авторизация | Админ-панель | Суши-бар "Токио"'}),c?n.a.createElement(s.Redirect,{to:"/admin/creator"}):n.a.createElement("div",{className:"login-page"},n.a.createElement("div",{className:"login-form login-form--styles"},n.a.createElement("form",{className:"login-form__wrapper",onSubmit:function(t){t.preventDefault(),e(a.login,a.password)}},n.a.createElement(i.default,{name:"login",id:"login-form__login",type:"text",label:"Логин",onChange:d}),n.a.createElement(i.default,{name:"password",id:"login-form__password",className:"login-form__input",type:"password",label:"Пароль",onChange:d}),n.a.createElement("button",{className:"btn btn--styles btn--main login-form__btn",type:"submit"},n.a.createElement("span",null,"Войти"),n.a.createElement("img",{className:"btn__icon",src:"/img/icons/arrow.svg",alt:""})))))})},"./src/js/app/components/Orders/index.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./src/js/app/hooks/useRedirectToHome.jsx");a.default=e=>{const a=Object(o.default)();return Object(r.useEffect)(()=>{document.title='Заказы | Админ-панель | Суши-бар "Токио"'}),a||n.a.createElement("div",{className:"admin-page admin-page--styles"},n.a.createElement("h1",{className:"h1"},"Заказы"))}},"./src/js/app/components/common/Input/index.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/prop-types/index.js"),s=t.n(o);const c=({name:e="field",type:a="text",className:t="",id:o=Math.random()*new Date,label:s="",onChange:c})=>{const[i,d]=Object(r.useState)("");return n.a.createElement("div",{className:`input input--styles ${t}`},n.a.createElement("input",{name:e,type:a,id:o,className:`input__${a}`,onChange:function(e){d(e.target.value),c(e.target.name,e.target.value)},value:i,placeholder:" "}),""!==s&&n.a.createElement("label",{className:"input__label",htmlFor:o},s),n.a.createElement("div",{className:"input__border"}))};c.propTypes={name:s.a.string,type:s.a.string,className:s.a.string,id:s.a.string,label:s.a.string},a.default=c},"./src/js/app/components/common/NavigateCategory/index.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-router-dom/esm/react-router-dom.js");a.default=e=>n.a.createElement("div",{className:"admin-nav admin-nav--styles admin-nav--min"},n.a.createElement(o.NavLink,{exact:!0,to:"/admin/creator/rolls",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Суши и роллы")),n.a.createElement(o.NavLink,{exact:!0,to:"/admin/creator/sets",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Сеты")),n.a.createElement(o.NavLink,{exact:!0,to:"/admin/creator/pizza",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Пицца")),n.a.createElement(o.NavLink,{exact:!0,to:"/admin/creator/rolls_hot",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Горячие роллы")),n.a.createElement(o.NavLink,{exact:!0,to:"/admin/creator/salad",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Салаты")),n.a.createElement(o.NavLink,{exact:!0,to:"/admin/creator/hot_meat",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Горячие блюда")),n.a.createElement(o.NavLink,{exact:!0,to:"/admin/creator/sup",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Супы")),n.a.createElement(o.NavLink,{exact:!0,to:"/admin/creator/fastfood",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Фаст-фуд")),n.a.createElement(o.NavLink,{exact:!0,to:"/admin/creator/child",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Детское меню")),n.a.createElement(o.NavLink,{exact:!0,to:"/admin/creator/beverages",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Напитки")),n.a.createElement(o.NavLink,{exact:!0,to:"/admin/creator/desert",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Десерты")))},"./src/js/app/components/common/NavigatePages/index.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-router-dom/esm/react-router-dom.js");a.default=e=>n.a.createElement("nav",{className:"admin-nav admin-nav--styles"},n.a.createElement(o.NavLink,{to:"/admin/creator",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Редактор меню")),n.a.createElement(o.NavLink,{exact:!0,to:"/admin/orders",className:"admin-nav__item",activeClassName:"admin-nav__item--active"},n.a.createElement("span",null,"Заказы")))},"./src/js/app/hooks/useRedirectToCreator.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-router-dom/esm/react-router-dom.js");a.default=e=>e?!e:n.a.createElement(o.Redirect,{to:"/admin/creator/rolls"})},"./src/js/app/hooks/useRedirectToHome.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-router-dom/esm/react-router-dom.js"),s=t("./node_modules/react-redux/es/index.js");a.default=e=>{const a=Object(s.useSelector)(e=>e.auth.auth);return a?!a:n.a.createElement(o.Redirect,{to:"/login"})}},"./src/js/app/index.jsx":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/react/index.js"),n=t.n(r),o=t("./node_modules/react-dom/index.js"),s=t.n(o),c=t("./node_modules/react-router-dom/esm/react-router-dom.js"),i=t("./node_modules/react-redux/es/index.js"),d=t("./src/js/app/App.jsx"),l=t("./src/js/app/redux/store.js");s.a.render(n.a.createElement(c.BrowserRouter,null,n.a.createElement(i.Provider,{store:l.default},n.a.createElement(d.default,null))),document.querySelector(".react-app"))},"./src/js/app/redux/app-reducer.js":function(e,a,t){"use strict";t.r(a),t.d(a,"setCurrentPage",(function(){return g})),t.d(a,"getAllGroups",(function(){return j})),t.d(a,"getGroup",(function(){return y})),t.d(a,"addNewGroup",(function(){return _})),t.d(a,"renameGroup",(function(){return h})),t.d(a,"deleteGroup",(function(){return f})),t.d(a,"addNewItem",(function(){return b})),t.d(a,"saveItem",(function(){return v})),t.d(a,"deleteItem",(function(){return C}));var r=t("./src/js/app/api/api.js"),n=t("./src/js/app/common/categoriesName.js"),o=t("./src/js/app/common/item.js"),s=t("./src/js/app/common/makeObjectFromArray.js"),c=t("./src/js/app/common/sortOptionInItem.js");const i=new Map([["addAllCategory","app/addAllCategory"],["addAllCategoryLocal","app/addAllCategoryLocal"],["addGroupsToCategory","app/addGroupsToCategory"],["addGroupsToCategoryLocal","app/addGroupsToCategoryLocal"],["setIsLoaded","app/setIsLoaded"],["setCurrentNamePage","app/setCurrentNamePage"],["changeCategory","app/changeCategory"],["changeCategoryLocal","app/changeCategoryLocal"],["addNewItem","app/addNewItem"],["updateGroup","app/updateGroup"],["updateGroupLocal","app/updateGroupLocal"],["renameGroup","app/renameGroup"]]),d={currentNamePage:"rolls",categories:null,isLoaded:!1,localCategories:null};a.default=(e=d,a)=>{switch(a.type){case i.get("addAllCategory"):return{...e,categories:a.categories};case i.get("addAllCategoryLocal"):return{...e,localCategories:a.categories};case i.get("addGroupsToCategory"):{const t=e.categories[n.namesCategoryById.get(a.idCategory)];return{...e,categories:{...e.categories,[n.namesCategoryById.get(a.idCategory)]:{...t,groups:{...a.groups}}}}}case i.get("addGroupsToCategoryLocal"):{const t=e.localCategories[n.namesCategoryById.get(a.idCategory)];return{...e,localCategories:{...e.localCategories,[n.namesCategoryById.get(a.idCategory)]:{...t,groups:Object.keys(a.groups).reduce((e,t)=>({...e,[t]:{...a.groups[t],goods:[]}}),{})}}}}case i.get("setIsLoaded"):return{...e,isLoaded:!0};case i.get("setCurrentNamePage"):return{...e,currentNamePage:a.namePage};case i.get("changeCategory"):return{...e,categories:{...e.categories,[n.namesCategoryById.get(a.newCategory.id)]:{...a.newCategory}}};case i.get("changeCategoryLocal"):return{...e,localCategories:{...e.localCategories,[n.namesCategoryById.get(a.newCategory.id)]:{...a.newCategory}}};case i.get("addNewItem"):{const t=e.localCategories[n.namesCategoryById.get(a.idCategory)],r=t.groups||{},s=r[a.idGroup]&&r[a.idGroup].goods||[];return{...e,localCategories:{...e.localCategories,[n.namesCategoryById.get(a.idCategory)]:{...t,groups:{...r,[a.idGroup]:{...r[a.idGroup],goods:[...s,Object(o.item)(a.groupId,`new-${Math.floor(Math.random()*new Date)}`)]}}}}}}case i.get("updateGroup"):{const t=e.categories[n.namesCategoryById.get(a.idCategory)],r=t.groups||{};return{...e,categories:{...e.categories,[n.namesCategoryById.get(a.idCategory)]:{...t,groups:{...r,[a.idGroup]:{...a.group,goods:a.group.goods.map(e=>Object(c.default)(e))}}}}}}case i.get("updateGroupLocal"):const t=e.localCategories[n.namesCategoryById.get(a.idCategory)],r=t.groups||{};return{...e,localCategories:{...e.localCategories,[n.namesCategoryById.get(a.idCategory)]:{...t,groups:{...r,[a.idGroup]:{...r[a.idGroup],goods:r[a.idGroup].goods.filter(e=>e.id!==a.idItem)}}}}};case i.get("renameGroup"):{const t=e.categories[n.namesCategoryById.get(a.idCategory)],r=t.groups||{};return{...e,categories:{...e.categories,[n.namesCategoryById.get(a.idCategory)]:{...t,groups:{...r,[a.idGroup]:{...r[a.idGroup],name:a.newName}}}}}}default:return e}};const l=(e,a)=>({type:i.get("addGroupsToCategoryLocal"),idCategory:e,groups:a}),u=e=>({type:i.get("changeCategory"),newCategory:e}),m=e=>({type:i.get("changeCategoryLocal"),newCategory:e}),p=(e,a,t)=>({type:i.get("updateGroup"),idCategory:e,idGroup:a,group:t}),g=e=>a=>{a((e=>({type:i.get("setCurrentNamePage"),namePage:e}))(e))},j=()=>async e=>{try{const{data:{ok:o,categories:c}}=await r.appAPI.getAllGroups();if(!o)throw new Error("Ошибка в результате (ok = false)");{const r=c.reduce((e,a)=>({...e,[n.namesCategoryById.get(a.id)]:{id:a.id,name:a.name,groups:null}}),{});await e((e=>({type:i.get("addAllCategory"),categories:e}))(r)),e((e=>({type:i.get("addAllCategoryLocal"),categories:e}))(r));for(let r of c){const n=Object(s.makeObjectFromArray)(r.groups);e((a=r.id,t=n,{type:i.get("addGroupsToCategory"),idCategory:a,groups:t})),e(l(r.id,n))}e({type:i.get("setIsLoaded")})}}catch(e){console.group("========[ Ошибка загрузки данных ]========"),console.info("Загрузка всех данных"),console.error(e),console.groupEnd()}var a,t},y=(e,a)=>async e=>{try{const{data:e}=await r.appAPI.getGroup(a);if(!e.ok)throw new Error("Ошибка в результате (ok = false)");console.log(e)}catch(e){console.group("========[ Ошибка загрузки данных ]========"),console.info("Загрузка группы"),console.error(e),console.groupEnd()}},_=(e,a)=>async t=>{try{const{data:n}=await r.appAPI.addNewGroup(e,a);if(!n.ok)throw new Error("Ошибка добавления");{const{data:a}=await r.appAPI.getGroups(e);if(!a.ok)throw new Error("Ошибка обновления группы");{const e={...a.category,groups:Object(s.makeObjectFromArray)(a.category.groups)},r={...a.category,groups:Object(s.makeObjectFromArray)(a.category.groups,!0)};t(u(e)),t(m(r))}}}catch(e){console.group("========[ Ошибка добавления новой группы ]========"),console.error(e),console.groupEnd()}},h=(e,a,t)=>async n=>{try{const{data:{ok:o}}=await r.appAPI.renameGroup(a,t);if(!o)throw new Error("Ошибка при ренейме на сервере");n(((e,a,t)=>({type:i.get("renameGroup"),idCategory:e,idGroup:a,newName:t}))(e,a,t))}catch(e){console.group("========[ Ошибка переименования группы ]========"),console.error(e),console.groupEnd()}},f=(e,a)=>async t=>{try{const{data:n}=await r.appAPI.deleteGroup(a);if(!n.ok)throw new Error("Ошибка удаления");{const{data:a}=await r.appAPI.getGroups(e);if(!a.ok)throw new Error("Ошибка обновления группы");{const e={...a.category,groups:Object(s.makeObjectFromArray)(a.category.groups)},r={...a.category,groups:Object(s.makeObjectFromArray)(a.category.groups,!0)};t(u(e)),t(m(r))}}}catch(e){console.group("========[ Ошибка удаления группы ]========"),console.error(e),console.groupEnd()}},b=(e,a)=>t=>{t(((e,a)=>({type:i.get("addNewItem"),idCategory:e,idGroup:a}))(e,a))},v=(e,a,t,n)=>async o=>{try{const{data:s}=await r.appAPI.saveItem(e,a,t);if(!s.ok)throw new Error("Пришел не тот ответ");if(t){const{data:a}=await r.appAPI.getGroup(e.groupId);if(!a.ok)throw new Error("Ошибка обновления группы");o(p(n,e.groupId,a.group))}}catch(e){console.group("========[ Ошибка создания/обновления товара ]========"),console.error(e),console.groupEnd()}},C=(e,a,t,n)=>async o=>{try{if(n)o(((e,a,t)=>({type:i.get("updateGroupLocal"),idCategory:e,idGroup:a,idItem:t}))(e,a,t));else{const{data:n}=await r.appAPI.deleteItem(t);if(!n.ok)throw new Error("Пришел не тот ответ");{const{data:t}=await r.appAPI.getGroup(a);if(!t.ok)throw new Error("Ошибка обновления группы");o(p(e,a,t.group))}}}catch(e){console.group("========[ Ошибка удаления товара ]========"),console.error(e),console.groupEnd()}}},"./src/js/app/redux/auth-reducer.js":function(e,a,t){"use strict";t.r(a),t.d(a,"_setAuth",(function(){return s})),t.d(a,"_initialized",(function(){return c})),t.d(a,"getAuth",(function(){return i})),t.d(a,"login",(function(){return d}));var r=t("./src/js/app/api/api.js");const n=new Map([["auth","app/auth"],["initialized","app/initialized"]]),o={initialized:!1,auth:!1,token:null};a.default=(e=o,a)=>{switch(a.type){case n.get("initialized"):return{...e,initialized:!0};case n.get("auth"):return{...e,auth:a.status,token:a.token};default:return e}};const s=(e,a)=>({type:n.get("auth"),status:e,token:a}),c=()=>({type:n.get("initialized")}),i=()=>async e=>{const a=localStorage.getItem("token");if(a)try{await r.authAPI.getAuth(a)&&e(s(!0,localStorage.getItem("token")))}catch(e){console.group("=======[ Ошибка подтверждения авторизации ]======="),console.error(e),console.groupEnd()}e(c())},d=(e,a)=>async t=>{try{const{data:n}=await r.authAPI.login(e,a);n.ok&&(localStorage.setItem("token",n.token),t(i()))}catch(e){console.group("========[ Ошибка авторизации ]========"),console.error(e),console.groupEnd()}}},"./src/js/app/redux/store.js":function(e,a,t){"use strict";t.r(a);var r=t("./node_modules/redux/es/redux.js"),n=t("./node_modules/redux-thunk/es/index.js"),o=t("./src/js/app/redux/auth-reducer.js"),s=t("./src/js/app/redux/app-reducer.js");const c=Object(r.combineReducers)({auth:o.default,app:s.default}),i=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||r.compose,d=Object(r.createStore)(c,i(Object(r.applyMiddleware)(n.default)));a.default=d},"./src/less/app/index.less":function(e,a,t){},5:function(e,a,t){t("./src/less/app/index.less"),t("./node_modules/@babel/polyfill/lib/index.js"),e.exports=t("./src/js/app/index.jsx")}});
//# sourceMappingURL=app.js.map