const Dashboard = {
    template: `
        <div class="p-6 bg-white rounded-xl shadow-md border border-purple-100">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Data Barang & Stok</h2>
                    <p class="text-sm text-gray-500">Kelola master data barang, supplier, dan harga.</p>
                </div>
                <button @click="openModal()" class="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition shadow-sm">+ Tambah Barang</button>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-purple-50">
                        <tr>
                            <th class="p-3 border-b text-gray-700 text-sm">Nama Barang</th>
                            <th class="p-3 border-b text-gray-700 text-sm">Kategori</th>
                            <th class="p-3 border-b text-gray-700 text-sm">Supplier</th>
                            <th class="p-3 border-b text-gray-700 text-sm">Stok</th>
                            <th class="p-3 border-b text-gray-700 text-sm">Harga</th>
                            <th class="p-3 border-b text-center text-gray-700 text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in barang" :key="item.id" class="border-b hover:bg-purple-50/60 transition text-sm">
                            <td class="p-3 font-medium text-gray-800">{{ item.nama_barang }}</td>
                            <td class="p-3 text-gray-600">{{ item.nama_kategori }}</td>
                            <td class="p-3 text-gray-600">{{ item.supplier || '-' }}</td>
                            <td class="p-3 font-bold" :class="{'text-red-600': item.stok < 5, 'text-green-600': item.stok >= 5}">{{ item.stok }}</td>
                            <td class="p-3 text-gray-600">Rp {{ new Intl.NumberFormat('id-ID').format(item.harga) }}</td>
                            <td class="p-3 text-center">
                                <button @click="openModal(item)" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs font-medium mr-2 transition">Edit</button>
                                <button @click="deleteItem(item.id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition">Hapus</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl max-h-screen overflow-y-auto border border-purple-100">
                    <h3 class="font-bold text-lg text-gray-800 mb-4">{{ form.id ? 'Edit Data Barang' : 'Tambah Data Barang' }}</h3>
                    <form @submit.prevent="saveItem">
                        <div class="mb-3">
                            <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Nama Barang</label>
                            <input v-model="form.nama_barang" class="w-full border border-gray-300 p-2 text-sm rounded focus:ring-2 focus:ring-purple-500 outline-none" required>
                        </div>
                        <div class="grid grid-cols-2 gap-3 mb-3">
                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Kategori</label>
                                <select v-model="form.id_kategori" class="w-full border border-gray-300 p-2 text-sm rounded focus:ring-2 focus:ring-purple-500 outline-none" required>
                                    <option value="1">Elektronik</option>
                                    <option value="2">Perabotan</option>
                                    <option value="3">Alat Tulis</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Stok Awal</label>
                                <input v-model="form.stok" type="number" class="w-full border border-gray-300 p-2 text-sm rounded focus:ring-2 focus:ring-purple-500 outline-none" required>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Nama Supplier</label>
                            <input v-model="form.supplier" placeholder="Contoh: PT. Sumber Makmur" class="w-full border border-gray-300 p-2 text-sm rounded focus:ring-2 focus:ring-purple-500 outline-none" required>
                        </div>

                        <div v-if="!form.id" class="mb-3 p-3 bg-purple-50 rounded border border-purple-100">
                            <p class="text-xs font-bold text-purple-700 mb-2 uppercase">Lengkapi Data Supplier (Otomatis Disimpan)</p>
                            <div class="mb-2">
                                <label class="block text-xs font-medium text-gray-700 mb-1">No. Telepon Supplier</label>
                                <input v-model="form.no_telepon" placeholder="Contoh: 0812..." class="w-full border border-gray-300 p-2 text-sm rounded focus:ring-2 focus:ring-purple-500 outline-none">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                                <textarea v-model="form.alamat" rows="2" placeholder="Contoh: Jl. Industri No. 5..." class="w-full border border-gray-300 p-2 text-sm rounded focus:ring-2 focus:ring-purple-500 outline-none"></textarea>
                            </div>
                        </div>
                        
                        <div class="mb-5">
                            <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Harga Barang</label>
                            <input v-model="form.harga" type="number" class="w-full border border-gray-300 p-2 text-sm rounded focus:ring-2 focus:ring-purple-500 outline-none" required>
                        </div>
                        
                        <div class="flex justify-end gap-2 border-t pt-4">
                            <button type="button" @click="showModal=false" class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 text-sm rounded-md font-medium transition">Batal</button>
                            <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm rounded-md font-medium transition">Simpan Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return { 
            barang: [], 
            showModal: false, 
            // Menambahkan state no_telepon dan alamat ke dalam form
            form: { id: null, nama_barang: '', id_kategori: '1', supplier: '', no_telepon: '', alamat: '', stok: '', harga: '' } 
        }
    },
    mounted() { 
        this.fetchData(); 
    },
    methods: {
        async fetchData() {
            try {
                const res = await axios.get('/barang');
                this.barang = res.data;
            } catch (err) { console.error(err); }
        },
        openModal(item = null) {
            // Memastikan kolom dikosongkan saat tambah data baru
            this.form = item ? { ...item, no_telepon: '', alamat: '' } : { id: null, nama_barang: '', id_kategori: '1', supplier: '', no_telepon: '', alamat: '', stok: '', harga: '' };
            this.showModal = true;
        },
        async saveItem() {
            try {
                const config = { headers: { 'Content-Type': 'application/json' } };
                if (this.form.id) {
                    await axios.put('/barang/' + this.form.id, this.form, config);
                } else {
                    await axios.post('/barang', this.form, config);
                }
                this.showModal = false;
                this.fetchData();
            } catch (e) { alert("Gagal menyimpan data."); }
        },
        async deleteItem(id) {
            if (confirm("Hapus barang ini?")) {
                try {
                    await axios.delete('/barang/' + id);
                    this.fetchData();
                } catch (e) { alert("Gagal menghapus."); }
            }
        }
    }
};