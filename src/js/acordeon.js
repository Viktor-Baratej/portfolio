document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".accordion-header").forEach(header => {
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
  