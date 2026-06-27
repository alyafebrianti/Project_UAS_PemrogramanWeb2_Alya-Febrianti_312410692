# Project_UAS_PemrogramanWeb2_Alya-Febrianti_312410692


#  Aplikasi E-Inventory Berbasis Web (Single Page Application)

##  Deskripsi Singkat Tema Studi Kasus
Proyek ini mengusung tema **Manajemen Inventaris Barang (E-Inventory)**. Sistem ini dirancang sepenuhnya sebagai platform berbasis web (bukan aplikasi *mobile*), yang mengimplementasikan arsitektur *Single Page Application* (SPA). 

Pemisahan antara sisi *Client* dan *Server* diterapkan secara tegas:
*   **Frontend:** Dibangun menggunakan kerangka kerja **Vue.js 3** yang dikombinasikan dengan utilitas **Tailwind CSS** untuk menghasilkan antarmuka pengguna yang bersih, responsif, dan interaktif tanpa perlu melakukan *reload* halaman utuh.
*   **Backend:** Ditangani oleh RESTful API yang dibangun menggunakan framework **CodeIgniter 4**, yang bertugas mengatur logika bisnis, validasi, keamanan, dan manajemen operasi *database* MySQL.

---

##  Skema Relasi Tabel Database
Berikut adalah desain struktur database (dieksplorasi melalui desainer phpMyAdmin) yang mengatur tata kelola data barang, kategori, entitas *supplier*, serta pencatatan histori transaksi masuk dan keluar. Visualisasi disajikan dengan format *box and arrow* yang minimalis agar alur kardinalitas tabel lebih mudah dipahami.

<<img width="959" height="502" alt="image" src="https://github.com/user-attachments/assets/3989398d-b830-48a2-b8eb-c8fb5f1f64a5" />



---

##  Uji Coba Proteksi API (Postman)
Untuk mengamankan fungsionalitas sistem, rute REST API di bagian backend telah dilindungi oleh *middleware* berbasis token otorisasi. Di bawah ini adalah bukti *screenshot* pengujian *endpoint* API (melalui Postman) yang menunjukkan bahwa sistem dengan tepat menolak akses dan mengembalikan respons **Error 401 Unauthorized** dengan format JSON apabila *request* dikirim tanpa melampirkan token akses yang valid.

<img width="722" height="476" alt="image" src="https://github.com/user-attachments/assets/a331e51e-643a-4d72-b15f-88e4427b08a7" />




---

## Tampilan Code Program 

```js
// PUSAT KONFIGURASI
axios.defaults.baseURL = 'http://localhost:8080/api';

// Interceptor Request
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return config;
}, error => Promise.reject(error));

// Interceptor Response
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            alert("Sesi berakhir, silakan login kembali.");
            localStorage.clear();
            window.location.href = '#/';
        }
        return Promise.reject(error);
    }
);

// Mendaftarkan Rute Halaman Baru (DUPLIKAT DIHAPUS & DITAMBAHKAN PROTEKSI)
const routes = [
    { path: '/', component: LandingPage }, // Halaman Publik (Tanpa Login)
    
    // Halaman Administrator (Dilindungi dengan requiresAuth)
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/kategori', component: Kategori, meta: { requiresAuth: true } },
    { path: '/supplier', component: Supplier, meta: { requiresAuth: true } },
    { path: '/histori', component: Histori, meta: { requiresAuth: true } },
    { path: '/about', component: About, meta: { requiresAuth: true } }
];

const router = VueRouter.createRouter({ 
    history: VueRouter.createWebHashHistory(), 
    routes 
});

// Auth Guard (Sistem Keamanan Hak Akses)
router.beforeEach((to, from, next) => {
    // Mengecek apakah token tersedia (menggunakan token lebih aman)
    const isLoggedIn = !!localStorage.getItem('token');
    
    if (to.meta.requiresAuth && !isLoggedIn) {
        // Jika pengunjung mencoba masuk ke dashboard/halaman admin tanpa login
        next('/');
    } else {
        next();
    }
});

const app = Vue.createApp({
    data() { 
        return { 
            isLoggedIn: !!localStorage.getItem('token'),
            isSidebarExpanded: false
        } 
    },
    methods: {
        logout() {
            localStorage.clear();
            this.isLoggedIn = false;
            // Diubah: Setelah logout akan diarahkan ke Landing Page, bukan halaman Login
            this.$router.push('/'); 
            setTimeout(() => window.location.reload(), 100);
        }
    }
});

app.use(router);
app.mount('#app');
```

##  Antarmuka Aplikasi (User Interface)
Berikut adalah visualisasi dari berbagai halaman utama aplikasi. Antarmuka dirancang dengan *layout* yang rapi berkat implementasi kelas utilitas dari Tailwind CSS:

### 1. Halaman Login
<img width="910" height="432" alt="image" src="https://github.com/user-attachments/assets/aca49289-d629-4489-8735-27132570ddd5" />


### 2. Halaman Dashboard Admin
<img width="959" height="445" alt="image" src="https://github.com/user-attachments/assets/7913e3d7-7b54-46af-9a8f-d8b797ddf53d" />


### 3. Tampilan Form Modal (Tambah/Edit Data)
Implementasi pengisian data menggunakan komponen *Modal* agar interaksi terasa lebih mulus tanpa berpindah halaman.
<img width="959" height="434" alt="image" src="https://github.com/user-attachments/assets/92200e3a-8a6d-49f2-a86f-673856c5e056" />


### 4. Visualisasi Data Berbasis Tabel
Data inventaris dan histori disajikan dalam format tabel fungsional yang padat informasi.
<img width="959" height="442" alt="image" src="https://github.com/user-attachments/assets/5ef2d809-0277-48c7-8121-58f972bc1f9c" />


<img width="959" height="437" alt="image" src="https://github.com/user-attachments/assets/2a840fa0-8321-4b08-98ec-3d2f85fac8e2" />


---

##  Petunjuk Instalasi Lokal
Untuk meninjau dan menjalankan proyek ini di lingkungan pengembangan lokal (*localhost*), silakan ikuti petunjuk berikut:

### Konfigurasi Backend (CodeIgniter 4 REST API)
1. Buka terminal, lalu arahkan direktori ke folder `backend`.
2. Pastikan *service* Apache dan MySQL (XAMPP/Laragon) dalam keadaan aktif.
3. Buat database baru di phpMyAdmin, kemudian *import* file `.sql` yang telah disediakan.
4. Salin file `env` menjadi `.env`. Buka file tersebut, aktifkan pengaturan lingkungan (*remove comment*), dan sesuaikan kredensial `database.default.database` dengan nama database Anda.
5. Jalankan server pengembangan internal CodeIgniter dengan perintah:
```bash
   php spark serve

```
### Link Demonstrasi YouTube
https://youtu.be/XYM21Gb4YaE?si=D9jX7gkctv5GWNNp
