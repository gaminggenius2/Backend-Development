
// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // === DOM ELEMENTS ===
  const reviewsContainer = document.getElementById("reviewsContainer");
  const reviewForm = document.getElementById("reviewForm");
  const alertBox = document.getElementById("alertContainer");
  const userId = localStorage.getItem("user_id");

  /*=================================================================
    STAR RATING SELECTION
    Handles interactive star rating selection
    =================================================================*/
  document.querySelectorAll("#starRating i").forEach(star => {
    star.addEventListener("click", function () {
      const rating = this.getAttribute("data-rating");
      document.getElementById("selected-rating").value = rating;

      // Update visual star display
      document.querySelectorAll("#starRating i").forEach((s, index) => {
        if (index < rating) {
          // Fill stars up to selected rating
          s.classList.replace("bi-star", "bi-star-fill");
          s.classList.add("text-warning");
        } else {
          // Empty stars after selected rating
          s.classList.replace("bi-star-fill", "bi-star");
          s.classList.remove("text-warning");
        }
      });
    });
  });

  /*=================================================================
    FUNCTION: Load Reviews
    Fetches and displays all reviews from the database
    =================================================================*/
  function loadReviews() {
    fetchMethod(
      `http://localhost:3000/api/reviews`,
      (status, data) => {
        // Handle error response
        if (status !== 200) {
          showAlert("Failed to load reviews", "warning");
          return;
        }

        // Clear existing content
        reviewsContainer.innerHTML = "";
        
        // Handle empty reviews
        if (!data || !data.length) {
          reviewsContainer.innerHTML = `
            <div class="text-center text-muted py-5">
              <i class="bi bi-chat-quote fs-1 opacity-25"></i>
              <p class="mt-3">No reviews yet. Be the first to share your experience!</p>
            </div>
          `;
          return;
        }

        // === RENDER EACH REVIEW ===
        data.forEach(review => {
          const card = document.createElement("div");
          card.className = "review-card card mb-3 bg-dark text-white p-3 border-secondary";
          
          // Build review HTML
          card.innerHTML = `
            <div class="review-header d-flex justify-content-between align-items-start mb-2">
              <div>
                <strong class="text-info">
                  <i class="bi bi-person-circle me-1"></i>
                  ${review.username || `User #${review.user_id}`}
                </strong>
                <div class="review-rating mt-1">
                  ${renderStars(review.rating)}
                  <span class="text-muted ms-2">(${review.rating}/5)</span>
                </div>
              </div>
              <small class="text-secondary">
                <i class="bi bi-clock me-1"></i>
                ${new Date(review.created_at).toLocaleDateString()}
              </small>
            </div>
            ${review.comment ? `
              <div class="review-comment mt-2">
                <i class="bi bi-quote text-muted"></i>
                <span class="ms-2">${review.comment}</span>
              </div>
            ` : ''}
          `;
          
          // Add card to container
          reviewsContainer.appendChild(card);
        });
      },
      "GET"
    );
  }

  /*=================================================================
    FORM SUBMISSION HANDLER
    Handles new review submission
    =================================================================*/
  if (reviewForm) {
    reviewForm.addEventListener("submit", e => {
      e.preventDefault();

      // Check if user is logged in
      if (!userId) {
        showAlert("Please log in to submit a review!", "warning");
        return;
      }

      // Get form values
      const rating = document.getElementById("selected-rating").value;
      const comment = document.getElementById("reviewText").value.trim();

      // Validate rating
      if (!rating) {
        showAlert("Please select a rating", "warning");
        return;
      }

      // === SUBMIT REVIEW ===
      fetchMethod(
        `http://localhost:3000/api/reviews`,
        (status, data) => {
          if (status !== 201) {
            showAlert(data.message || "Failed to submit review", "danger");
            return;
          }
          
          // Success - show message and refresh
          showAlert("Review submitted successfully! Thank you for your feedback.", "success");
          reviewForm.reset();
          resetStars();
          
          // Reload reviews after short delay
          setTimeout(loadReviews, 500);
        },
        "POST",
        { 
          user_id: Number(userId), 
          rating: Number(rating), 
          comment: comment || null 
        }
      );
    });
  }

  /*=================================================================
    HELPER: Render Stars
    Generates HTML for star rating display
    =================================================================*/
  function renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Filled star
        stars += `<i class="bi bi-star-fill text-warning"></i>`;
      } else {
        // Empty star
        stars += `<i class="bi bi-star text-secondary"></i>`;
      }
    }
    return stars;
  }

  /*=================================================================
    HELPER: Reset Stars
    Clears star rating selection
    =================================================================*/
  function resetStars() {
    document.querySelectorAll("#starRating i").forEach(star => {
      star.classList.replace("bi-star-fill", "bi-star");
      star.classList.remove("text-warning");
    });
    document.getElementById("selected-rating").value = "";
  }

  /*=================================================================
    HELPER: Show Alert
    Displays a Bootstrap alert message
    =================================================================*/
  function showAlert(message, type = "danger") {
    alertBox.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      const alert = alertBox.querySelector('.alert');
      if (alert) {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 150);
      }
    }, 5000);
  }

  // === INITIALIZE ===
  // Load reviews when page loads
  loadReviews();
});

