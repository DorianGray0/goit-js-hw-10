import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as n}from"./assets/vendor-77e16229.js";const s=document.querySelector(".form");s.addEventListener("submit",c);document.addEventListener("DOMContentLoaded",e=>{n.info({position:"topRight",title:"Hello",message:"WELCOME!",titleColor:"white",titleSize:"16px",messageColor:"white",backgroundColor:"#09f",iconUrl:"../../img/bi_bell.png"})});function c(e){e.preventDefault();const{delay:o,state:i}=e.target.elements,r=Number(o.value),l=[...i].find(t=>t.checked);a(r,l).then(t=>{n.success({position:"topRight",title:"OK",message:`Fulfilled promise in ${t}ms`,titleColor:"white",titleSize:"16px",messageColor:"white",backgroundColor:"#59a10d",iconUrl:"../../img/bi_check2-circle.png"})}).catch(t=>{n.error({position:"topRight",title:"Error",message:`Rejected promise in ${t}ms`,titleColor:"white",titleSize:"16px",messageColor:"white",backgroundColor:"#ef4040",iconUrl:"../../img/bi_x-octagon.png"})}).finally(()=>{})}function a(e,o){return new Promise((i,r)=>{setTimeout(()=>{o.value==="fulfilled"?i(e):r(e)},e)})}
//# sourceMappingURL=commonHelpers2.js.map
