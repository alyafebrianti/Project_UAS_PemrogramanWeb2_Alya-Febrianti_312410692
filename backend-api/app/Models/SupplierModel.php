<?php
namespace App\Models;
use CodeIgniter\Model;

class SupplierModel extends Model {
    protected $table = 'supplier';
    protected $primaryKey = 'id';
    protected $allowedFields = ['nama_supplier', 'no_telepon', 'alamat'];
}