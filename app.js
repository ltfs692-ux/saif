
const WA="971582094588";
const BRAND="SAIFEE";
const LEGAL_NAME="SAIF LLC FZ";
const products=[
{id:"TS-1001",cat:"Textiles",name:"Premium Cotton T-Shirt",sub:"240 GSM • 100% Cotton • Wholesale",price:18.5,unit:"piece",stock:640,min:80,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",badge:"BEST SELLER",colors:"Black • White • Navy",sizes:"S • M • L • XL • XXL"},
{id:"TS-1002",cat:"Textiles",name:"Premium Polo Shirt",sub:"Piqué Cotton • Corporate & Retail",price:24.9,unit:"piece",stock:410,min:60,img:"https://images.unsplash.com/photo-1625910513413-5fc45f55f5e8?auto=format&fit=crop&w=1000&q=85",badge:"PREMIUM",colors:"White • Navy • Black",sizes:"S • M • L • XL"},
{id:"TS-1003",cat:"Textiles",name:"Denim Jeans — Export Grade",sub:"Stretch Denim • Multiple washes",price:32,unit:"piece",stock:185,min:40,img:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=85",badge:"EXPORT",colors:"Blue • Black",sizes:"30 • 32 • 34 • 36 • 38"},
{id:"FD-2001",cat:"Food Commodities",name:"Premium Basmati Rice",sub:"1121 Long Grain • Export Grade",price:4.8,unit:"kg",stock:820,min:150,img:"https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1000&q=85",badge:"EXPORT GRADE",colors:"Natural",sizes:"5kg • 10kg • 25kg"},
{id:"FD-2002",cat:"Food Commodities",name:"Refined White Sugar",sub:"ICUMSA • Bulk Commodity",price:2.35,unit:"kg",stock:95,min:120,img:"https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=1000&q=85",badge:"LOW STOCK",colors:"White",sizes:"25kg • 50kg"},
{id:"SF-3001",cat:"Safety & Industrial",name:"Industrial Safety Gloves",sub:"Cut Resistant • EN Standard",price:8.9,unit:"pair",stock:320,min:70,img:"https://images.unsplash.com/photo-1584269600464-37b7c8a5d4d4?auto=format&fit=crop&w=1000&q=85",badge:"INDUSTRIAL",colors:"Grey • Black",sizes:"M • L • XL"},
{id:"SF-3002",cat:"Safety & Industrial",name:"High Visibility Workwear",sub:"Reflective • Industrial Grade",price:42,unit:"set",stock:74,min:50,img:"https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&w=1000&q=85",badge:"B2B",colors:"Yellow • Orange",sizes:"M • L • XL • XXL"},
{id:"EL-4001",cat:"General Trade",name:"Commercial Electrical Kit",sub:"Wholesale mixed accessory pack",price:12.5,unit:"kit",stock:210,min:50,img:"https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=85",badge:"WHOLESALE",colors:"Mixed",sizes:"Standard"},
{id:"PK-5001",cat:"Packaging",name:"Premium Commercial Packaging",sub:"Food-safe • Custom bulk lots",price:3.4,unit:"piece",stock:980,min:200,img:"https://images.unsplash.com/photo-1586528116493-da8e5f2c4d34?auto=format&fit=crop&w=1000&q=85",badge:"BULK",colors:"Kraft • White",sizes:"Custom"},
{id:"FT-6001",cat:"Footwear",name:"Premium Safety Shoe",sub:"Steel Toe • Industrial",price:58,unit:"pair",stock:132,min:30,img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",badge:"PREMIUM",colors:"Black",sizes:"40 • 41 • 42 • 43 • 44"},
{id:"AC-7001",cat:"Accessories",name:"Corporate Leather Belt",sub:"Genuine leather • Bulk supply",price:16.5,unit:"piece",stock:260,min:60,img:"https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=85",badge:"CORPORATE",colors:"Black • Brown",sizes:"32 • 34 • 36 • 38"},
{id:"TX-8001",cat:"Textiles",name:"Luxury Corporate Hoodie",sub:"Heavyweight • Private Label Ready",price:39,unit:"piece",stock:88,min:30,img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",badge:"PRIVATE LABEL",colors:"Black • Grey",sizes:"S • M • L • XL • XXL"}
];
const cats=["All","Textiles","Food Commodities","Safety & Industrial","General Trade","Packaging","Footwear","Accessories"];
let cart=JSON.parse(localStorage.getItem("saifee_cart")||localStorage.getItem("saifey_cart")||"[]");
let db=JSON.parse(localStorage.getItem("saifee_db")||localStorage.getItem("saifey_db")||"null")||{orders:[],quotes:[],leads:[],ledger:[],payments:[],stock:products.reduce((o,p)=>(o[p.id]=p.stock,o),{}),lowAlerts:[]}; db.payments ||= []; db.quotes ||= []; db.leads ||= []; db.orders ||= []; db.ledger ||= [];
function save(){localStorage.setItem("saifee_cart",JSON.stringify(cart));localStorage.setItem("saifee_db",JSON.stringify(db));localStorage.removeItem("saifey_cart");localStorage.removeItem("saifey_db")}
const FX_PROFILES={
 UAE:{currency:"AED",rate:1,markup:0,label:"UAE / AED"},
 India:{currency:"INR",rate:22.65,markup:1.5,label:"India / INR"},
 Kazakhstan:{currency:"KZT",rate:145.0,markup:2.5,label:"Kazakhstan / KZT"},
 Europe:{currency:"EUR",rate:0.2469,markup:1.8,label:"Europe / EUR"},
 USA:{currency:"USD",rate:0.2723,markup:1.8,label:"USA / USD"},
 UK:{currency:"GBP",rate:0.2135,markup:1.8,label:"UK / GBP"},
 "Saudi Arabia":{currency:"SAR",rate:1.0203,markup:1.5,label:"Saudi Arabia / SAR"}
};
const COUNTRY_BY_CODE={AE:"UAE",IN:"India",KZ:"Kazakhstan",SA:"Saudi Arabia",US:"USA",GB:"UK",DE:"Europe",FR:"Europe",IT:"Europe",ES:"Europe",NL:"Europe",BE:"Europe",AT:"Europe",PT:"Europe",IE:"Europe"};
let liveFxLoaded=false;
function fxProfile(country){return FX_PROFILES[country]||FX_PROFILES.UAE}
function fxProfileForCurrency(currency){const map={AED:"UAE",INR:"India",KZT:"Kazakhstan",EUR:"Europe",USD:"USA",GBP:"UK",SAR:"Saudi Arabia"};return fxProfile(map[currency]||"UAE")}
function money(n,c="AED"){const rates={AED:[1,"AED "],INR:[22.65,"₹"],USD:[1/3.6725,"$"],EUR:[1/4.05,"€"],KZT:[145,"₸"],GBP:[0.2135,"£"],SAR:[1.0203,"SAR "]};const r=rates[c]||rates.AED;return r[1]+(n*r[0]).toLocaleString(c==="INR"?"en-IN":"en-US",{minimumFractionDigits:c==="AED"||c==="USD"||c==="EUR"?2:0,maximumFractionDigits:c==="AED"||c==="USD"||c==="EUR"?2:0}) }
function detectCountry(){const tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";const lang=(navigator.language||"").toLowerCase();if(tz==="Asia/Dubai")return "UAE";if(tz.includes("Kolkata")||lang.startsWith("hi")||lang.endsWith("-in"))return "India";if(tz.includes("Almaty")||tz.includes("Aqtau")||lang.endsWith("-kz"))return "Kazakhstan";if(tz.startsWith("Europe/London"))return "UK";if(tz.startsWith("Europe/"))return "Europe";if(tz.startsWith("America/"))return "USA";if(tz.includes("Riyadh")||lang.endsWith("-sa"))return "Saudi Arabia";return "UAE"}
function fxQuote(aed,country,currency){const countryProfile=fxProfile(country);const code=currency||countryProfile.currency;const p=fxProfileForCurrency(code);const rates={AED:1,INR:FX_PROFILES.India.rate,KZT:FX_PROFILES.Kazakhstan.rate,EUR:FX_PROFILES.Europe.rate,USD:FX_PROFILES.USA.rate,GBP:FX_PROFILES.UK.rate,SAR:FX_PROFILES["Saudi Arabia"].rate};const rate=Number(rates[code]||countryProfile.rate||1);const base=Number(aed||0)*rate;const markup=base*Number(p.markup||0)/100;return {country,p,currency:code,rate,base,markup,total:base+markup,source:p.source||"Reference rate"}}
async function loadLiveFXRates(){
 try{
  const r=await fetch("https://open.er-api.com/v6/latest/AED",{cache:"no-store"});
  const j=await r.json();
  if(j&&j.result==="success"&&j.rates){
   const map={INR:"India",KZT:"Kazakhstan",EUR:"Europe",USD:"USA",GBP:"UK",SAR:"Saudi Arabia"};
   Object.entries(map).forEach(([code,country])=>{if(Number(j.rates[code])>0){FX_PROFILES[country].rate=Number(j.rates[code]);FX_PROFILES[country].source="Live FX reference";}});
   FX_PROFILES.UAE.source="Live FX reference";liveFxLoaded=true;
   updateFxPreview();
   renderFxBanner();
   return true;
  }
 }catch(e){}
 return false;
}
function setDetectedCountry(country,via="browser") {
 const el=document.querySelector("#payCountry"); if(el&&FX_PROFILES[country]){el.value=country;el.dataset.autoCountry="true";const cur=document.querySelector("#payCurrency");if(cur){cur.value=fxProfile(country).currency;cur.dataset.autoCurrency="true"}}
 const status=document.querySelector("#payLocationStatus");if(status)status.innerHTML=`<b>✓ Location detected:</b> ${fxProfile(country).label} <span class="muted">• ${via}</span>`;
 updateFxPreview();
}
async function autoDetectCustomerLocation(){
 const fallback=detectCountry();
 setDetectedCountry(fallback,"automatic browser detection");
 let detected=false;
 const applyCountry=country=>{if(country&&FX_PROFILES[country]){detected=true;setDetectedCountry(country,"automatic live location");return true}return false};
 const ipFallback=async()=>{
  try{const r=await fetch("https://ipwho.is/",{cache:"no-store"});const j=await r.json();const c=COUNTRY_BY_CODE[j.country_code]||fallback;applyCountry(c);const st=document.querySelector("#payLocationStatus");if(st)st.innerHTML=`<b>✓ Location detected:</b> ${fxProfile(c).label} <span class="muted">• automatic location</span>`;}catch(e){setDetectedCountry(fallback,"browser timezone / language");}
 };
 if(navigator.geolocation){
  try{
   await new Promise(resolve=>navigator.geolocation.getCurrentPosition(async pos=>{
    try{const r=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`,{cache:"no-store"});const j=await r.json();applyCountry(COUNTRY_BY_CODE[j.countryCode]||fallback);}catch(e){}
    resolve();
   },()=>resolve(),{enableHighAccuracy:false,timeout:4500,maximumAge:300000}));
  }catch(e){}
 }
 if(!detected)await ipFallback();
 await loadLiveFXRates();
 updateFxPreview();
}
function updateFxPreview(){
 const box=document.querySelector("#fxPreview");if(!box)return;
 const country=document.querySelector("#payCountry")?.value||detectCountry();const currency=document.querySelector("#payCurrency")?.value||fxProfile(country).currency;const t=pendingTotals();const q=fxQuote(t.total,country,currency);const p=q.p;const base=q.base;const charge=q.markup;const final=q.total;
 box.innerHTML=`<div class="fxTitle"><b>Transparent FX / Forex breakdown</b><span>${p.source||"Reference rate"}</span></div><div class="fxGrid"><div><small>Customer location</small><b>${p.label}</b></div><div><small>Product + VAT (AED)</small><b>${money(t.total,"AED")}</b></div><div><small>FX rate</small><b>1 AED = ${q.rate.toFixed(q.rate<1?4:2)} ${currency}</b></div><div><small>Converted amount</small><b>${formatFxAmount(base,currency)}</b></div><div><small>Forex / FX charge</small><b>${Number(p.markup||0).toFixed(2)}% = ${formatFxAmount(charge,currency)}</b></div><div><small>Customer total</small><b>${formatFxAmount(final,currency)}</b></div></div><div class="fxNote"><b>Price transparency:</b> Product amount ${money(t.subtotal,"AED")} + VAT ${money(t.vat,"AED")} = ${money(t.total,"AED")}. Then the displayed FX rate converts the AED amount and the ${Number(p.markup||0).toFixed(2)}% FX/forex charge is shown separately. No hidden FX charge.</div>`;
}
function currencyFactor(c){return ({AED:1,INR:22.65,USD:1/3.6725,EUR:1/4.05,KZT:145,GBP:0.2135,SAR:1.0203}[c]||1)}
function renderFxBanner(){const box=document.querySelector("#fxBanner");if(!box)return;const c=detectCountry(),p=fxProfile(c);box.innerHTML=`<b>Auto location & FX</b><span>Detected: ${p.label}</span><span>1 AED = ${p.rate.toFixed(p.rate<1?4:2)} ${p.currency}</span><span>FX charge: ${p.markup.toFixed(2)}%</span><span class="muted">${p.source||"Reference rate"}</span>`}
async function initSiteFxBanner(){
 renderFxBanner();
 try{
  if(navigator.geolocation){navigator.geolocation.getCurrentPosition(async pos=>{
   try{const r=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`,{cache:"no-store"});const j=await r.json();const c=COUNTRY_BY_CODE[j.countryCode]||detectCountry();const p=fxProfile(c);const box=document.querySelector("#fxBanner");if(box)box.innerHTML=`<b>Live location & FX</b><span>Detected: ${p.label}</span><span>1 AED = ${p.rate.toFixed(p.rate<1?4:2)} ${p.currency}</span><span>FX charge: ${p.markup.toFixed(2)}%</span><span class="muted">Live FX reference</span>`;}catch(e){}
  },()=>{}, {enableHighAccuracy:false,timeout:4500,maximumAge:300000});}
 }catch(e){}
 await loadLiveFXRates();
 renderFxBanner();
}
function formatFxAmount(amount,currency){const symbols={AED:"AED ",INR:"₹",USD:"$",EUR:"€",KZT:"₸",GBP:"£",SAR:"SAR "};return (symbols[currency]||currency+" ")+Number(amount).toLocaleString(currency==="INR"?"en-IN":"en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}

function toast(t){let e=document.querySelector("#toast");if(!e)return;e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2600)}
function findProduct(id){return products.find(p=>p.id===id)}
function addCart(id,qty=1){let p=findProduct(id);let x=cart.find(i=>i.id===id);if(x)x.qty+=qty;else cart.push({id,qty});save();renderCart();toast(p.name+" added to inquiry/cart")}
function openProduct(id){let p=findProduct(id);if(!p)return;let m=document.querySelector("#productModal");if(!m)return;m.innerHTML=`<div class="modalCard"><button class="modalClose" onclick="closeModal()">✕</button><div class="detail"><div class="detailImg" style="background-image:url('${p.img}')"></div><div class="detailBody"><span class="kicker">${p.cat}</span><h2>${p.name}</h2><p class="muted">${p.sub}</p><div class="price">${money(p.price)} <small style="font-size:11px;color:#7a8992">/ ${p.unit}</small></div><p><b>SKU:</b> ${p.id}<br><b>Available:</b> ${db.stock[p.id]??p.stock} ${p.unit}s<br><b>Options:</b> ${p.colors}<br><b>Sizes:</b> ${p.sizes}</p><div class="field"><label>QUANTITY</label><div class="qty"><button onclick="changeDetailQty(-1)">−</button><span id="detailQty">1</span><button onclick="changeDetailQty(1)">+</button></div></div><div style="display:flex;gap:9px;margin-top:18px"><button class="btn" onclick="addDetailToCart()">Add to Order</button><button class="btn light" onclick="requestQuote('${p.id}')">Request Quote</button></div><div class="notice" style="margin-top:18px">Demo payment: checkout supports AED / INR display and creates an order + invoice preview. Gateway integration is production phase.</div></div></div></div>`;m.classList.add("open");m.dataset.id=id}
function changeDetailQty(d){let e=document.querySelector("#detailQty");e.textContent=Math.max(1,(+e.textContent||1)+d)}
function addDetailToCart(){let id=document.querySelector("#productModal").dataset.id;addCart(id,+document.querySelector("#detailQty").textContent);closeModal();openCart()}
function requestQuote(id){
 const p=findProduct(id); if(!p)return;
 localStorage.setItem('saifee_quote_product',id);
 closeModal(); location.href='negotiate.html?product='+encodeURIComponent(id);
}
function closeModal(){document.querySelector("#productModal")?.classList.remove("open")}
function openCart(){document.querySelector("#cartDrawer")?.classList.add("open");renderCart()}
function closeCart(){document.querySelector("#cartDrawer")?.classList.remove("open")}
function renderCart(){let box=document.querySelector("#cartItems"),totalEl=document.querySelector("#cartTotal"),count=document.querySelector("#cartCount");if(!box)return;let total=0;box.innerHTML=cart.length?cart.map(i=>{let p=findProduct(i.id);let t=p.price*i.qty;total+=t;return`<div class="cartItem"><img src="${p.img}"><div><b>${p.name}</b><div class="muted" style="font-size:10px">${i.qty} × ${money(p.price)}</div><button class="iconbtn" style="padding:5px 8px;margin-top:5px" onclick="removeCart('${p.id}')">Remove</button></div><b>${money(t)}</b></div>`}).join(""):`<div class="notice">Your cart/inquiry is empty. Choose a product from the catalogue.</div>`;if(totalEl)totalEl.innerHTML=`<div style="display:flex;justify-content:space-between"><span>Subtotal</span><b>${money(total)}</b></div><div style="display:flex;justify-content:space-between;margin-top:7px"><span>VAT 5%</span><b>${money(total*.05)}</b></div><div style="display:flex;justify-content:space-between;margin-top:10px;font-size:19px"><span>Total</span><b>${money(total*1.05)}</b></div>`;if(count)count.textContent=cart.reduce((a,i)=>a+i.qty,0)}
function removeCart(id){cart=cart.filter(i=>i.id!==id);save();renderCart()}
function submitNegotiation(){
 const id=new URLSearchParams(location.search).get('product')||localStorage.getItem('saifee_quote_product');
 const p=findProduct(id); if(!p){toast('Product not found');return}
 const name=(document.querySelector('#quoteName')?.value||'').trim();
 const email=(document.querySelector('#quoteEmail')?.value||'').trim();
 const qty=Math.max(1,Number(document.querySelector('#quoteQty')?.value||1));
 const target=Math.max(0,Number(document.querySelector('#quotePrice')?.value||0));
 const note=(document.querySelector('#quoteNote')?.value||'').trim();
 if(!name||!email){toast('Enter company/buyer and email');return}
 if(qty>(db.stock[id]??p.stock)){toast('Requested quantity exceeds available stock');return}
 const listPrice=p.price*qty, proposed=target>0?target*qty:listPrice;
 const qid='QT-2026-'+String(Date.now()).slice(-6);
 const q={id:qid,name,email,product:id,productName:p.name,qty,unitPrice:p.price,targetUnitPrice:target||p.price,total:proposed*1.05,subtotal:proposed,vat:proposed*.05,discount:target>0?Math.max(0,((p.price-target)/p.price)*100):0,status:'Negotiation Requested',date:new Date().toLocaleString(),note};
 db.quotes.unshift(q);
 db.leads.unshift({name,email,source:'Website',requirement:'Negotiated quotation — '+p.name+' × '+qty,status:'Quote Requested',date:new Date().toLocaleString()});
 db.ledger.unshift({type:'QUOTE',ref:qid,desc:'Negotiation request — '+name+' / '+p.name,credit:0,debit:0,date:new Date().toLocaleString()});
 save(); localStorage.removeItem('saifee_quote_product');
 location.href='quote-success.html?quote='+encodeURIComponent(qid);
}

function placeOrder(){
 if(!cart.length){toast('Add a product first');return}
 const name=(document.querySelector('#coName')?.value||'').trim(),email=(document.querySelector('#coEmail')?.value||'').trim(),currency=document.querySelector('#coCurrency')?.value||'AED';
 if(!name||!email){toast('Enter company/buyer and email');return}
 localStorage.setItem('saifee_checkout_customer',JSON.stringify({name,email,currency}));
 document.querySelector('#checkoutModal')?.classList.remove('open');
 checkout();
}

function checkout(){
 if(!cart.length){toast("Add a product first");return}
 const total=cart.reduce((s,i)=>s+findProduct(i.id).price*i.qty,0)*1.05;
 const available=cart.every(i=>i.qty<=(db.stock[i.id]??findProduct(i.id).stock));
 if(!available){toast("One or more items exceed available stock");return}
 const quoteId='QT-2026-'+String(Date.now()).slice(-6);
 const pending={items:cart.map(i=>({id:i.id,qty:i.qty})),createdAt:new Date().toISOString(),source:'Website Cart',quoteId};
 const subtotal=cart.reduce((s,i)=>s+findProduct(i.id).price*i.qty,0), vat=subtotal*.05;
 db.quotes.unshift({id:quoteId,name:'Checkout Customer',email:'pending@checkout.local',productName:cart.map(i=>findProduct(i.id).name).join(', '),qty:cart.reduce((n,i)=>n+i.qty,0),subtotal,vat,total:subtotal+vat,status:'Checkout / Payment Pending',date:new Date().toLocaleString(),source:'Website Cart'});
 save();
 localStorage.setItem("saifee_pending_checkout",JSON.stringify(pending));
 location.href="payment.html";
}
function proceedToPayment(){
 if(!cart.length){toast("Your cart is empty");setTimeout(()=>location.href="catalog.html",300);return}
 const available=cart.every(i=>i.qty<=(db.stock[i.id]??findProduct(i.id).stock));
 if(!available){toast("One or more items exceed available stock");return}
 const quoteId="QT-2026-"+String(Date.now()).slice(-6);
 const subtotal=cart.reduce((s,i)=>s+findProduct(i.id).price*i.qty,0), vat=subtotal*.05;
 const existing=getPendingCheckout();
 const pending={items:cart.map(i=>({id:i.id,qty:i.qty})),createdAt:new Date().toISOString(),source:"Website Cart",quoteId};
 db.quotes.unshift({id:quoteId,name:"Checkout Customer",email:"pending@checkout.local",productName:cart.map(i=>findProduct(i.id).name).join(", "),qty:cart.reduce((n,i)=>n+i.qty,0),subtotal,vat,total:subtotal+vat,status:"Checkout / Payment Pending",date:new Date().toLocaleString(),source:"Website Cart"});
 save();
 localStorage.setItem("saifee_pending_checkout",JSON.stringify(pending));
 location.href="payment.html";
}

function getPendingCheckout(){return JSON.parse(localStorage.getItem("saifee_pending_checkout")||"null")}
function pendingTotals(){const p=getPendingCheckout();if(!p)return {subtotal:0,vat:0,total:0};const subtotal=p.items.reduce((s,i)=>s+findProduct(i.id).price*i.qty,0);return {subtotal,vat:subtotal*.05,total:subtotal*1.05}}
function completePayment(){
 const p=getPendingCheckout();
 if(!p||!p.items.length){toast("Your checkout session is empty");setTimeout(()=>location.href="catalog.html",500);return}
 const name=(document.querySelector("#payName")?.value||"").trim(),email=(document.querySelector("#payEmail")?.value||"").trim(),country=document.querySelector("#payCountry")?.value||detectCountry(),currency=document.querySelector("#payCurrency")?.value||fxProfile(country).currency,method=document.querySelector("input[name=paymentMethod]:checked")?.value||"Card";
 if(!name||!email){toast("Enter buyer/company and email");return}
 for(const i of p.items){if(i.qty>(db.stock[i.id]??findProduct(i.id).stock)){toast("Stock changed — please review your cart");return}}
 const t=pendingTotals(), id="SO-2026-"+String(db.orders.length+104).padStart(4,"0"), now=new Date().toLocaleString();
 const fx=fxQuote(t.total,country,currency), isUnpaid=method==="Unpaid / Pay Later";
 const order={id,name,email,country,currency,fxReferenceRate:fx.rate,fxMarkupPercent:fx.p.markup,fxBaseAmount:fx.base,fxMarkupAmount:fx.markup,displayTotal:fx.total,subtotal:t.subtotal,vat:t.vat,total:t.total,status:isUnpaid?"Unpaid":"Paid",paymentStatus:isUnpaid?"Unpaid":"Paid",paymentMethod:method,date:now,items:p.items};
 db.orders.unshift(order);
 const q=db.quotes.find(x=>x.id===p.quoteId);
 if(q){q.name=name;q.email=email;q.total=t.total;q.subtotal=t.subtotal;q.vat=t.vat;q.status="Converted to Order";q.date=now;q.source="Website Checkout";q.orderId=id;q.paymentStatus=isUnpaid?"Unpaid":"Paid";}
 else {db.quotes.unshift({id:"QT-"+id.slice(3),name,email,productName:p.items.map(i=>findProduct(i.id).name).join(", "),qty:p.items.reduce((n,i)=>n+i.qty,0),total:t.total,subtotal:t.subtotal,vat:t.vat,status:"Converted to Order",date:now,source:"Website Checkout",orderId:id,paymentStatus:isUnpaid?"Unpaid":"Paid"});}
 p.items.forEach(i=>{db.stock[i.id]=(db.stock[i.id]??findProduct(i.id).stock)-i.qty;const prod=findProduct(i.id);if(db.stock[i.id]<=prod.min)db.lowAlerts.unshift({id:i.id,name:prod.name,stock:db.stock[i.id]})});
 if(isUnpaid){db.ledger.unshift({type:"RECEIVABLE",ref:id,desc:"Unpaid customer order — "+name,credit:0,debit:t.total,date:now});}
 else {db.payments.unshift({id:"PAY-"+id.slice(3),orderId:id,invoiceId:"INV-"+id.slice(3),customer:name,email,amount:t.total,currency,method,status:"Paid",date:now});db.ledger.unshift({type:"RECEIPT",ref:"PAY-"+id.slice(3),desc:"Payment received — "+name+" ("+method+")",credit:t.total,debit:0,date:now});}
 db.ledger.unshift({type:"SALE",ref:id,desc:(isUnpaid?"Unpaid customer order — ":"Customer order — ")+name,credit:t.total,debit:0,date:now});
 save();localStorage.removeItem("saifee_pending_checkout");localStorage.removeItem("saifee_checkout_customer");cart=[];save();location.href="payment-success.html?order="+encodeURIComponent(id);
}
function showSuccess(o){let m=document.querySelector("#successModal");if(!m)return;m.innerHTML=`<div class="modalCard" style="max-width:620px;padding:34px"><span class="kicker">ORDER CREATED</span><h2 style="font-size:34px;margin:8px 0">Order ${o.id}</h2><p class="muted">Order created and the transaction is now visible in the browser admin. Payment status is shown below.</p><div class="notice">Payment status: <b>${o.status}</b><br>Payment method: <b>${o.paymentMethod||"—"}</b><br>Invoice: <b>INV-${o.id.slice(3)}</b><br>Base total: <b>${money(o.total,"AED")}</b><br>Customer display total: <b>${formatFxAmount(o.displayTotal||o.total,o.currency||"AED")}</b></div><div style="display:flex;gap:8px;margin-top:18px"><button class="btn" onclick="closeSuccess();location.href='admin-login.html'">View Admin</button><button class="btn light" onclick="closeSuccess();location.href='catalog.html'">Continue Shopping</button></div></div>`;m.classList.add("open")}
function submitLead(){let n=document.querySelector("#leadName").value.trim(),e=document.querySelector("#leadEmail").value.trim(),r=document.querySelector("#leadReq").value.trim();if(!n||!e)return toast("Enter your company and email");db.leads.unshift({name:n,email:e,source:"Website",requirement:r,status:"New",date:new Date().toLocaleString()});save();toast("Lead captured in CRM demo");document.querySelector("#leadForm").reset()}
function renderCatalog(){let grid=document.querySelector("#catalogGrid");if(!grid)return;let active=document.querySelector(".chip.active")?.dataset.cat||"All",q=(document.querySelector("#search")?.value||"").toLowerCase(),sort=document.querySelector("#sort")?.value||"featured";let arr=products.filter(p=>(active==="All"||p.cat===active)&&(!q||(`${p.name} ${p.cat} ${p.id}`.toLowerCase().includes(q))));if(sort==="low")arr.sort((a,b)=>a.price-b.price);if(sort==="high")arr.sort((a,b)=>b.price-a.price);grid.innerHTML=arr.map(p=>productCard(p)).join("");}
function productCard(p){return`<article class="product"><div class="productImg" style="background-image:url('${p.img}')"><span class="badge">${p.badge}</span></div><div class="productBody"><div class="kicker">${p.cat}</div><h3>${p.name}</h3><div class="productMeta">${p.sub}<br>SKU ${p.id} • Stock ${db.stock[p.id]??p.stock}</div><div class="price">${money(p.price)} <small style="font-size:10px;color:#7a8992">/ ${p.unit}</small></div><div class="productBtns"><button class="btn ghost" onclick="openProduct('${p.id}')">View</button><button class="btn" onclick="addCart('${p.id}')">Add to Cart</button></div><button class="btn light" style="width:100%;margin-top:8px;justify-content:center" onclick="requestQuote('${p.id}')">Negotiate Quotation</button></div></article>`}
function initCatalog(){let chips=document.querySelector("#chips");if(!chips)return;let urlCat=new URLSearchParams(location.search).get("cat");chips.innerHTML=cats.map(c=>`<button class="chip ${((urlCat&&c===urlCat)||(!urlCat&&c==="All"))?"active":""}" data-cat="${c}">${c}</button>`).join("");chips.onclick=e=>{if(!e.target.classList.contains("chip"))return;document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));e.target.classList.add("active");renderCatalog()};document.querySelector("#search").oninput=renderCatalog;document.querySelector("#sort").onchange=renderCatalog;renderCatalog()}
function login(){let u=document.querySelector("#user").value,p=document.querySelector("#pass").value;if(u==="admin"&&p==="SAIFEE@2026"){sessionStorage.setItem("saifee_admin","1");location.href="admin.html"}else{document.querySelector("#loginError").textContent="Invalid demo credentials"}} 
function guard(){if(!sessionStorage.getItem("saifee_admin"))location.href="admin-login.html"}
function logout(){sessionStorage.removeItem("saifee_admin");location.href="admin-login.html"}
function navAdmin(id){document.querySelectorAll(".adminPage").forEach(x=>x.classList.add("hidden"));document.querySelector("#"+id)?.classList.remove("hidden");document.querySelectorAll(".sideLink").forEach(x=>x.classList.toggle("active",x.dataset.page===id));const titles={dashboard:"Dashboard",sales:"Sales & Orders",quotes:"Quotations",invoices:"Invoices & Payments",inventory:"Inventory & Barcode",purchases:"Purchases",crm:"CRM & Leads",finance:"Finance / Ledger",reports:"Management Reports"};if(document.querySelector("#pageTitle"))document.querySelector("#pageTitle").textContent=titles[id]||"Dashboard";refreshAdmin(id)}
function refreshAdmin(page){if(!document.querySelector("#adminRoot"))return;let revenue=(db.payments||[]).filter(p=>p.status==="Paid").reduce((s,p)=>s+p.amount,0),outstanding=db.orders.filter(o=>o.status!=="Paid").reduce((s,o)=>s+o.total,0),purchase=db.ledger.filter(x=>x.type==="PURCHASE").reduce((s,x)=>s+x.debit,0),stockVal=products.reduce((s,p)=>s+(db.stock[p.id]??p.stock)*p.price,0);let low=products.filter(p=>(db.stock[p.id]??p.stock)<=p.min);document.querySelector("#rev").textContent=money(revenue+284650);document.querySelector("#monthRev").textContent=money(revenue+84250);if(document.querySelector("#outstanding"))document.querySelector("#outstanding").textContent=money(outstanding);document.querySelector("#purchaseVal").textContent=money(purchase+118400);document.querySelector("#stockVal").textContent=money(stockVal);document.querySelector("#orderCount").textContent=db.orders.length+38;document.querySelector("#leadCount").textContent=db.leads.length+24;document.querySelector("#lowCount").textContent=low.length;let saleRows=document.querySelectorAll("#saleRows");if(saleRows.length)saleRows.forEach(el=>el.innerHTML=[...db.orders,...[{id:"SO-2026-0103",name:"Dubai Trade House LLC",total:24850,status:"Paid",date:"04 Oct 2026"}]].slice(0,8).map(o=>`<tr><td>${o.id}</td><td>${o.name}</td><td>${money(o.total,o.currency||"AED")}</td><td><span class="status ${(o.status==="Payment Pending"||o.status==="Unpaid")?"warn":""}">${o.status}</span></td><td>${o.date}</td></tr>`).join(""));let inv=document.querySelector("#inventoryRows");if(inv)inv.innerHTML=low.concat(products.filter(p=>!low.includes(p)).slice(0,3)).map(p=>`<tr><td>${p.id}</td><td>${p.name}</td><td>${db.stock[p.id]??p.stock}</td><td>${p.min}</td><td><span class="status ${((db.stock[p.id]??p.stock)<=p.min)?"danger":""}">${((db.stock[p.id]??p.stock)<=p.min)?"LOW":"Healthy"}</span></td><td><button class="btn light" style="padding:7px 10px" onclick="stockAdjust('${p.id}',10)">+10</button></td></tr>`).join("");let leadRows=document.querySelector("#leadRows");if(leadRows)leadRows.innerHTML=(db.leads.length?db.leads:[{name:"Instagram Lead",email:"demo@lead.com",source:"Instagram",requirement:"Corporate textile supply",status:"New",date:"Today"},{name:"WhatsApp Inquiry",email:"wa@demo.com",source:"WhatsApp",requirement:"Safety workwear",status:"Qualified",date:"Today"}]).slice(0,8).map(l=>`<tr><td>${l.name}</td><td>${l.source}</td><td>${l.email}</td><td>${l.requirement}</td><td><span class="status">${l.status}</span></td></tr>`).join("");let quoteRows=document.querySelector("#quoteRows");if(quoteRows)quoteRows.innerHTML=(db.quotes.length?db.quotes:[{id:"QT-2026-0037",name:"Dubai Trade House LLC",total:24850,status:"Sent"},{id:"QT-2026-0038",name:"India Imports Pvt Ltd",total:482000,status:"Approved"}]).slice(0,8).map(q=>`<tr><td>${q.id}</td><td>${q.name}<br><small class="muted">${q.productName||'Quotation request'} ${q.qty?'× '+q.qty:''}</small></td><td>${money(q.total||0)}</td><td><span class="status ${q.status==='Negotiation Requested'?'warn':''}">${q.status}</span></td><td><button class="btn light" style="padding:7px 10px" onclick="convertQuote('${q.id}')">Create Order</button></td></tr>`).join("");let paymentRows=document.querySelector("#paymentRows");if(paymentRows)paymentRows.innerHTML=(db.payments||[]).slice(0,10).map(p=>`<tr><td>${p.id}</td><td>${p.orderId}</td><td>${p.customer}</td><td>${money(p.amount,p.currency||"AED")}</td><td><span class="status">${p.method}</span></td><td>${p.date}</td></tr>`).join("");let invoiceRows=document.querySelector("#invoiceRows");if(invoiceRows)invoiceRows.innerHTML=db.orders.slice(0,10).map(o=>`<tr><td>INV-${o.id.slice(3)}</td><td>${o.name}</td><td>${money(o.total,o.currency||"AED")}</td><td><span class="status ${(o.status==="Payment Pending"||o.status==="Unpaid")?"warn":""}">${o.status}</span></td><td><button class="btn light" style="padding:7px 10px" onclick="recordPaymentFor('${o.id}')">${o.status==="Paid"?"Paid":"Record Payment"}</button></td></tr>`).join("");let ledger=document.querySelector("#ledgerRows");if(ledger)ledger.innerHTML=[...db.ledger,...[{type:"SALE",ref:"INV-2026-0104",desc:"Dubai Trade House LLC",credit:24850,debit:0,date:"04 Oct 2026"},{type:"PURCHASE",ref:"PO-2026-0022",desc:"Supplier purchase",credit:0,debit:11840,date:"03 Oct 2026"}]].slice(0,10).map(x=>`<tr><td>${x.date}</td><td>${x.type}</td><td>${x.ref}</td><td>${x.desc}</td><td>${x.credit?money(x.credit):"—"}</td><td>${x.debit?money(x.debit):"—"}</td></tr>`).join("");}
function stockAdjust(id,n){db.stock[id]=(db.stock[id]??findProduct(id).stock)+n;db.ledger.unshift({type:"STOCK",ref:"ADJ-"+id,desc:"Inventory adjustment",credit:0,debit:0,date:new Date().toLocaleString()});save();refreshAdmin("inventory");toast("Stock updated instantly")}
function adminAction(type){
 const titles={sales:"New Sales Order",quote:"Create Quotation",invoice:"New Invoice",purchase:"New Purchase Order",lead:"Add CRM Lead",ledger:"New Ledger Entry"};
 const m=document.querySelector("#adminModal"); if(!m)return;
 const productOptions=products.map(p=>`<option value="${p.id}">${p.id} — ${p.name}</option>`).join("");
 let body="";
 if(type==="sales") body=`<div class="formGrid"><div class="field"><label>CUSTOMER</label><input id="afName" placeholder="Customer / Company" value="Demo Customer LLC"></div><div class="field"><label>EMAIL</label><input id="afEmail" type="email" value="customer@demo.com"></div><div class="field"><label>PRODUCT</label><select id="afProduct">${productOptions}</select></div><div class="field"><label>QUANTITY</label><input id="afQty" type="number" min="1" value="10"></div></div>`;
 if(type==="quote") body=`<div class="formGrid"><div class="field"><label>CUSTOMER</label><input id="afName" value="Demo Buyer LLC"></div><div class="field"><label>PRODUCT</label><select id="afProduct">${productOptions}</select></div><div class="field"><label>QUANTITY</label><input id="afQty" type="number" min="1" value="20"></div><div class="field"><label>DISCOUNT %</label><input id="afDiscount" type="number" min="0" max="100" value="0"></div></div>`;
 if(type==="invoice") body=`<div class="formGrid"><div class="field"><label>CUSTOMER</label><input id="afName" value="Demo Customer LLC"></div><div class="field"><label>AMOUNT (AED)</label><input id="afAmount" type="number" min="0" value="2500"></div><div class="field"><label>PAYMENT STATUS</label><select id="afStatus"><option>Paid</option><option>Pending</option><option>Partial</option></select></div></div>`;
 if(type==="purchase") body=`<div class="formGrid"><div class="field"><label>SUPPLIER</label><input id="afSupplier" value="Demo Supplier"></div><div class="field"><label>PRODUCT</label><select id="afProduct">${productOptions}</select></div><div class="field"><label>QUANTITY</label><input id="afQty" type="number" min="1" value="50"></div><div class="field"><label>COST / UNIT (AED)</label><input id="afCost" type="number" min="0" step="0.01" value="10"></div></div>`;
 if(type==="lead") body=`<div class="formGrid"><div class="field"><label>LEAD / COMPANY</label><input id="afName" value="New Trading Lead"></div><div class="field"><label>EMAIL</label><input id="afEmail" type="email" value="lead@demo.com"></div><div class="field"><label>SOURCE</label><select id="afSource"><option>Instagram</option><option>WhatsApp</option><option>Website</option><option>Referral</option><option>Other</option></select></div><div class="field"><label>REQUIREMENT</label><input id="afReq" value="Product quotation request"></div></div>`;
 if(type==="ledger") body=`<div class="formGrid"><div class="field"><label>DESCRIPTION</label><input id="afDesc" value="Manual ledger entry"></div><div class="field"><label>TYPE</label><select id="afType"><option>SALE</option><option>PURCHASE</option><option>EXPENSE</option><option>RECEIPT</option></select></div><div class="field"><label>CREDIT (AED)</label><input id="afCredit" type="number" min="0" value="0"></div><div class="field"><label>DEBIT (AED)</label><input id="afDebit" type="number" min="0" value="0"></div></div>`;
 m.innerHTML=`<div class="modalCard" style="max-width:720px;padding:30px"><button class="modalClose" onclick="closeAdminModal()">✕</button><span class="kicker">SAIFEE BUSINESS ERP</span><h2>${titles[type]}</h2><p class="muted">This demo action writes to the same browser database and refreshes the relevant module immediately.</p>${body}<div style="display:flex;gap:9px;margin-top:18px"><button class="btn" onclick="saveAdminAction('${type}')">Save & Update →</button><button class="btn light" onclick="closeAdminModal()">Cancel</button></div></div>`;
 m.classList.add("open");
}
function closeAdminModal(){document.querySelector("#adminModal")?.classList.remove("open")}
function saveAdminAction(type){
 const now=new Date().toLocaleString();
 if(type==="sales"){
  const id="SO-2026-"+String(db.orders.length+200).padStart(4,"0"), name=document.querySelector("#afName").value.trim()||"Demo Customer", email=document.querySelector("#afEmail").value.trim()||"customer@demo.com", pid=document.querySelector("#afProduct").value, qty=Math.max(1,+document.querySelector("#afQty").value||1), p=findProduct(pid); if(qty>(db.stock[pid]??p.stock)){toast("Not enough stock");return} const subtotal=p.price*qty,vat=subtotal*.05,total=subtotal+vat; db.orders.unshift({id,name,email,currency:"AED",subtotal,vat,total,status:"Payment Pending",date:now}); db.quotes.unshift({id:"QT-"+id.slice(3),name,total,status:"Converted to Order"}); db.stock[pid]=(db.stock[pid]??p.stock)-qty; db.ledger.unshift({type:"SALE",ref:id,desc:"Manual sales order — "+name,credit:total,debit:0,date:now});
 } else if(type==="quote"){
  const pid=document.querySelector("#afProduct").value,p=findProduct(pid),qty=Math.max(1,+document.querySelector("#afQty").value||1),disc=Math.max(0,Math.min(100,+document.querySelector("#afDiscount").value||0)),name=document.querySelector("#afName").value.trim()||"Demo Buyer", subtotal=p.price*qty, total=(subtotal-subtotal*disc/100)*1.05; db.quotes.unshift({id:"QT-2026-"+String(db.quotes.length+37).padStart(4,"0"),name,total,status:"Draft",discount:disc,date:now,product:pid,qty});
 } else if(type==="invoice"){
  const amount=Math.max(0,+document.querySelector("#afAmount").value||0),name=document.querySelector("#afName").value.trim()||"Demo Customer",status=document.querySelector("#afStatus").value,id="INV-2026-"+String(db.orders.length+300).padStart(4,"0"); db.ledger.unshift({type:"SALE",ref:id,desc:"Invoice — "+name,credit:amount,debit:0,date:now}); db.orders.unshift({id:id.replace("INV","SO"),name,email:"invoice@demo.com",currency:"AED",subtotal:amount/1.05,vat:amount/1.05*.05,total:amount,status,date:now});
 } else if(type==="purchase"){
  const pid=document.querySelector("#afProduct").value,p=findProduct(pid),qty=Math.max(1,+document.querySelector("#afQty").value||1),cost=Math.max(0,+document.querySelector("#afCost").value||0),supplier=document.querySelector("#afSupplier").value.trim()||"Demo Supplier",amount=qty*cost,id="PO-2026-"+String(db.ledger.length+50).padStart(4,"0"); db.stock[pid]=(db.stock[pid]??p.stock)+qty; db.ledger.unshift({type:"PURCHASE",ref:id,desc:supplier+" — "+p.name,credit:0,debit:amount,date:now});
 } else if(type==="lead"){
  db.leads.unshift({name:document.querySelector("#afName").value.trim()||"New Lead",email:document.querySelector("#afEmail").value.trim()||"lead@demo.com",source:document.querySelector("#afSource").value,requirement:document.querySelector("#afReq").value.trim()||"New enquiry",status:"New",date:now});
 } else if(type==="ledger"){
  db.ledger.unshift({type:document.querySelector("#afType").value,ref:"MAN-"+Date.now().toString().slice(-6),desc:document.querySelector("#afDesc").value.trim()||"Manual entry",credit:+document.querySelector("#afCredit").value||0,debit:+document.querySelector("#afDebit").value||0,date:now});
 }
 save(); closeAdminModal(); refreshAdmin(document.querySelector(".adminPage:not(.hidden)")?.id||"dashboard"); toast("Saved successfully — module updated");
}
function recordPayment(){
 const o=db.orders.find(x=>x.status!=="Paid"); if(!o){toast("No pending payment found");return} o.status="Paid"; db.payments.unshift({id:"PAY-"+o.id.slice(3),orderId:o.id,invoiceId:"INV-"+o.id.slice(3),customer:o.name,email:o.email||"",amount:o.total,currency:o.currency||"AED",method:"Admin Recorded",status:"Paid",date:new Date().toLocaleString()}); db.ledger.unshift({type:"RECEIPT",ref:"PAY-"+o.id.slice(3),desc:"Payment received — "+o.name,credit:o.total,debit:0,date:new Date().toLocaleString()}); save(); refreshAdmin("invoices"); toast("Payment recorded and order marked Paid");
}
function recordPaymentFor(orderId){const o=db.orders.find(x=>x.id===orderId);if(!o){toast("Order not found");return}if(o.status==="Paid"){toast("Payment already recorded");return}o.status="Paid";db.payments.unshift({id:"PAY-"+orderId.slice(3),orderId:o.id,invoiceId:"INV-"+orderId.slice(3),customer:o.name,email:o.email||"",amount:o.total,currency:o.currency||"AED",method:"Admin Recorded",status:"Paid",date:new Date().toLocaleString()});db.ledger.unshift({type:"RECEIPT",ref:"PAY-"+orderId.slice(3),desc:"Payment received — "+o.name,credit:o.total,debit:0,date:new Date().toLocaleString()});save();refreshAdmin("invoices");toast("Payment recorded — invoice marked Paid")}
function scanBarcode(){
 const raw=prompt("Scan / enter barcode or SKU:\n89010001001 = TS-1001\nEnter SKU for demo:","TS-1001"); if(!raw)return; const map={"89010001001":"TS-1001"}; const id=map[raw]||raw.toUpperCase(); const p=findProduct(id); if(!p){toast("Barcode/SKU not found");return} navAdmin("inventory"); setTimeout(()=>toast(p.name+" found • Stock: "+(db.stock[id]??p.stock)),50);
}
function convertQuote(id){const q=db.quotes.find(x=>x.id===id);if(!q){toast("Quotation not found");return}if(q.status==="Converted to Order"){toast("Quotation already converted");return}const now=new Date().toLocaleString();const orderId="SO-2026-"+String(db.orders.length+104).padStart(4,"0");let items=[];if(q.product){const p=findProduct(q.product);const qty=Math.max(1,q.qty||1);if(qty>(db.stock[q.product]??p.stock)){toast("Not enough stock");return}db.stock[q.product]-=qty;items=[{id:q.product,qty}]}q.status="Converted to Order";db.orders.unshift({id:orderId,name:q.name,email:"quote@customer.com",currency:"AED",subtotal:q.total/1.05,vat:q.total-q.total/1.05,total:q.total,status:"Payment Pending",date:now,items});db.ledger.unshift({type:"SALE",ref:orderId,desc:"Quotation converted — "+q.name,credit:q.total,debit:0,date:now});save();toast(q.id+" converted to sales order "+orderId);refreshAdmin("quotes");}
function exportReport(){const data=JSON.stringify({generated:new Date().toISOString(),orders:db.orders,quotes:db.quotes,leads:db.leads,payments:db.payments,ledger:db.ledger,stock:db.stock},null,2);const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([data],{type:"application/json"}));a.download="saifee-management-report.json";a.click();toast("Management report exported")}
function exportDemo(){let data=JSON.stringify(db,null,2);let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([data],{type:"application/json"}));a.download="saifey-demo-backup.json";a.click()}
document.addEventListener("DOMContentLoaded",()=>{renderCart();initCatalog();if(document.querySelector("#fxBanner"))initSiteFxBanner();if(document.querySelector("#adminRoot")){guard();navAdmin("dashboard")}});


function renderCartPage(){
 const box=document.querySelector('#cartPageItems'),summary=document.querySelector('#cartPageSummary'); if(!box||!summary)return;
 if(!cart.length){box.innerHTML='<div class="panel"><h3>Your cart is empty</h3><p class="muted">Choose products from the catalogue to begin an order.</p><a class="btn" href="catalog.html">Browse Catalogue →</a></div>';summary.innerHTML='';return}
 let subtotal=0; box.innerHTML=cart.map(i=>{const p=findProduct(i.id),t=p.price*i.qty;subtotal+=t;return `<div class="panel" style="display:grid;grid-template-columns:90px 1fr auto;gap:15px;align-items:center"><img src="${p.img}" style="width:90px;height:90px;object-fit:cover;border-radius:12px"><div><b>${p.name}</b><div class="muted">SKU ${p.id} • ${money(p.price)} / ${p.unit}</div><div style="margin-top:8px">Quantity: <b>${i.qty}</b></div></div><div style="text-align:right"><b>${money(t)}</b><br><button class="btn light" style="margin-top:8px;padding:7px 10px" onclick="removeCart('${p.id}');renderCartPage()">Remove</button></div></div>`}).join('');
 const vat=subtotal*.05,total=subtotal+vat;summary.innerHTML=`<div style="display:flex;justify-content:space-between"><span>Subtotal</span><b>${money(subtotal)}</b></div><div style="display:flex;justify-content:space-between;margin-top:8px"><span>VAT 5%</span><b>${money(vat)}</b></div><div style="display:flex;justify-content:space-between;margin-top:12px;font-size:21px"><span>Total</span><b>${money(total)}</b></div><button class="btn" style="width:100%;justify-content:center;margin-top:18px" onclick="proceedToPayment()">Proceed to Payment →</button><button class="btn light" style="width:100%;justify-content:center;margin-top:8px" onclick="wa('Hello SAIFEE, I need help with my cart/order.')">WhatsApp Order Desk</button>`;
}
function initPayment(){
 const p=getPendingCheckout(),items=document.querySelector('#paymentItems'),totals=document.querySelector('#paymentTotals');
 if(!p||!p.items.length){location.href='cart.html';return}
 const savedCustomer=JSON.parse(localStorage.getItem('saifee_checkout_customer')||'null');
 if(savedCustomer){if(document.querySelector('#payName'))document.querySelector('#payName').value=savedCustomer.name||'';if(document.querySelector('#payEmail'))document.querySelector('#payEmail').value=savedCustomer.email||'';}
 let subtotal=0;items.innerHTML=p.items.map(i=>{const prod=findProduct(i.id),t=prod.price*i.qty;subtotal+=t;return `<div style="display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid var(--line)"><span>${prod.name}<br><small class="muted">${i.qty} × ${money(prod.price)}</small></span><b>${money(t)}</b></div>`}).join('');const vat=subtotal*.05;totals.innerHTML=`<div style="display:flex;justify-content:space-between"><span>Subtotal</span><b>${money(subtotal)}</b></div><div style="display:flex;justify-content:space-between;margin-top:8px"><span>VAT 5%</span><b>${money(vat)}</b></div><div style="display:flex;justify-content:space-between;margin-top:12px;font-size:22px"><span>Total (AED)</span><b>${money(subtotal+vat)}</b></div>`;
 const country=detectCountry();setDetectedCountry(country,"automatic browser detection");updateFxPreview();autoDetectCustomerLocation();
 document.querySelector('#payCountry')?.addEventListener('change',()=>{const c=document.querySelector('#payCountry').value;const cur=document.querySelector('#payCurrency');if(cur){cur.value=fxProfile(c).currency;cur.dataset.autoCurrency='true'}updateFxPreview()});
 document.querySelector('#payCurrency')?.addEventListener('change',updateFxPreview);
}
function initPaymentSuccess(){
 const id=new URLSearchParams(location.search).get('order'),o=db.orders.find(x=>x.id===id),box=document.querySelector('#successDetails');
 if(!o){box.innerHTML='<b>Order not found in this browser.</b>';return}
 box.innerHTML=`<b>Order:</b> ${o.id}<br><b>Invoice:</b> INV-${o.id.slice(3)}<br><b>Customer:</b> ${o.name}<br><b>Payment status:</b> ${o.paymentStatus||o.status||'Paid'}<br><b>Method:</b> ${o.paymentMethod||'—'}<br><b>Base total:</b> ${money(o.total,'AED')}<br><b>Customer display total:</b> ${formatFxAmount(o.displayTotal||o.total,o.currency||'AED')}`;
}
function wa(msg='Hello SAIFEE, I need assistance.'){window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank','noopener')}
