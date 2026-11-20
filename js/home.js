document.addEventListener('DOMContentLoaded', () => {
  // Hero Slider Data
  const slidesData = [
    {
      badgeIcon: 'fa-solid fa-sparkles',
      badgeText: 'Pendaftaran Semester Baru Dibuka',
      titleHTML: 'Paham Materi<br><span class="highlight">Tanpa Hafalan</span><br>Raih Kampus Impian',
      desc: 'Metode belajar interaktif dengan rasio kelas kecil (maksimal 8 siswa) dan trik cepat dari tentor berpengalaman untuk SD, SMP, SMA, hingga persiapan UTBK-SNBT.'
    },
    {
      badgeIcon: 'fa-solid fa-graduation-cap',
      badgeText: 'Program Intensif UTBK-SNBT',
      titleHTML: 'Siap Tembus PTN<br><span class="highlight">Strategi Terukur</span><br>Skor Maksimal',
      desc: 'Drill 7 subtes SNBT, tryout rutin berbasis sistem penilaian IRT, dan konsultasi rasionalisasi pemilihan jurusan langsung bersama konselor akademik.'
    },
    {
      badgeIcon: 'fa-solid fa-gift',
      badgeText: 'Kuota Terbatas Minggu Ini',
      titleHTML: 'Coba Belajar Dulu<br><span class="highlight">Gratis Free Trial</span><br>& Klinik PR Harian',
      desc: 'Ikuti 1x sesi kelas percobaan gratis dan tes diagnostik kemampuan awal untuk menentukan kelompok belajar yang paling sesuai.'
    }
  ];

  const bgSlides = document.querySelectorAll('.hero-bg-slide');
  const sideCards = document.querySelectorAll('.hero-side-card');
  const indicators = document.querySelectorAll('#hero-indicators button');
  const heroBadge = document.getElementById('hero-badge');
  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');

  let activeSlide = 0;
  let slideTimer;

  function goToSlide(index) {
    activeSlide = (index + slidesData.length) % slidesData.length;
    const data = slidesData[activeSlide];

    if (heroBadge) heroBadge.innerHTML = `<i class="${data.badgeIcon}"></i> ${data.badgeText}`;
    if (heroTitle) heroTitle.innerHTML = data.titleHTML;
    if (heroDesc) heroDesc.textContent = data.desc;

    bgSlides.forEach((el, i) => el.classList.toggle('active', i === activeSlide));
    sideCards.forEach((el, i) => el.classList.toggle('active', i === activeSlide));
    indicators.forEach((el, i) => el.classList.toggle('active', i === activeSlide));
  }

  function startAutoSlide() {
    clearInterval(slideTimer);
    slideTimer = setInterval(() => goToSlide(activeSlide + 1), 6000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(activeSlide - 1); startAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(activeSlide + 1); startAutoSlide(); });

  sideCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.targetSlide, 10);
      goToSlide(idx);
      startAutoSlide();
    });
  });

  indicators.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.slide, 10);
      goToSlide(idx);
      startAutoSlide();
    });
  });

  if (bgSlides.length > 0) startAutoSlide();

  // Pricing Modal Logic
  const pricingData = {
    sd: [
      {
        tag: 'Tingkat Dasar',
        freq: '2x Seminggu',
        name: 'Kelas 1, 2, & 3 SD',
        price: 'Rp250.000',
        unit: '/ bulan (8x pertemuan)',
        features: [
          'Bimbingan Calistung & dasar logika',
          'Pendampingan PR harian sekolah',
          'Maksimal 6 siswa per kelompok',
          'Laporan progres bulanan ke orang tua'
        ],
        featured: false,
        waText: 'Paket%20Kelas%201-3%20SD'
      },
      {
        tag: 'Penguatan Konsep',
        freq: '3x Seminggu',
        name: 'Kelas 4 & 5 SD',
        price: 'Rp350.000',
        unit: '/ bulan (12x pertemuan)',
        features: [
          'Pendalaman Matematika, IPAS & Bahasa',
          'Pengenalan soal HOTS & simulasi ANBK',
          'Persiapan intensif PTS & PAS',
          'Gratis klinik PR harian'
        ],
        featured: true,
        waText: 'Paket%20Kelas%204-5%20SD'
      },
      {
        tag: 'Persiapan Lulus',
        freq: '3x Seminggu',
        name: 'Kelas 6 SD',
        price: 'Rp450.000',
        unit: '/ bulan (12x pertemuan)',
        features: [
          'Review materi kelas 4–6 untuk Ujian Sekolah',
          'Tryout berkala & pembahasan soal',
          'Konsultasi jalur masuk SMP Negeri/Unggulan',
          'Sesi tambahan menjelang ujian'
        ],
        featured: false,
        waText: 'Paket%20Kelas%206%20SD'
      }
    ],
    smp: [
      {
        tag: 'Adaptasi SMP',
        freq: '3x Seminggu',
        name: 'Kelas 7 SMP',
        price: 'Rp450.000',
        unit: '/ bulan (12x pertemuan)',
        features: [
          'Penguatan Aljabar & IPA Terpadu',
          'Pendampingan tugas & proyek sekolah',
          'Maksimal 10 siswa per kelompok',
          'Laporan evaluasi bulanan'
        ],
        featured: false,
        waText: 'Paket%20Kelas%207%20SMP'
      },
      {
        tag: 'Penguatan Konsep',
        freq: '3x Seminggu',
        name: 'Kelas 8 SMP',
        price: 'Rp500.000',
        unit: '/ bulan (12x pertemuan)',
        features: [
          'Pendalaman Fisika, Geometri & Persamaan',
          'Latihan literasi & numerasi ANBK',
          'Pengawalan nilai rapor semester 3–4',
          'Gratis klinik PR setiap hari'
        ],
        featured: false,
        waText: 'Paket%20Kelas%208%20SMP'
      },
      {
        tag: 'Sukses Masuk SMA',
        freq: '3x Seminggu',
        name: 'Kelas 9 SMP',
        price: 'Rp600.000',
        unit: '/ bulan (12x pertemuan)',
        features: [
          'Pemantapan Ujian Sekolah & bedah soal',
          'Tryout CBT berkala dengan evaluasi skor',
          'Strategi nilai rapor semester 5',
          'Pemetaan pemilihan SMA/SMK Unggulan'
        ],
        featured: true,
        waText: 'Paket%20Kelas%209%20SMP'
      }
    ],
    sma: [
      {
        tag: 'Fondasi SNBP',
        freq: '3x Seminggu',
        name: 'Kelas 10 & 11 SMA',
        price: 'Rp650.000',
        unit: '/ bulan (12x pertemuan)',
        features: [
          'Pengawalan grafik nilai rapor semester 1–4',
          'Pendalaman mapel pilihan Fase F',
          'Pengenalan soal TPS & Penalaran dasar',
          'Konsultasi pemilihan mata pelajaran'
        ],
        featured: false,
        waText: 'Paket%20Kelas%2010-11%20SMA'
      },
      {
        tag: 'Fokus Lulus PTN',
        freq: '3x Seminggu',
        name: 'Kelas 12 SMA & UTBK',
        price: 'Rp750.000',
        unit: '/ bulan (12x pertemuan)',
        features: [
          'Persiapan terpadu SNBP & 7 subtes SNBT',
          'Tryout CBT sistem penilaian IRT',
          'Analisis passing grade & rasionalisasi prodi',
          'Konsultasi jurusan hingga pengumuman'
        ],
        featured: true,
        waText: 'Paket%20Kelas%2012%20SMA%20UTBK'
      },
      {
        tag: 'Intensif Full',
        freq: '4x Seminggu',
        name: 'Alumni / Gap Year',
        price: 'Rp850.000',
        unit: '/ bulan (16x pertemuan)',
        features: [
          'Kurikulum 100% fokus UTBK & Ujian Mandiri',
          'Jadwal belajar pagi/siang lebih fokus',
          'Bedah ratusan paket soal asli',
          'Mentoring strategi lintas jalur'
        ],
        featured: false,
        waText: 'Paket%20Alumni%20Gap%20Year'
      }
    ]
  };

  const pricingModal = document.getElementById('pricingModal');
  const pricingBackdrop = document.getElementById('pricingModalBackdrop');
  const closePricingBtn = document.getElementById('closePricingModal');
  const pricingContainer = document.getElementById('pricingCardsContainer');
  const tabButtons = document.querySelectorAll('.pricing-tab-btn');

  function renderPricingCards(level) {
    if (!pricingContainer) return;
    const list = pricingData[level] || pricingData.smp;
    pricingContainer.innerHTML = list.map(item => `
      <div class="program-card ${item.featured ? 'featured' : ''}">
        ${item.featured ? '<span class="featured-badge centered">Rekomendasi</span>' : ''}
        <div>
          <div class="pkg-header">
            <span class="pkg-tag">${item.tag}</span>
            <span class="pkg-freq">${item.freq}</span>
          </div>
          <h3 class="program-title">${item.name}</h3>
          <div class="pkg-price-box">
            <span class="pkg-price">${item.price}</span>
            <span class="pkg-unit">${item.unit}</span>
          </div>
          <ul class="check-list">
            ${item.features.map(f => `<li><i class="fa-solid fa-circle-check"></i><span>${f}</span></li>`).join('')}
          </ul>
        </div>
        <a href="https://wa.me/6285712636036?text=Halo%20Genius%20Academy,%20saya%20ingin%20daftar%20${item.waText}." target="_blank" rel="noopener noreferrer" class="btn ${item.featured ? 'btn-primary' : 'btn-outline'} btn-block">
          <i class="fa-brands fa-whatsapp"></i> Daftar Paket Ini
        </a>
      </div>
    `).join('');
  }

  document.querySelectorAll('[data-action="open-pricing"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (pricingModal) {
        pricingModal.classList.remove('hidden');
        renderPricingCards('smp');
      }
    });
  });

  function closeModal() {
    if (pricingModal) pricingModal.classList.add('hidden');
  }

  if (closePricingBtn) closePricingBtn.addEventListener('click', closeModal);
  if (pricingBackdrop) pricingBackdrop.addEventListener('click', closeModal);

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPricingCards(btn.dataset.pricingTab);
    });
  });
});
