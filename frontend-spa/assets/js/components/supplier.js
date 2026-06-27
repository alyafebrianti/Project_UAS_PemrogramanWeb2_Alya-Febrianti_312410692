const Supplier = {
    template: `
        <div class="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Data Supplier</h2>
                    <p class="text-sm text-gray-500">Kelola informasi kontak supplier barang.</p>
                </div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-purple-50 border-b border-purple-100">
                        <tr>
                            <th class="p-3 border-b-0 text-gray-700 text-sm">Nama Supplier</th>
                            <th class="p-3 border-b-0 text-gray-700 text-sm">No. Telepon</th>
                            <th class="p-3 border-b-0 text-gray-700 text-sm">Alamat</th>
                            <th class="p-3 border-b-0 text-center text-gray-700 text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in suppliers" :key="item.id" class="border-b hover:bg-purple-50/40 transition text-sm">
                            <td class="p-3 font-medium text-gray-800">{{ item.nama_supplier }}</td>
                            <td class="p-3 text-gray-600">{{ item.no_telepon || '-' }}</td>
                            <td class="p-3 text-gray-600">{{ item.alamat || '-' }}</td>
                            <td class="p-3 text-center">
                                <button @click="openModal(item)" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs font-medium mr-2 transition">Edit</button>
                                <button @click="deleteItem(item.id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition">Hapus</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
                    <h3 class="font-bold text-lg text-gray-800 mb-4">Edit Data Supplier</h3>
                    <form @submit.prevent="saveItem">
                        <div class="mb-3">
                            <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Nama Supplier</label>
                            <input v-model="form.nama_supplier" class="w-full border border-gray-300 p-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-purple-500 outline-none" required>
                        </div>
                        <div class="mb-3">
                            <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">No. Telepon</label>
                            <input v-model="form.no_telepon" class="w-full border border-gray-300 p-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-purple-500 outline-none" required>
                        </div>
                        <div class="mb-5">
                            <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Alamat Lengkap</label>
                            <textarea v-model="form.alamat" rows="3" class="w-full border border-gray-300 p-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-purple-500 outline-none" required></textarea>
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
        return { suppliers: [], showModal: false, form: { id: null, nama_supplier: '', no_telepon: '', alamat: '' } }
    },
    mounted() { this.fetchData(); },
    methods: {
        async fetchData() {
            try {
                const res = await axios.get('/supplier');
                this.suppliers = res.data;
            } catch (err) { console.error(err); }
        },
        openModal(item) {
            this.form = { ...item };
            this.showModal = true;
        },
        async saveItem() {
            try {
                await axios.put('/supplier/' + this.form.id, this.form);
                this.showModal = false;
                this.fetchData();
            } catch (e) { alert("Gagal menyimpan data."); }
        },
        async deleteItem(id) {
            if (confirm("Hapus supplier ini? Pastikan tidak ada barang yang terkait.")) {
                try {
                    await axios.delete('/supplier/' + id);
                    this.fetchData();
                } catch (e) { alert("Gagal menghapus."); }
            }
        }
    }
};

