// T3leem - Main JavaScript File
// Pure Vanilla JavaScript - No frameworks

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    initMobileMenu();
    initLikeButtons();
    initPostSubmit();
    initTabs();
});

// ==================== SIDEBAR ====================
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('translate-x-full');
        });
    }
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// ==================== LIKE BUTTONS ====================
function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countEl = this.querySelector('.like-count');
            let count = parseInt(countEl.textContent);
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far', 'text-gray-500');
                icon.classList.add('fas', 'text-red-500');
                count++;
            } else {
                icon.classList.remove('fas', 'text-red-500');
                icon.classList.add('far', 'text-gray-500');
                count--;
            }
            countEl.textContent = count;
        });
    });
}

// ==================== POST SUBMIT ====================
function initPostSubmit() {
    const submitBtn = document.getElementById('submit-post');
    const postContent = document.getElementById('post-content');
    const postsFeed = document.getElementById('posts-feed');
    
    if (submitBtn && postsFeed) {
        submitBtn.addEventListener('click', () => {
            const content = postContent ? postContent.value : '';
            
            if (!content.trim()) {
                return;
            }
            
            const newPost = document.createElement('div');
            newPost.className = 'bg-white rounded-xl p-5 shadow-sm border border-gray-100';
            
            newPost.innerHTML = `
                <div class="flex items-start gap-4">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face" alt="User" class="w-10 h-10 rounded-full">
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <h4 class="font-bold text-gray-900">أحمد محمد</h4>
                            <span class="text-gray-400">•</span>
                            <span class="text-gray-500 text-sm">الآن</span>
                        </div>
                        <p class="mt-2 text-gray-700">${content}</p>
                        <div class="mt-4 flex items-center gap-6">
                            <button class="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors like-btn">
                                <i class="far fa-heart"></i>
                                <span class="like-count">0</span>
                            </button>
                            <button class="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                                <i class="far fa-comment"></i>
                                <span>0</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            // Add like functionality to new post
            const likeBtn = newPost.querySelector('.like-btn');
            if (likeBtn) {
                likeBtn.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    const countEl = this.querySelector('.like-count');
                    let count = parseInt(countEl.textContent);
                    
                    if (icon.classList.contains('far')) {
                        icon.classList.remove('far', 'text-gray-500');
                        icon.classList.add('fas', 'text-red-500');
                        count++;
                    } else {
                        icon.classList.remove('fas', 'text-red-500');
                        icon.classList.add('far', 'text-gray-500');
                        count--;
                    }
                    countEl.textContent = count;
                });
            }
            
            postsFeed.insertBefore(newPost, postsFeed.firstChild);
            
            if (postContent) postContent.value = '';
        });
    }
}

// ==================== TABS ====================
function initTabs() {
    // This function is handled by inline onclick in each page
    // Additional tab functionality can be added here if needed
}

// ==================== IMAGE PREVIEW ====================
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('avatar-preview');
            if (preview) {
                preview.src = e.target.result;
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Make previewImage available globally
window.previewImage = previewImage;
