<?php
namespace App\Controllers\Api;
use CodeIgniter\RESTful\ResourceController;
use App\Models\SupplierModel;

class Supplier extends ResourceController {
    public function index() {
        return $this->respond((new SupplierModel())->findAll());
    }

    public function update($id = null) {
        $data = $this->request->getJSON(true) ?? $this->request->getRawInput();
        (new SupplierModel())->update($id, $data);
        return $this->respond(['status' => true, 'message' => 'Supplier diedit']);
    }

    public function delete($id = null) {
        (new SupplierModel())->delete($id);
        return $this->respondDeleted(['status' => true]);
    }
}