document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // 2. Data & Modal Harga Bimbel
    const pricingData = {
        sd: [
            {
                id: 'sd-reguler',
                name: 'Paket Reguler SD',
                badge: 'Kelas 1 - 6 SD',
                price: 'Rp 350.000',
                period: '/ bulan',
                sessions: '2x Pertemuan / Minggu (90 Menit)',
                popular: false,
                features: [
                    'Matematika, IPA & Bahasa Indonesia',
                    'Pendampingan PR & Tugas Sekolah',
                    'Maksimal 8 siswa per kelas',
                    'Modul cetak & laporan perkembangan'
                ]
            },
            {
                id: 'sd-intensif',
                name: 'Paket Intensif SD',
                badge: 'Paling Populer',
                price: 'Rp 500.000',
                period: '/ bulan',
                sessions: '3x Pertemuan / Minggu (90 Menit)',
                popular: true,
                features: [
                    'Semua mapel inti + Bahasa Inggris',
                    'Persiapan Ujian Sekolah & Olimpiade Dasar',
                    'Gratis Klinik PR setiap hari kerja',
                    'Tryout evaluasi bulanan + rapor orang tua'
                ]
            },
            {
                id: 'sd-privat',
                name: 'Semi-Privat 1-on-3',
                badge: 'Fokus Ekstra',
                price: 'Rp 750.000',
                period: '/ bulan',
                sessions: '2x Pertemuan / Minggu (Fleksibel)',
                popular: false,
                features: [
                    'Kelompok eksklusif maksimal 3 siswa',
                    'Jadwal bisa menyesuaikan aktivitas anak',
                    'Pendekatan personal sesuai gaya belajar',
                    'Konsultasi rutin wali murid dengan tentor'
                ]
            }
        ],
        smp: [
            {
                id: 'smp-reguler',
                name: 'Paket Reguler SMP',
                badge: 'Kelas 7 - 9 SMP',
                price: 'Rp 450.000',
                period: '/ bulan',
                sessions: '2x Pertemuan / Minggu (90 Menit)',
                popular: false,
                features: [
                    'Matematika, IPA Terpadu & B. Inggris',
                    'Trik cepat pahami konsep tanpa hafalan',
                    'Maksimal 8 siswa per kelas',
                    'Akses bank soal ulangan harian & PTS/PAS'
                ]
            },
            {
                id: 'smp-unggulan',
                name: 'Paket Sukses SMA Favorit',
                badge: 'Paling Diminati',
                price: 'Rp 650.000',
                period: '/ bulan',
                sessions: '3x Pertemuan / Minggu (90 Menit)',
                popular: true,
                features: [
                    'Kupas tuntas materi sekolah + soal HOTS',
                    'Simulasi rutin ASAJ & Tes Masuk SMA/SMK',
                    'Gratis Klinik PR kapan saja',
                    'Konsultasi pemetaan jalur prestasi/zonasi'
                ]
            },
            {
                id: 'smp-privat',
                name: 'Semi-Privat SMP',
                badge: 'Eksklusif 3 Siswa',
                price: 'Rp 900.000',
                period: '/ bulan',
                sessions: '2x Pertemuan / Minggu (Jadwal Bebas)',
                popular: false,
                features: [
                    'Rasio super kecil (maksimal 3 siswa)',
                    'Fokus kejar ketertinggalan materi tertentu',
                    'Modul ringkasan rumus praktis',
                    'Laporan progres detail setiap bulan'
                ]
            }
        ],
        sma: [
            {
                id: 'sma-reguler',
                name: 'Reguler Kelas 10 & 11',
                badge: 'Kawal Nilai Rapor SNBP',
                price: 'Rp 550.000',
                period: '/ bulan',
                sessions: '2x Pertemuan / Minggu (90 Menit)',
                popular: false,
                features: [
                    'Matematika, Fisika, Kimia, Biologi / Ekonomi',
                    'Optimalisasi nilai rapor untuk jalur SNBP',
                    'Maksimal 8 siswa per kelas',
                    'Gratis Klinik PR & diskusi soal sekolah'
                ]
            },
            {
                id: 'sma-utbk',
                name: 'Supercamp UTBK-SNBT',
                badge: 'Program Unggulan',
                price: 'Rp 850.000',
                period: '/ bulan',
                sessions: '4x Pertemuan / Minggu (Intensif)',
                popular: true,
                features: [
                    'Full TPS, Penalaran Matematika & Literasi',
                    'Tryout CBT rutin berstandar penilaian IRT',
                    'Konsultasi rasionalisasi jurusan & PTN',
                    'Modul eksklusif bedah soal HOTS UTBK'
                ]
            },
            {
                id: 'sma-privat',
                name: 'Privat Fokus PTN',
                badge: '1-on-1 / 1-on-2',
                price: 'Rp 1.250.000',
                period: '/ bulan',
                sessions: '3x Pertemuan / Minggu (Fleksibel)',
                popular: false,
                features: [
                    'Bimbingan intensif 1-on-1 atau berdua',
                    'Kurikulum disesuaikan target skor jurusan',
                    'Jadwal fleksibel (pagi/siang/malam)',
                    'Pendampingan penuh hingga hari ujian'
                ]
            }
        ]
    };

    const pricingModal = document.getElementById('pricingModal');
    const pricingModalBackdrop = document.getElementById('pricingModalBackdrop');
    const closePricingModalBtn = document.getElementById('closePricingModal');
    const pricingCardsContainer = document.getElementById('pricingCardsContainer');
    const pricingTabBtns = document.querySelectorAll('.pricing-tab-btn');

    function renderPricingCards(level) {
        if (!pricingCardsContainer) return;

        const items = pricingData[level] || pricingData.smp;
        const programPages = {
            sd: 'program-sd.html#paket',
            smp: 'program-smp.html#paket',
            sma: 'program-sma.html#paket'
        };
        const targetUrl = programPages[level] || 'program-smp.html#paket';

        pricingTabBtns.forEach(btn => {
            if (btn.getAttribute('data-pricing-tab') === level) {
                btn.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
                btn.classList.remove('text-slate-600', 'hover:text-slate-900');
            } else {
                btn.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
                btn.classList.add('text-slate-600', 'hover:text-slate-900');
            }
        });

        pricingCardsContainer.innerHTML = items.map(item => `
            <div class="rounded-2xl p-6 flex flex-col justify-between transition ${
                item.popular
                ? 'bg-slate-900 text-white border-2 border-blue-500 shadow-xl relative'
                : 'bg-slate-50 text-slate-900 border border-slate-200'
            }">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            item.popular ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                        }">
                            ${item.badge}
                        </span>
                    </div>
                    <h3 class="text-lg font-extrabold mb-1">${item.name}</h3>
                    <p class="text-xs ${item.popular ? 'text-slate-400' : 'text-slate-500'} mb-4">${item.sessions}</p>

                    <div class="mb-5 pb-5 border-b ${item.popular ? 'border-slate-800' : 'border-slate-200'}">
                        <span class="text-2xl sm:text-3xl font-extrabold tracking-tight">${item.price}</span>
                        <span class="text-xs font-medium ${item.popular ? 'text-slate-400' : 'text-slate-500'}">${item.period}</span>
                    </div>

                    <ul class="space-y-2.5 text-xs sm:text-sm mb-6 ${item.popular ? 'text-slate-300' : 'text-slate-600'}">
                        ${item.features.map(feat => `
                            <li class="flex items-start gap-2">
                                <i class="fa-solid fa-circle-check ${item.popular ? 'text-blue-400' : 'text-blue-600'} mt-0.5 shrink-0"></i>
                                <span>${feat}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <a href="${targetUrl}" class="block w-full py-3 text-center font-bold text-xs sm:text-sm rounded-xl transition ${
                    item.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-white border border-slate-300 text-slate-800 hover:border-blue-600 hover:text-blue-600'
                }">
                    Lihat Paket Ini
                </a>
            </div>
        `).join('');
    }

    function openPricingModal(defaultTab = 'smp') {
        if (!pricingModal) return;
        renderPricingCards(defaultTab);
        pricingModal.classList.remove('hidden');
        pricingModal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    }

    function closePricingModal() {
        if (!pricingModal) return;
        pricingModal.classList.add('hidden');
        pricingModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }

    pricingTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            renderPricingCards(btn.getAttribute('data-pricing-tab'));
        });
    });

    if (closePricingModalBtn) closePricingModalBtn.addEventListener('click', closePricingModal);
    if (pricingModalBackdrop) pricingModalBackdrop.addEventListener('click', closePricingModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pricingModal && !pricingModal.classList.contains('hidden')) {
            closePricingModal();
        }
    });

    // 3. Full-Screen Hero Slider
    const heroSlidesData = [
        {
            badge: '<i class="fa-solid fa-sparkles text-amber-400"></i> Pendaftaran Semester Baru Dibuka',
            title: 'Paham Materi<br><span class="text-blue-400">Tanpa Hafalan</span><br>Raih Kampus Impian',
            desc: 'Metode belajar interaktif dengan rasio kelas kecil (maksimal 8 siswa) dan trik cepat dari tentor berpengalaman untuk SD, SMP, SMA, hingga persiapan UTBK-SNBT.',
            ctaText: 'Cek Paket & Harga',
            ctaType: 'modal',
            modalTab: 'smp',
            ctaLink: '#pricingModal'
        },
        {
            badge: '<i class="fa-solid fa-graduation-cap text-amber-400"></i> Program Intensif PTN Impian',
            title: 'Siap Tembus<br><span class="text-blue-400">UTBK & SNBT</span><br>Skor Maksimal',
            desc: 'Bedah tuntas soal penalaran, literasi, tryout berkala berstandar IRT, serta konsultasi rasionalisasi jurusan bersama mentor ahli.',
            ctaText: 'Cek Biaya Program UTBK',
            ctaType: 'modal',
            modalTab: 'sma',
            ctaLink: '#pricingModal'
        },
        {
            badge: '<i class="fa-solid fa-gift text-amber-400"></i> Kuota Terbatas Minggu Ini',
            title: 'Coba Kelas<br><span class="text-blue-400">Free Trial</span><br>& Klinik PR Gratis',
            desc: 'Rasakan langsung suasana belajar santai tapi terarah di Genius Academy sebelum mendaftar. Gratis konsultasi target nilai sekolah!',
            ctaText: 'Klaim Free Trial',
            ctaType: 'link',
            ctaLink: 'https://wa.me/6285712636036?text=Halo%20Admin%20Genius%20Academy,%20saya%20ingin%20klaim%20Free%20Trial%20Class.'
        }
    ];

    const bgSlides = document.querySelectorAll('.hero-bg-slide');
    const heroTextBox = document.getElementById('hero-text-box');
    const heroBadge = document.getElementById('hero-badge');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const heroCtaPrimary = document.getElementById('hero-cta-primary');
    const indicators = document.querySelectorAll('#hero-indicators button');
    const sideCards = document.querySelectorAll('.hero-side-card');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');

    let currentSlide = 0;
    let slideTimer;

    if (heroCtaPrimary) {
        heroCtaPrimary.classList.add('relative', 'z-20', 'pointer-events-auto');

        heroCtaPrimary.addEventListener('click', (e) => {
            const activeData = heroSlidesData[currentSlide];
            if (!activeData) return;

            if (activeData.ctaType === 'modal') {
                e.preventDefault();
                openPricingModal(activeData.modalTab || 'smp');
            }
        });
    }

    function setHeroSlide(index) {
        currentSlide = (index + heroSlidesData.length) % heroSlidesData.length;
        const data = heroSlidesData[currentSlide];

        bgSlides.forEach((slide, idx) => {
            const isActive = idx === currentSlide;
            slide.classList.toggle('opacity-100', isActive);
            slide.classList.toggle('opacity-0', !isActive);
            slide.classList.toggle('pointer-events-none', !isActive);
        });

        if (heroTextBox) {
            heroTextBox.classList.remove('slide-text-animate');
            void heroTextBox.offsetWidth;
            if (heroBadge) heroBadge.innerHTML = data.badge;
            if (heroTitle) heroTitle.innerHTML = data.title;
            if (heroDesc) heroDesc.textContent = data.desc;

            if (heroCtaPrimary) {
                heroCtaPrimary.innerHTML = `${data.ctaText} <i class="fa-solid fa-arrow-right"></i>`;
                heroCtaPrimary.setAttribute('href', data.ctaLink);

                if (data.ctaType === 'link') {
                    heroCtaPrimary.setAttribute('target', '_blank');
                    heroCtaPrimary.setAttribute('rel', 'noopener noreferrer');
                } else {
                    heroCtaPrimary.removeAttribute('target');
                    heroCtaPrimary.removeAttribute('rel');
                }
            }

            heroTextBox.classList.add('slide-text-animate');
        }

        indicators.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.remove('w-2.5', 'bg-white/30');
                dot.classList.add('w-8', 'bg-blue-500');
            } else {
                dot.classList.remove('w-8', 'bg-blue-500');
                dot.classList.add('w-2.5', 'bg-white/30');
            }
        });

        sideCards.forEach((card) => {
            const target = parseInt(card.getAttribute('data-target-slide'), 10);
            if (target === currentSlide) {
                card.classList.remove('bg-slate-900/65', 'border-white/10');
                card.classList.add('bg-slate-900/85', 'border-blue-500', 'ring-2', 'ring-blue-500/40');
            } else {
                card.classList.remove('bg-slate-900/85', 'border-blue-500', 'ring-2', 'ring-blue-500/40');
                card.classList.add('bg-slate-900/65', 'border-white/10');
            }
        });
    }

    function startHeroAutoSlide() {
        clearInterval(slideTimer);
        slideTimer = setInterval(() => setHeroSlide(currentSlide + 1), 5500);
    }

    function resetHeroAutoSlide() {
        clearInterval(slideTimer);
        startHeroAutoSlide();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            setHeroSlide(currentSlide - 1);
            resetHeroAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            setHeroSlide(currentSlide + 1);
            resetHeroAutoSlide();
        });
    }

    indicators.forEach((dot) => {
        dot.addEventListener('click', () => {
            setHeroSlide(parseInt(dot.getAttribute('data-slide'), 10));
            resetHeroAutoSlide();
        });
    });

    sideCards.forEach((card) => {
        card.addEventListener('click', () => {
            setHeroSlide(parseInt(card.getAttribute('data-target-slide'), 10));
            resetHeroAutoSlide();
        });
    });

    if (bgSlides.length > 0) {
        setHeroSlide(0);
        startHeroAutoSlide();
    }

    // 4. Auth / Profil User Navbar
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
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

        const displayName = currentUser.nama || currentUser.identifier;
        if (userNameDisplay) userNameDisplay.innerText = displayName;
        if (userRoleDisplay) userRoleDisplay.innerText = currentUser.role || 'Siswa';
        if (userAvatar) userAvatar.innerText = displayName.charAt(0).toUpperCase();
    }

    if (profileDropdownBtn && profileDropdown) {
        profileDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (userProfileMenu && !userProfileMenu.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    }
});
