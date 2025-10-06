/* script.js
 - product list + theme toggle + simple contact handler
*/

// ====== Configuration: update image filenames here if needed ======
const PRODUCTS = [
  { id:1, title: "Silver Bow Studs", price: "₹120", img: "images/p1.jpg", desc: "Cute bow studs – perfect for everyday wear." },
  { id:2, title: "Heart & Star Pack", price: "₹150", img: "images/p2.jpg", desc: "Set of mixed studs with hearts & stars." },
  { id:3, title: "Pearl Necklace", price: "₹350", img: "images/p3.jpg", desc: "Delicate pearl-style necklace." },
  { id:4, title: "Mini Cross Pendant", price: "₹299", img: "images/p4.jpg", desc: "Detailed cross pendant for statement looks." },
  { id:5, title: "Green Heart Studs", price: "₹140", img: "images/p5.jpg", desc: "Pastel green heart studs." },
  { id:6, title: "Layered Chains", price: "₹420", img: "images/p6.jpg", desc: "Stylish layered chains for modern outfits." },
  { id:7, title: "Bow Trio", price: "₹130", img: "images/p7.jpg", desc: "Small bows, set of three studs." },
  { id:8, title: "Long Charm Necklace", price: "₹460", img: "images/p8.jpg", desc: "Elegant long necklace with charm." },
  { id:9, title: "Beaded Ring", price: "₹110", img: "images/p9.jpg", desc: "Colorful beaded ring." },
  { id:10, title: "Gothic Cross", price: "₹499", img: "images/p10.jpg", desc: "Bold gothic cross pendant." },
  { id: 11, title: "Classic Cross Chain", price: 320, img: "images/p11.jpg", desc: "Timeless cross pendant necklace." },
  { id: 12, title: "Planet Pendant", price: 280, img: "images/p12.jpg", desc: "Unique planet-themed pendant chain." },
  { id: 13, title: "Red Gem Ring", price: 190, img: "images/p13.jpg", desc: "Stylish red-gem ring." },
  { id: 14, title: "Crystal Heart Studs", price: 210, img: "images/p14.jpg", desc: "Sparkly crystal heart earrings." },

];

// ====== utility DOM ready ======
document.addEventListener("DOMContentLoaded", () => {
  // set years
  const y = new Date().getFullYear();
  ["year","year2","year3","year4"].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  // populate featured on index
  const featuredGrid = document.getElementById("featuredGrid");
  if(featuredGrid){
    PRODUCTS.slice(0,6).forEach(p => featuredGrid.appendChild(createProductCard(p)));
  }

  // populate product grid
  const productGrid = document.getElementById("productGrid");
  if(productGrid){
    PRODUCTS.forEach(p => productGrid.appendChild(createProductCard(p)));
  }

  initTheme();
  wireMobileMenu();
});

// create a product card element
function createProductCard(product){
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.img}" alt="${escapeHtml(product.title)}" loading="lazy" />
    <div class="pbody">
      <h4>${escapeHtml(product.title)}</h4>
      <p>${escapeHtml(product.desc)}</p>
      <div class="price">${product.price}</div>
    </div>
  `;
  // optional click to open larger
  card.addEventListener("click", () => openLightbox(product));
  return card;
}

function openLightbox(product){
  const overlay = document.createElement("div");
  overlay.style= "position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:9999";
  overlay.innerHTML = `
    <div style="max-width:900px;width:95%;background:var(--bg);border-radius:12px;overflow:hidden">
      <div style="display:flex;gap:20px;flex-wrap:wrap">
        <div style="flex:1;min-width:260px"><img src="${product.img}" style="width:100%;height:100%;object-fit:cover" alt="${escapeHtml(product.title)}"></div>
        <div style="flex:1;padding:20px">
          <h2>${escapeHtml(product.title)}</h2>
          <p>${escapeHtml(product.desc)}</p>
          <p style="font-weight:700;color:var(--accent)">${product.price}</p>
          <div style="margin-top:18px">
            <button id="closeLight" class="btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
  overlay.addEventListener("click", e => {
    if(e.target === overlay) document.body.removeChild(overlay);
  });
  document.body.appendChild(overlay);
  document.getElementById("closeLight").addEventListener("click", ()=> document.body.removeChild(overlay));
}

function escapeHtml(s){
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// ===== Contact form behavior (simple demo) =====
function handleForm(e){
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  alert("Thanks, " + name + "! Your message has been recorded (demo). We will contact you at " + email + ".");
  form.reset();
  return false;
}

// ====== Theme handling ======
function initTheme(){
  const stored = localStorage.getItem("aj_theme");
  if(stored) document.documentElement.setAttribute("data-theme", stored);
  // wire toggle buttons (multiple across pages)
  document.querySelectorAll("#theme-toggle, #theme-toggle-2, #theme-toggle-3, #theme-toggle-4").forEach(btn => {
    btn?.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("aj_theme", next);
    });
  });
}

// mobile menu (minimal)
function wireMobileMenu(){
  const btns = [
    document.getElementById("mobileMenuBtn"),
    document.getElementById("mobileMenuBtn2"),
    document.getElementById("mobileMenuBtn3"),
    document.getElementById("mobileMenuBtn4")
  ];
  btns.forEach(btn => {
    if(!btn) return;
    btn.addEventListener("click", ()=>{
      const nav = document.querySelector(".nav");
      if(!nav) return;
      const isVisible = getComputedStyle(nav).display !== "none";
      nav.style.display = isVisible ? "none" : "flex";
    });
  });
}
