// T3leem - Main JavaScript File
// Pure Vanilla JavaScript - No frameworks

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initSidebar();
  initModals();
  initDropdowns();
  initTabs();
  initImagePreview();
  initCourseViewer();
  initCommunity();
  initNotifications();
});

// ==================== SIDEBAR FUNCTIONALITY ====================
function initSidebar() {
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
      if (overlay) {
        overlay.classList.toggle("hidden");
      }
    });

    if (overlay) {
      overlay.addEventListener("click", () => {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
      });
    }
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
      if (overlay) {
        overlay.classList.toggle("hidden");
      }
    });
  }
}

// ==================== MODAL FUNCTIONALITY ====================
function initModals() {
  const modalTriggers = document.querySelectorAll("[data-modal-target]");
  const modalCloses = document.querySelectorAll("[data-modal-close]");

  modalTriggers.forEach((trigger) => {
    const modalId = trigger.dataset.modalTarget;
    const modal = document.getElementById(modalId);

    if (modal) {
      trigger.addEventListener("click", () => {
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    }
  });

  modalCloses.forEach((close) => {
    const modal = close.closest(".modal");
    if (modal) {
      close.addEventListener("click", () => {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
      });
    }
  });

  // Close modal on outside click
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });
  });
}

// ==================== DROPDOWN FUNCTIONALITY ====================
function initDropdowns() {
  const dropdowns = document.querySelectorAll("[data-dropdown-toggle]");

  dropdowns.forEach((dropdown) => {
    const dropdownId = dropdown.dataset.dropdownToggle;
    const dropdownMenu = document.getElementById(dropdownId);

    if (dropdownMenu) {
      dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("hidden");
      });

      // Close on outside click
      document.addEventListener("click", () => {
        dropdownMenu.classList.add("hidden");
      });

      dropdownMenu.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  });
}

// ==================== TABS FUNCTIONALITY ====================
function initTabs() {
  const tabButtons = document.querySelectorAll("[data-tab]");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;
      const tabGroup = button.dataset.tabGroup || "default";

      // Remove active class from all buttons in this group
      document
        .querySelectorAll(`[data-tab-group="${tabGroup}"]`)
        .forEach((btn) => {
          btn.classList.remove("bg-[#3c5750]", "text-white");
          btn.classList.add("text-gray-600", "hover:bg-gray-100");
        });

      // Add active class to clicked button
      button.classList.add("bg-[#3c5750]", "text-white");
      button.classList.remove("text-gray-600", "hover:bg-gray-100");

      // Hide all tab contents in this group
      document
        .querySelectorAll(`[data-tab-content="${tabGroup}"]`)
        .forEach((content) => {
          content.classList.add("hidden");
        });

      // Show selected tab content
      const targetContent = document.getElementById(tabId);
      if (targetContent) {
        targetContent.classList.remove("hidden");
      }
    });
  });
}

// ==================== IMAGE PREVIEW FUNCTIONALITY ====================
function initImagePreview() {
  const imageInputs = document.querySelectorAll("[data-image-preview]");

  imageInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const previewId = this.dataset.imagePreview;
      const preview = document.getElementById(previewId);

      if (preview && this.files && this.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.classList.remove("hidden");
        };

        reader.readAsDataURL(this.files[0]);
      }
    });
  });
}

// ==================== COURSE VIEWER FUNCTIONALITY ====================
function initCourseViewer() {
  const videoContainer = document.getElementById("video-container");
  const playBtn = document.getElementById("play-btn");
  const progressBar = document.getElementById("progress-bar");
  const volumeSlider = document.getElementById("volume-slider");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const lessonItems = document.querySelectorAll(".lesson-item");
  const nextLessonPopup = document.getElementById("next-lesson-popup");

  let isPlaying = false;
  let currentTime = 0;
  let duration = 596; // 9:56 in seconds

  // Play/Pause toggle
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      updatePlayPauseIcon();
      simulateVideoProgress();
    });
  }

  function updatePlayPauseIcon() {
    const icon = playBtn.querySelector("i");
    if (icon) {
      icon.className = isPlaying
        ? "fas fa-pause text-2xl"
        : "fas fa-play text-2xl";
    }
  }

  function simulateVideoProgress() {
    if (isPlaying) {
      const progressInterval = setInterval(() => {
        if (!isPlaying || currentTime >= duration) {
          clearInterval(progressInterval);
          if (currentTime >= duration && nextLessonPopup) {
            nextLessonPopup.classList.remove("hidden");
          }
          return;
        }
        currentTime += 1;
        updateProgress();
      }, 1000);
    }
  }

  function updateProgress() {
    if (progressBar) {
      const progress = (currentTime / duration) * 100;
      progressBar.style.width = progress + "%";

      // Update time display
      const currentTimeEl = document.getElementById("current-time");
      const durationEl = document.getElementById("duration");

      if (currentTimeEl) currentTimeEl.textContent = formatTime(currentTime);
      if (durationEl) durationEl.textContent = formatTime(duration);
    }
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // Volume control
  if (volumeSlider) {
    volumeSlider.addEventListener("input", function () {
      const volume = this.value;
      // In real app, this would control actual video volume
      console.log("Volume:", volume);
    });
  }

  // Fullscreen
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
      if (videoContainer) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          videoContainer.requestFullscreen();
        }
      }
    });
  }

  // Lesson navigation
  lessonItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all lessons
      lessonItems.forEach((l) => l.classList.remove("bg-[#3c5750]"));
      lessonItems.forEach((l) => l.classList.add("hover:bg-gray-700"));

      // Add active class to clicked lesson
      this.classList.add("bg-[#3c5750]");
      this.classList.remove("hover:bg-gray-700");

      // Update video title
      const lessonTitle = this.querySelector("h4");
      if (lessonTitle) {
        const videoTitle = document.getElementById("video-title");
        if (videoTitle) videoTitle.textContent = lessonTitle.textContent;
      }

      // Reset progress
      currentTime = 0;
      isPlaying = false;
      updatePlayPauseIcon();
      updateProgress();
    });
  });

  // Skip next lesson
  const skipNextBtn = document.getElementById("skip-next-btn");
  if (skipNextBtn && nextLessonPopup) {
    skipNextBtn.addEventListener("click", () => {
      nextLessonPopup.classList.add("hidden");
      // Move to next lesson
      const activeLesson = document.querySelector(
        ".lesson-item.bg-\\[\\#3c5750\\]",
      );
      if (activeLesson && activeLesson.nextElementSibling) {
        activeLesson.nextElementSibling.click();
        isPlaying = true;
        updatePlayPauseIcon();
        simulateVideoProgress();
      }
    });
  }

  // Close popup
  const closePopupBtn = document.getElementById("close-popup-btn");
  if (closePopupBtn && nextLessonPopup) {
    closePopupBtn.addEventListener("click", () => {
      nextLessonPopup.classList.add("hidden");
    });
  }
}

// ==================== COMMUNITY PAGE FUNCTIONALITY ====================
function initCommunity() {
  const createPostBox = document.getElementById("create-post-box");
  const postContent = document.getElementById("post-content");
  const postImageInput = document.getElementById("post-image");
  const imagePreviewContainer = document.getElementById(
    "image-preview-container",
  );
  const postImagePreview = document.getElementById("post-image-preview");
  const submitPostBtn = document.getElementById("submit-post");
  const postsFeed = document.getElementById("posts-feed");

  // Focus on post box
  if (createPostBox && postContent) {
    createPostBox.addEventListener("click", () => {
      postContent.focus();
      createPostBox.classList.add("ring-2", "ring-[#3c5750]");
    });

    postContent.addEventListener("blur", () => {
      createPostBox.classList.remove("ring-2", "ring-[#3c5750]");
    });
  }

  // Image preview for post
  if (postImageInput && postImagePreview && imagePreviewContainer) {
    postImageInput.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          postImagePreview.src = e.target.result;
          imagePreviewContainer.classList.remove("hidden");
        };
        reader.readAsDataURL(this.files[0]);
      }
    });

    // Remove image button
    const removeImageBtn = document.getElementById("remove-post-image");
    if (removeImageBtn) {
      removeImageBtn.addEventListener("click", () => {
        postImageInput.value = "";
        imagePreviewContainer.classList.add("hidden");
        postImagePreview.src = "";
      });
    }
  }

  // Submit post
  if (submitPostBtn && postsFeed) {
    submitPostBtn.addEventListener("click", () => {
      const content = postContent ? postContent.value : "";
      const hasImage =
        !imagePreviewContainer ||
        imagePreviewContainer.classList.contains("hidden") === false;

      if (!content.trim() && !hasImage) {
        alert("Please add some content or an image to your post.");
        return;
      }

      // Create new post HTML
      const newPost = document.createElement("div");
      newPost.className =
        "bg-white rounded-2xl p-6 shadow-sm border border-gray-100";

      const timestamp = "Just now";
      const userName = "Ahmed Hassan"; // Current user
      const userAvatar =
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";

      let imageHtml = "";
      if (hasImage) {
        const imageSrc = postImagePreview ? postImagePreview.src : "";
        imageHtml = `
                    <div class="mt-4 rounded-xl overflow-hidden">
                        <img src="${imageSrc}" alt="Post image" class="w-full h-64 object-cover">
                    </div>
                `;
      }

      newPost.innerHTML = `
                <div class="flex items-start gap-4">
                    <img src="${userAvatar}" alt="${userName}" class="w-12 h-12 rounded-full object-cover">
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <h4 class="font-semibold text-gray-900">${userName}</h4>
                            <span class="text-gray-400">•</span>
                            <span class="text-gray-500 text-sm">${timestamp}</span>
                        </div>
                        <p class="mt-2 text-gray-700">${content}</p>
                        ${imageHtml}
                        <div class="mt-4 flex items-center gap-6">
                            <button class="flex items-center gap-2 text-gray-500 hover:text-[#3c5750] transition-colors like-btn">
                                <i class="far fa-heart"></i>
                                <span class="like-count">0</span>
                            </button>
                            <button class="flex items-center gap-2 text-gray-500 hover:text-[#3c5750] transition-colors">
                                <i class="far fa-comment"></i>
                                <span>Comment</span>
                            </button>
                            <button class="flex items-center gap-2 text-gray-500 hover:text-[#3c5750] transition-colors">
                                <i class="far fa-share-square"></i>
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;

      // Add like functionality to new post
      const likeBtn = newPost.querySelector(".like-btn");
      if (likeBtn) {
        likeBtn.addEventListener("click", function () {
          const icon = this.querySelector("i");
          const countEl = this.querySelector(".like-count");
          let count = parseInt(countEl.textContent);

          if (icon.classList.contains("far")) {
            icon.classList.remove("far");
            icon.classList.add("fas", "text-red-500");
            count++;
          } else {
            icon.classList.remove("fas", "text-red-500");
            icon.classList.add("far");
            count--;
          }
          countEl.textContent = count;
        });
      }

      // Insert at the top of feed
      postsFeed.insertBefore(newPost, postsFeed.firstChild);

      // Reset form
      if (postContent) postContent.value = "";
      if (imagePreviewContainer) imagePreviewContainer.classList.add("hidden");
      if (postImagePreview) postImagePreview.src = "";
      if (postImageInput) postImageInput.value = "";
    });
  }

  // Like buttons functionality
  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const icon = this.querySelector("i");
      const countEl = this.querySelector(".like-count");
      let count = parseInt(countEl.textContent);

      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas", "text-red-500");
        count++;
      } else {
        icon.classList.remove("fas", "text-red-500");
        icon.classList.add("far");
        count--;
      }
      countEl.textContent = count;
    });
  });
}

// ==================== NOTIFICATIONS ====================
function initNotifications() {
  const notificationBtns = document.querySelectorAll("[data-notification]");

  notificationBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const notificationId = this.dataset.notification;
      const notification = document.getElementById(notificationId);

      if (notification) {
        notification.classList.toggle("hidden");
      }
    });
  });

  // Close notifications on outside click
  document.addEventListener("click", function (e) {
    document.querySelectorAll('[id^="notification-"]').forEach((notif) => {
      if (
        !notif.classList.contains("hidden") &&
        !e.target.closest("[data-notification]")
      ) {
        notif.classList.add("hidden");
      }
    });
  });
}

// ==================== SEARCH FUNCTIONALITY ====================
function initSearch() {
  const searchInputs = document.querySelectorAll("[data-search-input]");

  searchInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const targetId = this.dataset.searchInput;
      const targetContainer = document.getElementById(targetId);

      if (targetContainer) {
        const items = targetContainer.querySelectorAll("[data-search-item]");

        items.forEach((item) => {
          const text = item.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
      }
    });
  });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// ==================== ANIMATIONS ON SCROLL ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 translate-y-20 opacity-0 z-50 ${
    type === "success" ? "bg-[#3c5750] text-white" : "bg-red-500 text-white"
  }`;
  toast.textContent = message;

  document.body.appendChild(toast);

  // Show toast
  setTimeout(() => {
    toast.classList.remove("translate-y-20", "opacity-0");
  }, 100);

  // Hide toast
  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize search
initSearch();
