<?php

namespace App\Models;

use CodeIgniter\Model;

class BarangModel extends Model
{
    protected $table      = 'barang';
    protected $primaryKey = 'id';

    // Kolom yang diizinkan untuk diisi/diubah
    protected $allowedFields = ['nama_barang', 'id_kategori', 'supplier', 'stok', 'harga'];

    // Menghubungkan tabel barang dengan kategori agar bisa menampilkan Nama Kategori
    public function getBarangLengkap()
    {
        return $this->select('barang.*, kategori.nama_kategori')
                    ->join('kategori', 'kategori.id = barang.id_kategori', 'left')
                    ->orderBy('barang.id', 'DESC')
                    ->findAll();
    }
}