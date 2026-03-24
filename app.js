var SUPABASE_URL = "https://wuwfjdxgeoqcbqsbxuho.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_6urNqkD2HYEHZtmVXSS8jQ_ByVqLB5T";

// Use supabaseClient to avoid conflict with global 'supabase' library
var supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = supabaseClient;
console.log('supabaseClient initialized and attached to window');

// Auth Helpers
async function checkSession() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    const currentPage = window.location.pathname.split("/").pop();
    
    const publicPages = ["login.html", "signup.html", "index.html", "forgot-password.html", "reset-password.html", ""];
    
    if (!user && !publicPages.includes(currentPage)) {
        window.location.href = "login.html";
        return null;
    }
    
    if (user) {
        if (user.email === "admin@whyjaba.com") {
            if (["dashboard.html", "login.html", "signup.html", "forgot-password.html"].includes(currentPage)) {
                window.location.href = "admin.html";
            }
        } else {
            if (["admin.html", "login.html", "signup.html", "forgot-password.html"].includes(currentPage)) {
                window.location.href = "dashboard.html";
            }
        }
    }
    return user;
}
window.checkSession = checkSession;

// Get correct redirect URL for Auth
function getRedirectUrl(page = "dashboard.html") {
    const url = window.location.href;
    const lastSlashIndex = url.lastIndexOf('/');
    return url.substring(0, lastSlashIndex + 1) + page;
}
window.getRedirectUrl = getRedirectUrl;

async function logout() {
    await supabaseClient.auth.signOut();
    window.location.href = "login.html";
}
window.logout = logout;

// UI Helpers
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-8 right-8 px-8 py-4 rounded-2xl shadow-2xl z-50 animate-fade-in-up backdrop-blur-xl border border-white/10 flex items-center gap-3 transition-all duration-500 ${
        type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
    }`;
    toast.innerHTML = `
        <div class="w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse"></div>
        <span class="font-medium text-sm">${message}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}
window.showToast = showToast;

function showLoading(elementId, message = "Fe'amaa jira...") {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = `
            <div class="col-span-full text-center py-32 flex flex-col items-center justify-center gap-8 animate-fade-in">
                <div class="premium-loader">
                    <div></div><div></div><div></div><div></div>
                    <div class="loader-glow"></div>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <p class="text-teal-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">${message}</p>
                    <div class="w-12 h-0.5 bg-white/5 rounded-full overflow-hidden">
                        <div class="h-full bg-teal-500 animate-[loading-bar_2s_infinite]"></div>
                    </div>
                </div>
            </div>
        `;
    }
}
window.showLoading = showLoading;

function showSkeleton(elementId, count = 4, type = 'card') {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    let skeletonHtml = '';
    for (let i = 0; i < count; i++) {
        if (type === 'card') {
            skeletonHtml += `
                <div class="skeleton-card animate-fade-in" style="animation-delay: ${i * 0.1}s">
                    <div class="skeleton skeleton-img"></div>
                    <div class="skeleton skeleton-title"></div>
                    <div class="space-y-2">
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text-sm"></div>
                    </div>
                    <div class="mt-auto">
                        <div class="skeleton skeleton-btn"></div>
                    </div>
                </div>
            `;
        } else if (type === 'list') {
            skeletonHtml += `
                <div class="flex items-center gap-4 p-4 bg-white/2 rounded-2xl border border-white/5 animate-fade-in" style="animation-delay: ${i * 0.05}s">
                    <div class="w-12 h-16 skeleton rounded-lg"></div>
                    <div class="flex-1 space-y-2">
                        <div class="h-4 w-1/3 skeleton"></div>
                        <div class="h-3 w-1/4 skeleton"></div>
                    </div>
                    <div class="w-8 h-8 skeleton rounded-lg"></div>
                </div>
            `;
        }
    }
    el.innerHTML = skeletonHtml;
}
window.showSkeleton = showSkeleton;

function setLoadingState(buttonId, isLoading, loadingText = "Hojjetamaa jira...") {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    
    if (isLoading) {
        const originalText = btn.innerHTML;
        btn.dataset.originalText = originalText;
        btn.disabled = true;
        btn.classList.add('opacity-70', 'cursor-not-allowed');
        btn.innerHTML = `
            <div class="flex items-center justify-center gap-3">
                <div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>${loadingText}</span>
            </div>
        `;
    } else {
        btn.disabled = false;
        btn.classList.remove('opacity-70', 'cursor-not-allowed');
        btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
    }
}
window.setLoadingState = setLoadingState;

function showError(elementId, message = "Dogoggorri uumameera") {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = `
            <div class="col-span-full text-center py-20 flex flex-col items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center">
                    <i data-lucide="alert-circle" class="w-8 h-8 text-rose-500"></i>
                </div>
                <p class="error-text">${message}</p>
                <button onclick="window.location.reload()" class="btn-secondary !py-2 !px-6 text-xs mt-4">Irra deebi'ii yaali</button>
            </div>
        `;
        if (window.lucide) window.lucide.createIcons();
    }
}
window.showError = showError;

// Global initialization
document.addEventListener('DOMContentLoaded', async () => {
    checkSession();
    
    // Scroll Reveal Animation
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
});
