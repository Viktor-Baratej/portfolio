document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach(header => {
    // Додаємо SVG стрілку, якщо її немає
    if (!header.querySelector('.accordion-icon')) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "accordion-icon");
      svg.setAttribute("viewBox", "0 0 24 24");
    
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M5 8l7 7 7-7");
      path.setAttribute("fill", "none");
    
      svg.appendChild(path);
      header.appendChild(svg);
    }
    

    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isOpen = content.classList.contains("open");

      document.querySelectorAll(".accordion-content").forEach(c => {
        c.classList.remove("open");
        c.style.maxHeight = null;
      });

      document.querySelectorAll(".accordion-header").forEach(h => {
        h.classList.remove("active");
      });

      if (!isOpen) {
        content.classList.add("open");
        header.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
