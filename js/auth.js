document.addEventListener('DOMContentLoaded', () => {
  // Toggle Show/Hide Password
  const togglePwd = document.getElementById('togglePassword');
  const pwdInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eyeIcon');

  if (togglePwd && pwdInput && eyeIcon) {
    togglePwd.addEventListener('click', () => {
      const isHidden = pwdInput.type === 'password';
      pwdInput.type = isHidden ? 'text' : 'password';
      eyeIcon.classList.toggle('fa-eye', !isHidden);
      eyeIcon.classList.toggle('fa-eye-slash', isHidden);
    });
  }

  // Demo Admin Auto-Fill
  const fillDemoBtn = document.getElementById('fillDemoAdmin');
  if (fillDemoBtn) {
    fillDemoBtn.addEventListener('click', () => {
      const idInput = document.getElementById('identifier');
      if (idInput) idInput.value = 'admin';
      if (pwdInput) pwdInput.value = '123';
    });
  }

  // Login Form Handler
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = document.getElementById('identifier').value.trim();
      const password = document.getElementById('password').value;
      const errBox = document.getElementById('errorMessage');
      const errText = document.getElementById('errorText');

      if (identifier === 'admin' && password === '123') {
        localStorage.setItem('ga_current_user', JSON.stringify({
          nama: 'Administrator',
          identifier: 'admin',
          role: 'Admin'
        }));
        window.location.href = 'index.html';
        return;
      }

      const users = JSON.parse(localStorage.getItem('ga_users') || '[]');
      const matched = users.find(u => u.identifier.toLowerCase() === identifier.toLowerCase() && u.password === password);

      if (matched) {
        localStorage.setItem('ga_current_user', JSON.stringify(matched));
        window.location.href = 'index.html';
      } else if (errBox && errText) {
        errText.textContent = 'Username/email atau kata sandi tidak sesuai.';
        errBox.classList.remove('hidden');
      }
    });
  }

  // Register Form Handler
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    const roleSelect = document.getElementById('role');
    const programWrapper = document.getElementById('programFieldWrapper');
    if (roleSelect && programWrapper) {
      roleSelect.addEventListener('change', () => {
        programWrapper.classList.toggle('hidden', roleSelect.value !== 'siswa');
      });
    }

    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = document.getElementById('nama').value.trim();
      const role = document.getElementById('role').value;
      const program = document.getElementById('programPilihan')?.value || '';
      const identifier = document.getElementById('identifier').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      const alertBox = document.getElementById('alertMessage');
      const alertText = document.getElementById('alertText');
      const alertIcon = document.getElementById('alertIcon');

      function showAlert(msg, isSuccess = false) {
        if (!alertBox || !alertText) return;
        alertBox.className = `alert-box ${isSuccess ? 'alert-success' : 'alert-error'}`;
        if (alertIcon) {
          alertIcon.className = `fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-circle-exclamation'}`;
        }
        alertText.textContent = msg;
        alertBox.classList.remove('hidden');
      }

      if (password !== confirmPassword) {
        showAlert('Konfirmasi kata sandi tidak cocok.');
        return;
      }

      const users = JSON.parse(localStorage.getItem('ga_users') || '[]');
      if (users.some(u => u.identifier.toLowerCase() === identifier.toLowerCase()) || identifier.toLowerCase() === 'admin') {
        showAlert('Username atau email sudah terdaftar.');
        return;
      }

      const newUser = { nama, role, program, identifier, password };
      users.push(newUser);
      localStorage.setItem('ga_users', JSON.stringify(users));
      localStorage.setItem('ga_current_user', JSON.stringify(newUser));

      showAlert('Pendaftaran berhasil! Mengalihkan ke beranda...', true);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }
});
