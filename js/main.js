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
  initPostCreation();
});

// ==================== SIDEBAR FUNCTIONALITY ====================
function initSidebar() {
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
      sidebar.classList.toggle("translate-x-0");
      if (overlay) {
        overlay.classList.toggle("hidden");
      }
    });

    if (overlay) {
      overlay.addEventListener("click", () => {
        sidebar.classList.add("-translate-x-full");
        sidebar.classList.remove("translate-x-0");
        overlay.classList.add("hidden");
      });
    }
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
          btn.classList.remove("text-primary", "border-b-2", "border-primary");
          btn.classList.add("text-gray-500");
        });

      // Add active class to clicked button
      button.classList.add("text-primary", "border-b-2", "border-primary");
      button.classList.remove("text-gray-500");

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
  const playBtnBottom = document.getElementById("play-btn-bottom");
  const progressBar = document.getElementById("progress-bar");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
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

  if (playBtnBottom) {
    playBtnBottom.addEventListener("click", () => {
      isPlaying = !isPlaying;
      updatePlayPauseIcon();
      simulateVideoProgress();
    });
  }

  function updatePlayPauseIcon() {
    const icon = playBtn ? playBtn.querySelector("i") : null;
    const iconBottom = playBtnBottom ? playBtnBottom.querySelector("i") : null;

    if (icon) {
      icon.className = isPlaying
        ? "fas fa-pause text-4xl"
        : "fas fa-play text-4xl ml-2";
    }
    if (iconBottom) {
      iconBottom.className = isPlaying
        ? "fas fa-pause text-xl"
        : "fas fa-play text-xl";
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

  // Fullscreen
  if (fullscreenBtn && videoContainer) {
    fullscreenBtn.addEventListener("click", () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainer.requestFullscreen();
      }
    });
  }

  // Skip next lesson
  const skipNextBtn = document.getElementById("skip-next-btn");
  if (skipNextBtn && nextLessonPopup) {
    skipNextBtn.addEventListener("click", () => {
      nextLessonPopup.classList.add("hidden");
      currentTime = 0;
      isPlaying = false;
      updatePlayPauseIcon();
      updateProgress();
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

// ==================== COMMUNITY POST CREATION ====================
function initPostCreation() {
  const createPostBox = document.getElementById("create-post-box");
  const postForm = document.getElementById("post-form");
  const postContent = document.getElementById("post-content");
  const postImageInput = document.getElementById("post-image");
  const imagePreviewContainer = document.getElementById(
    "image-preview-container",
  );
  const postImagePreview = document.getElementById("post-image-preview");
  const submitPostBtn = document.getElementById("submit-post");
  const postsFeed = document.getElementById("posts-feed");

  // Focus on post box
  if (createPostBox && postForm) {
    createPostBox.addEventListener("click", () => {
      postForm.classList.remove("hidden");
      if (postContent) postContent.focus();
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
        imagePreviewContainer &&
        !imagePreviewContainer.classList.contains("hidden");

      if (!content.trim() && !hasImage) {
        alert("الرجاء إضافة محتوى أو صورة للمنشور");
        return;
      }

      // Create new post HTML
      const newPost = document.createElement("div");
      newPost.className =
        "bg-white rounded-2xl p-6 shadow-sm border border-gray-100";

      const timestamp = "الآن";
      const userName = "أحمد محمد";
      const userAvatar =
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face";

      let imageHtml = "";
      if (hasImage && postImagePreview) {
        imageHtml = `
                    <div class="mt-4 rounded-xl overflow-hidden">
                        <img src="${postImagePreview.src}" alt="Post image" class="w-full h-64 object-cover">
                    </div>
                `;
      }

      newPost.innerHTML = `
                <div class="flex items-start gap-4">
                    <img src="${userAvatar}" alt="${userName}" class="w-12 h-12 rounded-full object-cover">
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <h4 class="font-bold text-gray-900">${userName}</h4>
                            <span class="text-gray-400">•</span>
                            <span class="text-gray-500 text-sm">${timestamp}</span>
                        </div>
                        <p class="mt-2 text-gray-700">${content}</p>
                        ${imageHtml}
                        <div class="mt-4 flex items-center gap-6">
                            <button class="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors like-btn">
                                <i class="far fa-heart"></i>
                                <span class="like-count">0</span>
                            </button>
                            <button class="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                                <i class="far fa-comment"></i>
                                <span>تعليق</span>
                            </button>
                            <button class="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                                <i class="far fa-share-square"></i>
                                <span>مشاركة</span>
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
            icon.classList.remove("far", "text-gray-500");
            icon.classList.add("fas", "text-red-500");
            count++;
          } else {
            icon.classList.remove("fas", "text-red-500");
            icon.classList.add("far", "text-gray-500");
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
      if (postForm) postForm.classList.add("hidden");
    });
  }

  // Like buttons functionality
  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const icon = this.querySelector("i");
      const countEl = this.querySelector(".like-count");
      let count = parseInt(countEl.textContent);

      if (icon.classList.contains("far")) {
        icon.classList.remove("far", "text-gray-500");
        icon.classList.add("fas", "text-red-500");
        count++;
      } else {
        icon.classList.remove("fas", "text-red-500");
        icon.classList.add("far", "text-gray-500");
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
