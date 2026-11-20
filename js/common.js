document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // 2. Back to Top Button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTop.classList.remove('hidden');
      } else {
        backToTop.classList.add('hidden');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Subpage Image Sliders (SD, SMP, SMA)
  document.querySelectorAll('.subpage-slider').forEach(slider => {
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slider-slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dots = slider.querySelectorAll('.slider-dots button');
    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;

    function updateSlider(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => updateSlider(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateSlider(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => updateSlider(i)));

    setInterval(() => updateSlider(current + 1), 5000);
  });

  // 4. Auth State Check in Navbar
  const currentUser = JSON.parse(localStorage.getItem('ga_current_user') || 'null');
  const loginBtn = document.getElementById('loginBtn');
  const userProfileMenu = document.getElementById('userProfileMenu');
  const userAvatar = document.getElementById('userAvatar');
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userRoleDisplay = document.getElementById('userRoleDisplay');
  const profileDropdownBtn = document.getElementById('profileDropdownBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  const logoutBtn = document.getElementById('logoutBtn');

  if (currentUser && loginBtn && userProfileMenu) {
    loginBtn.classList.add('hidden');
    userProfileMenu.classList.remove('hidden');
    if (userAvatar) userAvatar.textContent = (currentUser.nama || 'U').charAt(0).toUpperCase();
    if (userNameDisplay) userNameDisplay.textContent = currentUser.nama || 'Pengguna';
    if (userRoleDisplay) userRoleDisplay.textContent = currentUser.role || 'Siswa';
  }

  if (profileDropdownBtn && profileDropdown) {
    profileDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => profileDropdown.classList.add('hidden'));
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('ga_current_user');
      window.location.reload();
    });
  }
});
