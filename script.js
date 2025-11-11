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

/* =======================
   ✅ IMAGE POPUP WITH ZOOM
   ======================= */

let scale = 1;
let isDragging = false;
let lastX = 0, lastY = 0;
let posX = 0, posY = 0;

const modal = document.getElementById("image-modal");
const modalBox = modal.querySelector(".image-box");
const modalImg = document.getElementById("modal-img");

/* ✅ OPEN IMAGE MODAL */
function openImageModal(src) {
  scale = 1;
  posX = 0;
  posY = 0;

  modalImg.src = src;
  modalBox.style.transform = `translate(0px, 0px) scale(1)`;

  modal.style.display = "flex";
  document.body.classList.add("modal-open");
}

/* ✅ CLOSE IMAGE MODAL */
function closeImage() {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
}

/* ✅ CLOSE WHEN CLICK OUTSIDE IMAGE */
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeImage();
  }
});

/* ✅ SCROLL ZOOM */
modal.addEventListener("wheel", (e) => {
  e.preventDefault();

  if (e.deltaY < 0) scale += 0.1;
  else scale = Math.max(1, scale - 0.1);

  modalBox.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
});

/* ✅ DRAG IMAGE */
modalImg.addEventListener("mousedown", (e) => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  posX += (e.clientX - lastX);
  posY += (e.clientY - lastY);
  lastX = e.clientX;
  lastY = e.clientY;

  modalBox.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

/* ✅ DOUBLE TAP RESET (MOBILE) */
let lastTap = 0;

modalImg.addEventListener("touchstart", () => {
  const now = Date.now();
  if (now - lastTap < 300) {
    scale = 1;
    posX = 0;
    posY = 0;
    modalBox.style.transform = `translate(0px,0px) scale(1)`;
  }
  lastTap = now;
});

/* ✅ PROJECT SCROLLER BUTTONS */
function scrollProjects(amount) {
  const container = document.querySelector(".projects-container");
  container.scrollBy({ left: amount, behavior: "smooth" });
}


