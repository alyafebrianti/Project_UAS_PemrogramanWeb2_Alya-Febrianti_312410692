<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\KategoriModel;

class Kategori extends ResourceController {
    public function index() {
        $model = new KategoriModel();
        return $this->respond($model->findAll());
    }
}