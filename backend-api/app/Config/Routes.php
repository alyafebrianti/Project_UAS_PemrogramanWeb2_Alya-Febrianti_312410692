<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// Rute Publik (Pengunjung)
$routes->get('public/barang', '\App\Controllers\Api\Barang::index');
$routes->get('public/histori', '\App\Controllers\Api\Histori::index');

$routes->group('api', function($routes) {
    
    // Jalur Pemanasan CORS
    $routes->options('login', static function() {
        return \Config\Services::response()->setStatusCode(200);
    });
    
    // Rute Login Admin
    $routes->post('login', '\App\Controllers\Api\Auth::login');

    // Rute CRUD Utama (Wajib Login / Ada Filter apiauth)
    $routes->resource('barang', ['controller' => '\App\Controllers\Api\Barang', 'filter' => 'apiauth']);
    
    // --- INI YANG DIUBAH ---
    // Gunakan 'resource' agar Vue bisa mengirim data Edit (PUT) dan Hapus (DELETE)
    $routes->resource('supplier', ['controller' => '\App\Controllers\Api\Supplier', 'filter' => 'apiauth']);
    $routes->resource('histori', ['controller' => '\App\Controllers\Api\Histori', 'filter' => 'apiauth']);
    
    // Kategori tetap 'get' saja jika memang belum ada fitur tambah/edit kategori
    $routes->get('kategori', 'Api\Kategori::index');
});