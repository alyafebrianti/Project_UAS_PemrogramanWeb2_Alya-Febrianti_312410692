const LandingPage = {
    components: {
        'login-modal': Login
    },
    template: `
    <div class="min-h-screen bg-transparent flex flex-col items-center py-10 px-4 space-y-8 relative">
        <login-modal v-if="showLogin" @close="showLogin = false" />
        
        <div class="w-full max-w-6xl bg-white p-8 rounded-xl shadow-sm text-center relative">
            <button @click="showLogin = true" class="absolute top-8 right-8 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg px-6 py-2.5 rounded-lg transition-all duration-200" >
                Login Admin &rarr;
            </button>
            <h1 class="text-4xl font-extrabold text-purple-700 mb-2">E-Inventory</h1>
        </div>

        <div class="w-full max-w-6xl bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center gap-3 mb-4">
                <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">Katalog Data Barang</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-purple-50 border-b-2 border-purple-100">
                        <tr>
                            <th class="p-4 font-bold text-black">Nama Barang</th>
                            <th class="p-4 font-bold text-black">Kategori</th>
                            <th class="p-4 font-bold text-black">Supplier</th>
                            <th class="p-4 font-bold text-black">Stok Tersedia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="barang.length === 0">
                            <td colspan="4" class="p-4 text-center text-gray-400 font-medium">Memuat data atau data kosong...</td>
                        </tr>
                        <tr v-for="item in barang" :key="item.id" class="border-b hover:bg-gray-50 transition">
                            <td class="p-4 font-bold text-gray-800">{{ item.nama_barang }}</td>
                            <td class="p-4 text-gray-600">{{ item.nama_kategori || '-' }}</td>
                            <td class="p-4 text-gray-600">{{ item.supplier || '-' }}</td>
                            <td class="p-4">
                                <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                                    {{ item.stok }} Unit
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="w-full max-w-6xl bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center gap-3 mb-4">
                <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">Histori Keluar / Masuk Barang</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th class="p-4 font-bold text-black">ID Barang</th>
                            <th class="p-4 font-bold text-black">Jenis Transaksi</th>
                            <th class="p-4 font-bold text-black">Jumlah</th>
                            <th class="p-4 font-bold text-black">Tanggal & Waktu</th>
                            <th class="p-4 font-bold text-black">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="histori.length === 0">
                            <td colspan="5" class="p-4 text-center text-gray-400 font-medium">Memuat histori transaksi...</td>
                        </tr>
                        <tr v-for="h in histori" :key="h.id" class="border-b hover:bg-gray-50 transition">
                            <td class="p-4 text-gray-800 font-medium">#{{ h.id_barang }}</td>
                            <td class="p-4">
<span :class="h.jenis_transaksi === 'masuk' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'" class="px-3 py-1 rounded-full text-sm font-bold capitalize">
                                    {{ h.jenis_transaksi }}
                                </span>
                            </td>
                            <td class="p-4 font-bold">{{ h.jumlah }}</td>
                            <td class="p-4 text-gray-600 text-sm">{{ h.tanggal || '-' }}</td>
                            <td class="p-4 text-gray-600 text-sm">{{ h.keterangan || '-' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    `,
    data() {
        return {
            showLogin: false,
            barang: [],
            histori: []
        };
    },
    mounted() {
        // Menggunakan URL lengkap (http://localhost:8080) agar tidak ditimpa oleh default /api
        const baseURL = 'http://localhost:8080';

        // Mengambil Data Barang
        axios.get(baseURL + '/public/barang')
            .then(res => this.barang = res.data)
            .catch(err => console.error("Gagal load barang:", err));

        // Mengambil Data Histori
        axios.get(baseURL + '/public/histori')
            .then(res => this.histori = res.data)
            .catch(err => console.error("Gagal load histori:", err));
    }
};