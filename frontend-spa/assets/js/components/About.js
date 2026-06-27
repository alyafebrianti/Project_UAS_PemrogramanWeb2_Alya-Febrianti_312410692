const About = {
    template: `
        <div class="space-y-6">
            <div class="flex items-center gap-3 mb-6">
                <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h1 class="text-3xl font-bold text-gray-800">Tentang Aplikasi E-Inventory</h1>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-8 text-gray-700 leading-relaxed space-y-6">
                <p class="text-lg">
                    Halo! Selamat datang di <strong>E-Inventory</strong>. Sistem ini dirancang khusus untuk mempermudah Anda dalam mengelola stok barang, mencatat setiap transaksi keluar dan masuk, agar semuanya tertata dengan rapi, akurat, dan transparan.
                </p>
                
                <p>
                    Kami memahami bahwa mencatat barang secara manual sering kali memusingkan dan rentan keliru. Oleh karena itu, melalui aplikasi ini, Anda bisa dengan mudah memantau barang apa saja yang tersedia, melihat histori lengkap transaksi, hingga mengelola daftar supplier yang bekerja sama dengan kita dengan cepat.
                </p>

                <div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                    <h3 class="font-bold text-purple-800 mb-2">Fitur Unggulan E-Inventory:</h3>
                    <ul class="list-disc list-inside space-y-2 text-purple-700">
                        <li><strong>Dashboard & Katalog Barang:</strong> Melihat keseluruhan stok yang tersedia dengan antarmuka yang bersih dan mudah dipahami.</li>
                        <li><strong>Manajemen Kategori & Supplier:</strong> Mengelompokkan jenis barang dan mencatat pemasok secara terpusat.</li>
                        <li><strong>Histori Transaksi Akurat:</strong> Melacak kapan barang masuk dan dikeluarkan beserta jumlahnya. Semua tercatat rapi di histori.</li>
                    </ul>
                </div>

                <p>
                    Semoga E-Inventory bisa menjadi asisten digital yang dapat diandalkan untuk operasional gudang dan bisnis Anda. Jika ada kendala atau pertanyaan lebih lanjut, tim dukungan kami selalu siap membantu. Selamat bekerja!
                </p>
            </div>
        </div>
    `
};
