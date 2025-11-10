/* ✅ OPEN ARTICLE MODAL */
function openModal(id) {
  document.getElementById(id).style.display = "block";
  document.body.classList.add("modal-open");
}

/* ✅ CLOSE ARTICLE MODAL */
function closeModal(id) {
  document.getElementById(id).style.display = "none";
  document.body.classList.remove("modal-open");
}

/* ✅ OPEN IMAGE POPUP */
function openImage(src) {
  document.getElementById("modal-img").src = src;
  document.getElementById("image-modal").style.display = "block";
}

/* ✅ CLOSE IMAGE POPUP */
function closeImage() {
  document.getElementById("image-modal").style.display = "none";
}

/* ✅ Close image popup when clicking outside */
window.onclick = function(event) {
  let modal = document.getElementById("image-modal");
  if (event.target === modal) {
    closeImage();
  }
  
}
let scale = 1;
let isPanning = false;
let startX, startY;
let translateX = 0, translateY = 0;

const modalImg = document.getElementById("modal-img");
const imageModal = document.getElementById("image-modal");

/* ---------------- DESKTOP DOUBLE CLICK ZOOM ---------------- */
modalImg.addEventListener("dblclick", () => {
  if (scale === 1) scale = 2;
  else scale = 1;

  translateX = 0;
  translateY = 0;
  applyTransform();
});

/* ---------------- DESKTOP DRAG ---------------- */
modalImg.addEventListener("mousedown", (e) => {
  isPanning = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  modalImg.style.cursor = "grabbing";
});

modalImg.addEventListener("mousemove", (e) => {
  if (!isPanning) return;

  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  applyTransform();
});

window.addEventListener("mouseup", () => {
  isPanning = false;
  modalImg.style.cursor = "grab";
});

/* ---------------- MOBILE TOUCH SUPPORT ---------------- */

// double-tap zoom
let lastTap = 0;
modalImg.addEventListener("touchend", (e) => {
  let now = Date.now();
  if (now - lastTap < 300) {
    // double tap
    scale = (scale === 1 ? 2 : 1);
    translateX = 0;
    translateY = 0;
    applyTransform();
  }
  lastTap = now;
});

// dragging
modalImg.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    const t = e.touches[0];
    startX = t.clientX - translateX;
    startY = t.clientY - translateY;
  }
});

modalImg.addEventListener("touchmove", (e) => {
  if (e.touches.length === 1) {
    const t = e.touches[0];
    translateX = t.clientX - startX;
    translateY = t.clientY - startY;
    applyTransform();
  }
});

// pinch-zoom
let startDistance = 0;
modalImg.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (!startDistance) startDistance = dist;
    else {
      const zoom = dist / startDistance;
      scale = Math.min(Math.max(1, scale * zoom), 4);   // limit scale
      applyTransform();
    }
  }
});

modalImg.addEventListener("touchend", () => {
  startDistance = 0;
});

/* ---------------- APPLY TRANSFORM ---------------- */
function applyTransform() {
  modalImg.style.transform =
    `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

