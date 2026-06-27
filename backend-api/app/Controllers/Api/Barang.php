<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BarangModel;
use App\Models\SupplierModel; // Tambahkan Model Supplier
use App\Models\HistoriModel;  // Tambahkan Model Histori

class Barang extends ResourceController
{
    protected $format = 'json';

    public function index()
    {
        // Tetap menggunakan fungsi kustom milikmu agar relasi tabel tetap jalan
        return $this->respond((new BarangModel())->getBarangLengkap());
    }

    public function create()
    {
        $data = $this->request->getJSON(true) ?? $this->request->getPost();
        
        $barangModel = new BarangModel();
        
        // 1. Simpan Barang Utama terlebih dahulu
        if ($barangModel->insert($data)) {
            $id_barang = $barangModel->getInsertID(); // Ambil ID barang yang baru tersimpan

            // 2. OTOMATISASI SUPPLIER
            // Cek apakah ada input 'supplier', jika ada, cek di database
            if (!empty($data['supplier'])) {
                $supplierModel = new SupplierModel();
                $cekSupplier = $supplierModel->where('nama_supplier', $data['supplier'])->first();
                
                // Jika nama supplier belum ada di database, tambahkan otomatis
                if (!$cekSupplier) {
                    $supplierModel->insert([
                        'nama_supplier' => $data['supplier'],
                       'no_telepon'    => isset($data['no_telepon']) ? $data['no_telepon'] : 'Belum diisi', 
                        'alamat'        => isset($data['alamat']) ? $data['alamat'] : 'Belum diisi'
                    ]);
                }
            }

            // 3. OTOMATISASI HISTORI
            // Catat transaksi barang masuk secara otomatis
            $historiModel = new HistoriModel();
            $historiModel->insert([
                'id_barang'       => $id_barang,
                'jenis_transaksi' => 'masuk',
                'jumlah'          => isset($data['stok']) ? $data['stok'] : 0,
                'tanggal'         => date('Y-m-d H:i:s'),
                'keterangan'      => 'Barang baru ditambahkan ke sistem'
            ]);

            return $this->respondCreated(['status' => true, 'message' => 'Barang, Histori, dan Supplier otomatis ditambahkan']);
        }
        
        return $this->fail('Gagal menyimpan barang');
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true) ?? $this->request->getRawInput();
        if ((new BarangModel())->update($id, $data)) {
            return $this->respond(['status' => true, 'message' => 'Barang diedit']);
        }
        return $this->fail('Gagal mengedit barang');
    }

    public function delete($id = null)
    {
        if ((new BarangModel())->delete($id)) {
            return $this->respondDeleted(['status' => true]);
        }
        return $this->failNotFound('Barang tidak ditemukan');
    }
}