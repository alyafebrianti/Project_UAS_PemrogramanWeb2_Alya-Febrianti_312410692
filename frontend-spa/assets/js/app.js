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