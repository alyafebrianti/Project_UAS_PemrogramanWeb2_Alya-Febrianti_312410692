<?php
namespace App\Filters;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class ApiAuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $header = $request->getServer('HTTP_AUTHORIZATION');
        // Jika tidak ada token yang dikirim dari VueJS/Postman
        if (!$header) {
            return \Config\Services::response()
                ->setStatusCode(401)
                ->setJSON(['status' => false, 'message' => 'Akses Ditolak! Token tidak ditemukan.']);
        }
    }
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}