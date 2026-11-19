document.addEventListener('DOMContentLoaded', () => {
    // Toggle Lihat/Sembunyikan Password (Berlaku untuk Login & Pendaftaran)
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            const nextType = isPassword ? 'text' : 'password';
            passwordInput.setAttribute('type', nextType);
            if (confirmPasswordInput) confirmPasswordInput.setAttribute('type', nextType);
            if (eyeIcon) {
                eyeIcon.classList.toggle('fa-eye', !isPassword);
                eyeIcon.classList.toggle('fa-eye-slash', isPassword);
            }
        });
    }

    // ==========================================
    // LOGIKA HALAMAN LOGIN
    // ==========================================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const identifierInput = document.getElementById('identifier');
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        const fillDemoAdminBtn = document.getElementById('fillDemoAdmin');

        const defaultAccounts = [
            { identifier: 'admin', password: '123', role: 'admin', nama: 'Administrator' }
        ];

        if (fillDemoAdminBtn) {
            fillDemoAdminBtn.addEventListener('click', () => {
                identifierInput.value = 'admin';
                passwordInput.value = '123';
                errorMessage.classList.add('hidden');
            });
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputId = identifierInput.value.trim().toLowerCase();
            const inputPass = passwordInput.value;

            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            const allUsers = [...registeredUsers, ...defaultAccounts];

            const userMatch = allUsers.find(u =>
                (u.identifier && u.identifier.toLowerCase() === inputId) ||
                (u.email && u.email.toLowerCase() === inputId) ||
                (u.nis && u.nis.toLowerCase() === inputId) ||
                (u.username && u.username.toLowerCase() === inputId)
            );

            if (!userMatch) {
                errorText.innerText = 'Akun belum terdaftar! Silakan lakukan pendaftaran terlebih dahulu.';
                errorMessage.classList.remove('hidden');
                return;
            }

            if (userMatch.password !== inputPass) {
                errorText.innerText = 'Kata sandi salah! Periksa kembali password Anda.';
                errorMessage.classList.remove('hidden');
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify(userMatch));
            errorMessage.classList.add('hidden');
            window.location.href = 'bimbel4.html';
        });
    }

    // ==========================================
    // LOGIKA HALAMAN PENDAFTARAN
    // ==========================================
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const roleSelect = document.getElementById('role');
        const programFieldWrapper = document.getElementById('programFieldWrapper');
        const programPilihanSelect = document.getElementById('programPilihan');
        const alertMessage = document.getElementById('alertMessage');
        const alertIcon = document.getElementById('alertIcon');
        const alertText = document.getElementById('alertText');

        const urlParams = new URLSearchParams(window.location.search);
        const paketParam = urlParams.get('paket');
        if (paketParam && programPilihanSelect) {
            if (paketParam.startsWith('sd')) programPilihanSelect.value = 'Program SD (Kelas 1 - 6)';
            else if (paketParam.startsWith('smp')) programPilihanSelect.value = 'Program SMP (Kelas 7 - 9)';
            else if (paketParam.includes('utbk')) programPilihanSelect.value = 'Program Kelas 12 & UTBK-SNBT';
            else if (paketParam.startsWith('sma')) programPilihanSelect.value = 'Program SMA Reguler (Kelas 10 - 11)';
        }

        roleSelect.addEventListener('change', () => {
            programFieldWrapper.classList.toggle('hidden', roleSelect.value === 'pengajar');
        });

        function showAlert(message, type = 'error') {
            alertMessage.classList.remove(
                'hidden',
                'bg-red-50', 'border-red-200', 'text-red-700',
                'bg-emerald-50', 'border-emerald-200', 'text-emerald-700'
            );
            alertIcon.classList.remove('fa-circle-exclamation', 'fa-circle-check', 'text-red-600', 'text-emerald-600');

            if (type === 'success') {
                alertMessage.classList.add('bg-emerald-50', 'border', 'border-emerald-200', 'text-emerald-700');
                alertIcon.classList.add('fa-circle-check', 'text-emerald-600');
            } else {
                alertMessage.classList.add('bg-red-50', 'border', 'border-red-200', 'text-red-700');
                alertIcon.classList.add('fa-circle-exclamation', 'text-red-600');
            }
            alertText.innerText = message;
        }

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nama = document.getElementById('nama').value.trim();
            const role = roleSelect.value;
            const program = role === 'siswa' ? programPilihanSelect.value : 'Pengajar';
            const identifier = document.getElementById('identifier').value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (password !== confirmPassword) {
                showAlert('Konfirmasi kata sandi tidak cocok!');
                return;
            }

            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            const isDuplicate = registeredUsers.some(u => u.identifier.toLowerCase() === identifier.toLowerCase()) || identifier.toLowerCase() === 'admin';
            
            if (isDuplicate) {
                showAlert('Username / NIS / Email sudah terdaftar! Gunakan identitas lain.');
                return;
            }

            registeredUsers.push({ identifier, password, role, nama, program });
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

            showAlert('Akun berhasil dibuat! Mengalihkan ke halaman login...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1200);
        });
    }
});
