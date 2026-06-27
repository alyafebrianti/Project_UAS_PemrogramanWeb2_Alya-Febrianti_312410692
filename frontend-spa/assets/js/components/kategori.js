const Kategori = {
    template: `
        <div class="p-6 bg-white rounded-xl shadow-md border border-purple-100">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Data Kategori</h2>
            <table class="w-full text-left border-collapse">
                <thead class="bg-purple-50 border-b-2 border-purple-100">
                    <tr>
                        <th class="p-3 text-gray-700">ID</th>
                        <th class="p-3 text-gray-700">Nama Kategori</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in kategori" :key="item.id" class="border-b hover:bg-purple-50/40 transition text-sm">
                        <td class="p-3 font-medium text-gray-800">{{ item.id }}</td>
                        <td class="p-3 text-gray-600">{{ item.nama_kategori }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data() {
        return { kategori: [] }
    },
    mounted() {
        axios.get('/kategori')
            .then(res => {
                this.kategori = res.data;
            })
            .catch(err => {
                console.error("Gagal mengambil data:", err);
            });
    }
};

