// --- LOGIKA FORM DAN TABEL TRANSAKSI ---
let transactionCount = 1; // Counter untuk No. Urut Tabel

// Menggunakan pengecekan 'if' agar tidak error saat berada di halaman selain transaksi.html
const transactionForm = document.getElementById('transactionForm');
if (transactionForm) {
    transactionForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah reload halaman saat submit

        const selectItem = document.getElementById('namaBarang');
        const selectedOption = selectItem.options[selectItem.selectedIndex];
        
        const namaBarang = selectItem.value;
        const hargaSatuan = parseInt(selectedOption.getAttribute('data-harga'));
        const jumlah = parseInt(document.getElementById('jumlahBarang').value);
        
        if (!namaBarang || isNaN(jumlah) || jumlah <= 0) {
            alert('Mohon pilih produk dan isi jumlah dengan benar.');
            return;
        }

        // Hitung total harga
        const totalHarga = hargaSatuan * jumlah;
        transactionCount++;

        // Format yang saya pakai yaitu mata uang Rupiah Indonesia
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });

        // Append data baru ke dalam tabel HTML
        const tableBody = document.getElementById('transactionTableBody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${transactionCount}</td>
            <td>${namaBarang}</td>
            <td>${jumlah}</td>
            <td>${formatter.format(hargaSatuan)}</td>
            <td>${formatter.format(totalHarga)}</td>
        `;
        
        tableBody.appendChild(newRow);

        // Reset input form setelah berhasil di-submit
        transactionForm.reset();
        alert('Transaksi baru berhasil ditambahkan ke tabel!');
    });
}

// ---LOGIKA VALIDASI LOGIN KOSONG (untuk alert) ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah form reload page

        const usernameInput = document.getElementById('username').value.trim();
        const passwordInput = document.getElementById('password').value.trim();

        // Pengecekan jika inputan kosong
        if (usernameInput === "" || passwordInput === "") {
            alert("Peringatan: Gagal melakukan login. Username dan Password tidak boleh kosong!");
        } else {
            // Menampilkan alert sukses
            alert(`Login sukses! Selamat datang, ${usernameInput}.`);
            
            // Redirect fisik halaman ke beranda.html karena file sudah dipisah
            window.location.href = 'index.html';
            loginForm.reset();
        }
    });
}