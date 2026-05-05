document.addEventListener("DOMContentLoaded", function() {
    // Initialize Lucide icons
    if (window.lucide) lucide.createIcons();

    const modal = document.querySelector(".info-modal");
    const modalText = modal.querySelector(".modal-text");
    const closeBtn = modal.querySelector(".close-btn");

    // Open modal on info button click
    document.querySelectorAll(".info-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            modalText.textContent = btn.dataset.info;
            modal.style.display = "flex";
        });
    });

    // Close modal when clicking close button
    closeBtn.addEventListener("click", () => { 
        modal.style.display = "none"; 
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", e => { 
        if (e.target === modal) modal.style.display = "none"; 
    });
});