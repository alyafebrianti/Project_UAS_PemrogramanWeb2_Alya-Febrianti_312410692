<?php
namespace App\Models;
use CodeIgniter\Model;

class HistoriModel extends Model {
    protected $table = 'histori';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id_barang', 'jenis_transaksi', 'jumlah', 'keterangan', 'tanggal'];
}