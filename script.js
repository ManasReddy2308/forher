const petalLayer = document.getElementById("petalLayer");
const sparkleLayer = document.getElementById("sparkleLayer");
const curtain = document.getElementById("transitionCurtain");

const sectionIds = ["home","message","surprise","memories","final"];
const navLinks = [...document.querySelectorAll(".site-nav nav a")];

function random(min,max){ return Math.random()*(max-min)+min; }

function makePetal(extraClass=""){
  const p=document.createElement("span");
  p.className=`petal ${extraClass}`;
  p.style.left=random(-3,103)+"vw";
  p.style.setProperty("--drift",random(-180,180)+"px");
  p.style.setProperty("--rot",random(180,720)+"deg");
  p.style.animationDuration=random(5,11)+"s";
  p.style.animationDelay=random(-9,0)+"s";
  p.style.transform=`rotate(${random(0,360)}deg)`;
  p.style.opacity=random(.45,.95);
  p.style.width=random(8,17)+"px";
  p.style.height=random(13,25)+"px";
  petalLayer.appendChild(p);
  setTimeout(()=>p.remove(),13000);
}
for(let i=0;i<34;i++) makePetal();

function makeSparkle(){
  const s=document.createElement("span");
  s.className="sparkle";
  s.style.left=random(2,98)+"vw";
  s.style.top=random(4,96)+"vh";
  s.style.animationDelay=random(0,2)+"s";
  sparkleLayer.appendChild(s);
}
for(let i=0;i<55;i++) makeSparkle();

function flowerShower(count=100){
  for(let i=0;i<count;i++){
    setTimeout(()=>makePetal("burst"),i*22);
  }
  // Add glowing hearts to the shower
  for(let i=0;i<26;i++){
    setTimeout(()=>{
      const h=document.createElement("span");
      h.textContent=Math.random()>.5?"♥":"✿";
      h.style.position="fixed";
      h.style.left=random(5,95)+"vw";
      h.style.top="-30px";
      h.style.zIndex="1950";
      h.style.color=Math.random()>.5?"#ff91bf":"#ffd0e2";
      h.style.fontSize=random(16,30)+"px";
      h.style.textShadow="0 0 12px #ff72ad";
      h.style.animation=`heartFall ${random(4,7)}s linear forwards`;
      document.body.appendChild(h);
      setTimeout(()=>h.remove(),8000);
    },i*70);
  }
}

const extraStyle=document.createElement("style");
extraStyle.textContent="@keyframes heartFall{to{transform:translateY(110vh) rotate(360deg);opacity:0}}";
document.head.appendChild(extraStyle);

function transitionTo(selector, shower=false){
  curtain.classList.add("show");
  document.body.classList.add("no-scroll");
  if(shower) flowerShower(115);
  setTimeout(()=>{
    document.querySelector(selector)?.scrollIntoView({behavior:"instant"});
  },420);
  setTimeout(()=>{
    curtain.classList.remove("show");
    document.body.classList.remove("no-scroll");
  },800);
}

document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const target=btn.dataset.next;
    const isMemories=target==="#memories";
    transitionTo(target,isMemories);
  });
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const id=entry.target.id;
    navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));
    entry.target.querySelectorAll(".section-heading,.letter,.cake,.final-content,.love-heart").forEach(el=>{
      el.classList.add("reveal");
    });
  });
},{threshold:.5});
document.querySelectorAll(".story-section").forEach(s=>observer.observe(s));

// Make the ordinary navigation feel smooth and keep the active state correct.
navLinks.forEach(link=>{
  link.addEventListener("click",()=>{
    navLinks.forEach(a=>a.classList.remove("active"));
    link.classList.add("active");
  });
});

// A gentle continuous petal shower while the visitor is on the page.
setInterval(()=>{
  if(document.visibilityState==="visible"){
    makePetal();
  }
},900);

// The "wish" button on the memories page gets a little extra magic.
document.querySelector(".another-btn")?.addEventListener("click",()=>{
  flowerShower(75);
});
