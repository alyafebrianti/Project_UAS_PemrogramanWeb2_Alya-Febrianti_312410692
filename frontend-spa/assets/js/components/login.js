const Login = {
    template: `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" @click.self="$emit('close')">
            <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl relative animate-fadeIn">
                <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-extrabold text-gray-900">Login Admin</h2>
                </div>
                <form @submit.prevent="prosesLogin">
                    <div class="mb-5">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input v-model="username" type="text" class="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-purple-500 transition" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input v-model="password" type="password" class="w-full border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-purple-500 transition" required>
                    </div>
                    <button type="submit" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-200">
                        Login
                    </button>
                </form>
            </div>
        </div>
    `,
    data() {
        return { username: '', password: '' }
    },
    methods: {
        prosesLogin() {
            axios.post('/login', {
                username: this.username,
                password: this.password
            })
            .then(res => {
                // 1. Simpan token & status
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('isLoggedIn', 'true');

                // 2. Update status di aplikasi utama agar navbar berubah
                this.$root.isLoggedIn = true;
                
                // Tutup popup setelah berhasil login
                this.$emit('close');

                // 3. PERINTAH WAJIB: Pindah ke Dashboard
                this.$router.push('/dashboard');
            })
            .catch(() => {
                alert("Login Gagal! Pastikan username dan password benar.");
            });
        }
    }
};
