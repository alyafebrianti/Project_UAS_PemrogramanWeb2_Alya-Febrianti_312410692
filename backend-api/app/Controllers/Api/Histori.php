<?php
namespace App\Controllers\Api;
use CodeIgniter\RESTful\ResourceController;
use App\Models\HistoriModel;
use App\Models\BarangModel;

class Histori extends ResourceController {
    public function index() {
        return $this->respond((new HistoriModel())->orderBy('tanggal', 'DESC')->findAll());
    }

    public function create() {
        $data = $this->request->getJSON(true);
        $data['tanggal'] = date('Y-m-d H:i:s');
        
        if ((new HistoriModel())->insert($data)) {
            // Terapkan penambahan/pengurangan stok
            $this->updateStokBarang($data['id_barang'], $data['jenis_transaksi'], $data['jumlah'], 'apply');
            return $this->respondCreated(['status' => true, 'message' => 'Transaksi dicatat & stok diupdate']);
        }
        return $this->fail('Gagal simpan histori');
    }

    // FUNGSI BARU: Untuk mengubah data histori
    public function update($id = null) {
        $data = $this->request->getJSON(true);
        $hModel = new HistoriModel();
        
        $oldHistori = $hModel->find($id);
        if ($oldHistori) {
            // 1. REVERT: Kembalikan stok barang ke keadaan sebelum histori ini dibuat
            $this->updateStokBarang($oldHistori['id_barang'], $oldHistori['jenis_transaksi'], $oldHistori['jumlah'], 'revert');
            
            // 2. UPDATE: Simpan perubahan histori
            $hModel->update($id, $data);
            
            // 3. APPLY: Terapkan stok dari inputan histori yang baru
            $this->updateStokBarang($data['id_barang'], $data['jenis_transaksi'], $data['jumlah'], 'apply');
            
            return $this->respond(['status' => true, 'message' => 'Histori diubah & stok disesuaikan ulang']);
        }
        return $this->failNotFound('Histori tidak ditemukan');
    }

    // FUNGSI BARU: Untuk menghapus data histori
    public function delete($id = null) {
        $hModel = new HistoriModel();
        $oldHistori = $hModel->find($id);
        
        if ($oldHistori) {
            // Jika histori dihapus, kembalikan stoknya seperti semula
            $this->updateStokBarang($oldHistori['id_barang'], $oldHistori['jenis_transaksi'], $oldHistori['jumlah'], 'revert');
            $hModel->delete($id);
            return $this->respondDeleted(['status' => true]);
        }
        return $this->failNotFound('Histori tidak ditemukan');
    }

    // --- FUNGSI BANTUAN UNTUK MENGHITUNG MATEMATIKA STOK ---
    private function updateStokBarang($id_barang, $jenis, $jumlah, $action) {
        $bModel = new BarangModel();
        $barang = $bModel->find($id_barang);
        
        if ($barang) {
            $stokSekarang = (int)$barang['stok'];
            $jumlah = (int)$jumlah;
            
            if ($action == 'apply') { // Saat menambah data baru
                $stokBaru = ($jenis == 'masuk') ? $stokSekarang + $jumlah : $stokSekarang - $jumlah;
            } else { // Saat revert/membatalkan data lama
                $stokBaru = ($jenis == 'masuk') ? $stokSekarang - $jumlah : $stokSekarang + $jumlah;
            }
            
            $bModel->update($id_barang, ['stok' => $stokBaru]);
        }
    }
}