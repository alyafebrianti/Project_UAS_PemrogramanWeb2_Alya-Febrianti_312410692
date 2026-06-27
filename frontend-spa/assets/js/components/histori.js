const Histori = {
    template: `
        <div class="p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Histori Transaksi</h2>
                    <p class="text-sm text-gray-500">Catat, ubah, dan kelola barang masuk/keluar.</p>
                </div>
                <button @click="openModal()" class="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition shadow-sm">+ Input Transaksi</button>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-purple-50 border-b border-purple-100">
                        <tr>
                            <th class="p-3 border-b-0 text-gray-700 text-sm">Nama Barang</th>
                            <th class="p-3 border-b-0 text-gray-700 text-sm">Jenis Transaksi</th>
                            <th class="p-3 border-b-0 text-gray-700 text-sm">Jumlah</th>
                            <th class="p-3 border-b-0 text-gray-700 text-sm">Keterangan</th>
                            <th class="p-3 border-b-0 text-center text-gray-700 text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in histori" :key="item.id" class="border-b hover:bg-purple-50/40 transition text-sm">
                            <td class="p-3 font-medium text-gray-800">{{ getNamaBarang(item.id_barang) }}</td>
                            <td class="p-3">
                                <span :class="item.jenis_transaksi === 'masuk' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'" class="px-2 py-1 rounded text-xs font-bold uppercase">
                                    {{ item.jenis_transaksi }}
                                </span>
                            </td>
                            <td class="p-3 font-bold text-gray-800">{{ item.jumlah }}</td>
                            <td class="p-3 text-gray-600">{{ item.keterangan || '-' }}</td>
                            <td class="p-3 text-center">
                                <button @click="openModal(item)" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs font-medium mr-2 transition">Edit</button>
                                <button @click="deleteItem(item.id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition">Hapus</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl max-h-screen overflow-y-auto">
                    <h3 class="font-bold text-lg text-gray-800 mb-4">{{ form.id ? 'Ubah Data Transaksi' : 'Input Transaksi Baru' }}</h3>
                    <form @submit.prevent="saveItem">
                        <div class="mb-3">
                            <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Pilih Barang</label>
                            <select v-model="form.id_barang" class="w-full border border-gray-300 p-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-purple-500 outline-none" required>
                                <option value="" disabled>-- Pilih Barang --</option>
                                <option v-for="b in barangList" :value="b.id" :key="b.id">
                                    {{ b.nama_barang }} (Sisa Stok: {{ b.stok }})
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Jenis Transaksi</label>
                            <select v-model="form.jenis_transaksi" class="w-full border border-gray-300 p-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-purple-500 outline-none" required>
                                <option value="masuk">Barang Masuk (Tambah Stok)</option>
                                <option value="keluar">Barang Keluar (Kurangi Stok)</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Jumlah Barang</label>
                            <input v-model="form.jumlah" type="number" min="1" class="w-full border border-gray-300 p-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-purple-500 outline-none" required>
                        </div>
                        <div class="mb-5">
                            <label class="block text-xs font-bold text-gray-700 mb-1 uppercase">Keterangan (Opsional)</label>
                            <textarea v-model="form.keterangan" rows="2" class="w-full border border-gray-300 p-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-purple-500 outline-none"></textarea>
                        </div>
                        <div class="flex justify-end gap-2 border-t pt-4">
                            <button type="button" @click="showModal=false" class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 text-sm rounded-md font-medium transition">Batal</button>
                            <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm rounded-md font-medium transition">Simpan & Update Stok</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            histori: [],
            barangList: [],
            showModal: false,
            form: { id: null, id_barang: '', jenis_transaksi: 'masuk', jumlah: 1, keterangan: '' }
        }
    },
    mounted() { this.fetchData(); },
    methods: {
        async fetchData() {
            try {
                const resHistori = await axios.get('/histori');
                this.histori = resHistori.data;
                const resBarang = await axios.get('/barang');
                this.barangList = resBarang.data;
            } catch (err) { console.error(err); }
        },
        getNamaBarang(id) {
            const barang = this.barangList.find(b => b.id == id);
            return barang ? barang.nama_barang : 'ID: ' + id;
        },
        openModal(item = null) {
            this.form = item ? { ...item } : { id: null, id_barang: '', jenis_transaksi: 'masuk', jumlah: 1, keterangan: '' };
            this.showModal = true;
        },
        async saveItem() {
            try {
                if (this.form.id) {
                    await axios.put('/histori/' + this.form.id, this.form);
                } else {
                    await axios.post('/histori', this.form);
                }
                this.showModal = false;
                this.fetchData();
                alert("Berhasil! Stok di menu Data Barang sudah otomatis diperbarui.");
            } catch (e) {
                alert("Gagal menyimpan transaksi. Pastikan tidak ada data kosong.");
            }
        },
        async deleteItem(id) {
            if (confirm("Hapus histori ini? Peringatan: Stok barang akan dikembalikan seperti semula.")) {
                try {
                    await axios.delete('/histori/' + id);
                    this.fetchData();
                    alert("Berhasil dihapus. Stok otomatis disesuaikan ulang.");
                } catch (e) { alert("Gagal menghapus histori."); }
            }
        }
    }
};

