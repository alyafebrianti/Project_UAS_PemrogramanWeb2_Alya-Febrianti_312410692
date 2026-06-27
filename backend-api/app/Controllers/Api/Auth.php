<?php
namespace App\Controllers\Api;
use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel; 

class Auth extends ResourceController
{
    protected $format = 'json';
    
    public function login()
    {
        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');
        
        $user = (new UserModel())->where('username', $username)->first();

        // Cek kecocokan data
        if ($user && $password === $user['userpassword']) {
            return $this->respond([
                'status' => 200, 
                'messages' => 'Login Berhasil',
                'data' => [
                    'token' => base64_encode("TOKEN-INVENTORY-" . $user['username'])
                ]
            ], 200);
        }
        return $this->failUnauthorized('Username atau Password salah!');
    }
}