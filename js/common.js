document.addEventListener('DOMContentLoaded', () => {
    // 1. Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('hidden');
                setTimeout(() => backToTopBtn.classList.remove('opacity-0'), 10);
            } else {
                backToTopBtn.classList.add('opacity-0');
                setTimeout(() => backToTopBtn.classList.add('hidden'), 300);
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2. Hero Image Slider (Untuk halaman program-sd, program-smp, program-sma)
    document.querySelectorAll('[id^="hero-slider-"]').forEach((slider) => {
        const track = slider.querySelector('.slider-track');
        if (!track || track.children.length === 0) return;

        const slides = track.children;
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        const dots = slider.querySelectorAll('.slider-dots button');
        let currentIndex = 0;
        let autoSlide;

        function updateSlider(index) {
            currentIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-white', i === currentIndex);
                dot.classList.toggle('w-5', i === currentIndex);
                dot.classList.toggle('bg-white/50', i !== currentIndex);
                dot.classList.toggle('w-2.5', i !== currentIndex);
            });
        }

        function startAutoSlide() {
            autoSlide = setInterval(() => updateSlider(currentIndex + 1), 4000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlide);
            startAutoSlide();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateSlider(currentIndex - 1);
                resetAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateSlider(currentIndex + 1);
                resetAutoSlide();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                updateSlider(i);
                resetAutoSlide();
            });
        });

        updateSlider(0);
        startAutoSlide();
        slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
        slider.addEventListener('mouseleave', startAutoSlide);
    });
});