var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('./tataUsaha/daftarPengguna');
});

router.get('/TUdaftarTK', function(req, res, next){
  res.render('./tataUsaha/daftarPengguna', {
    namaBrand: 'Hubadci', 
    namaSekolah: 'SMK Pusdikhubad Cimahi',
    namaPengguna: 'rangerMerah',
    jenisPengguna: 'Tenaga Kependidikan',
    thSatu: 'NAMA LENGKAP',
    thDua: 'JABATAN',
    thTiga: 'RATING',
    thEmpat: 'STATUS'
  });
});

router.get('/TUdaftarGuru', function(req, res, next){
  res.render('./admin/daftarPengguna', {
    namaBrand: 'Hubadci', 
    namaSekolah: 'SMK Pusdikhubad Cimahi',
    namaPengguna: 'rangerMerah',
    jenisPengguna: 'Guru',
    thSatu: 'NAMA LENGKAP',
    thDua: 'MATA PELAJARAN',
    thTiga: 'RATING',
    thEmpat: 'STATUS'
  });
});

router.get('/TUdaftarSiswa', function(req, res, next){
  res.render('./admin/daftarPengguna', {
    namaBrand: 'Hubadci', 
    namaSekolah: 'SMK Pusdikhubad Cimahi',
    namaPengguna: 'rangerMerah',
    jenisPengguna: 'Peserta Didik',
    thSatu: 'NAMA LENGKAP',
    thDua: 'KELAS',
    thTiga: 'KOMPETENSI KEAHLIAN',
    thEmpat: 'STATUS'
  });
});

router.get('/TUdaftarWali', function(req, res, next){
  res.render('./admin/daftarPengguna', {
    namaBrand: 'Hubadci', 
    namaSekolah: 'SMK Pusdikhubad Cimahi',
    namaPengguna: 'rangerMerah',
    jenisPengguna: 'Peserta Didik',
    thSatu: 'NAMA LENGKAP',
    thDua: 'NAMA PESERTA DIDIK',
    thTiga: 'KELAS',
    thEmpat: 'STATUS'
  });
});

module.exports = router;
