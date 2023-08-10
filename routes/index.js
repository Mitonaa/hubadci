var express = require('express');
var router = express.Router();
var connection = require('../config/database');
const multer = require('multer');
const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');

//Multer code
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './csvFiles/')    
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({
  storage: storage
});
//End of multer code

/* GET page Pengguna Aplikasi. */
router.get('/', function(req, res, next) {
  res.render('./admin/index', {
    namaBrand: 'Hubadci', 
    namaSekolah: 'SMK Pusdikhubad Cimahi',
    namaPengguna: 'rangerMerah',
    tahunAjaran: '2023/2024',
    tahunLulusan: '2022/2023',
    //Pengumuman-Pengumuman Baiknya 8/9  Baris
    pengumumanTatausaha: 'Belum ada pengumuman dari Tata Usaha',
    pengumumanKurikulum: 'Belum ada pengumuman dari Kurikulum',
    pengumumanKesiswaan: 'Belum ada pengumuman dari Kesiswaan',
    pengumumanHubin: 'Belum ada pengumuman dari Hubin/Humas',
    pengumumanSarpras: 'Belum ada pengumuman dari Sarana Prasarana'
  });
});

/* getData detail*/
router.get('/akunKepsek', function (req, res, next) {
  //query
  connection.query('SELECT * FROM tblpengguna WHERE jenisPengguna ="229801"', function (err, rows) {
      if (err) {
          req.flash('error', err);
          res.render('./admin/detailAkun', {
            data: ''
          });
      } else {
          //render ke view posts index
          res.render('./admin/detailAkun', {
            namaBrand: 'Hubadci', 
            namaSekolah: 'SMK Pusdikhubad Cimahi',
            namaPengguna: 'rangerMerah',
            fotoProfil: rows[0].fotoProfil,
            namaLengkap: rows[0].namaLengkap,
            gelar: rows[0].gelarPengguna,
            email: rows[0].emailPengguna,
            jabatan: rows[0].jabatanPengguna,
            nomorTelepon: rows[0].nomorTelepon,
            alamatRumah: rows[0].alamatRumah,
            alamatKota: rows[0].alamatKota,
            kodePosRumah: rows[0].kodePosRumah,
            kebangsaan: rows[0].kebangsaanPengguna,
            tempatLahir: rows[0].tempatLahir,
            tanggalLahir: rows[0].tanggalLahir,
            usia: rows[0].usiaPengguna,
            username: rows[0].usernamePengguna,
            password: rows[0].passwordPengguna
          });
      }
  });
});
/*END CRUD MODUL*/

router.get('/daftarTenagaKependidikan', function(req, res, next){
  connection.query('SELECT * FROM tblpengguna WHERE jenisPengguna ="229831"', function (err, rows) {
    if (err) {
      req.flash('error', err);
      res.render('./admin/daftarPengguna', {
        data: ''
      });
  } else {
    res.render('./admin/daftarPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      jenisPengguna: 'Tenaga Kependidikan',
      thSatu: 'NAMA LENGKAP',
      thDua: 'JABATAN',
      thTiga: 'RATING',
      thEmpat: 'STATUS',
      data: rows
     });
    }
  });
});

/*get daftar guru*/
router.get('/daftarGuru', function (req, res, next) {
  //query
  connection.query('SELECT * FROM tblpengguna WHERE jenisPengguna ="229842"', function (err, rows) {
      if (err) {
          req.flash('error', err);
          res.render('./admin/daftarPengguna', {
            data: ''
          });
      } else {
          //render ke view posts index
          res.render('./admin/daftarPengguna', {
            namaBrand: 'Hubadci', 
            namaSekolah: 'SMK Pusdikhubad Cimahi',
            namaPengguna: 'rangerMerah',
            jenisPengguna: 'Guru',
            thSatu: 'NAMA LENGKAP',
            thDua: 'MATA PELAJARAN',
            thTiga: 'NOMOR TELEPON',
            thEmpat: 'STATUS',
            data: rows     
          });
      }
  });
});

/* end get daftar guru*/
router.get('/tambahPengguna', function(req, res, next){
  res.render('./admin/tambahPengguna',{
    namaBrand: 'Hubadci', 
    namaSekolah: 'SMK Pusdikhubad Cimahi',
    namaPengguna: 'rangerMerah',
    fotoProfil: '../assets/img/avatars/1.png',
    namaLengkap: '',
    gelar: '',
    email: '',
    jabatan: '',
    nomorTelepon: '',
    alamatRumah: '',
    alamatKota: '',
    kodePosRumah: '',
    kebangsaan: '',
    tempatLahir: '',
    tanggalLahir: '',
    usia: '',
    username: '',
    password: ''
  })
})

router.post('/simpanPengguna', function(req, res, next){
  let namaLengkap = req.body.namaLengkap;
  let gelar = req.body.gelar;
  let email = req.body.email;
  let jabatan = req.body.jabatan;
  let nomorTelepon = req.body.nomorTelepon;
  let alamatRumah = req.body.alamatRumah;
  let alamatKota = req.body.alamatKota;
  let kodePosRumah = req.body.kodePosRumah;
  let kebangsaan = req.body.kebangsaan;
  let tempatLahir = req.body.tempatLahir;
  let tanggalLahir = req.body.tanggalLahir;
  let usia = req.body.usia;
  let username = req.body.username;
  let password = req.body.password;
  let errors = false;

  if(namaLengkap.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Nama Lengkap");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(gelar.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Nama Gelar");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(email.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Email");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(jabatan.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Jabatan");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(nomorTelepon.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Nomor Telepon");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(alamatRumah.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Alamat Rumah");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(alamatKota.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Alamat Kota");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(kodePosRumah.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Kode Pos");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(kebangsaan.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Kebangsaan");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(tempatLahir.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Tempat Lahir");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(tanggalLahir.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Tanggal Lahir");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(usia.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Usia");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(username.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Username");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  if(password.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Password");
    // render to add.ejs with flash message
    res.render('./admin/tambahPengguna', {
      namaBrand: 'Hubadci', 
      namaSekolah: 'SMK Pusdikhubad Cimahi',
      namaPengguna: 'rangerMerah',
      fotoProfil: '../assets/img/avatars/1.png',
      namaLengkap: namaLengkap,
      gelar: gelar,
      email: email,
      jabatan: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaan: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usia: usia,
      username: username,
      password: password
    })
  }

  //if no errors
  if(!errors){
    let formData ={
      fotoProfil: "../assets/img/avatars/1.png",
      namaLengkap: namaLengkap,
      gelarPengguna: gelar,
      emailPengguna: email,
      jabatanPengguna: jabatan,
      nomorTelepon: nomorTelepon,
      alamatRumah: alamatRumah,
      alamatKota: alamatKota,
      kodePosRumah: kodePosRumah,
      kebangsaanPengguna: kebangsaan,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      usiaPengguna: usia,
      usernamePengguna: username,
      passwordPengguna: password
    }
    connection.query('INSERT INTO tblpengguna SET ?', formData, function(err, result){
      if (err) {
        req.flash('error', err);
         
        // render to add.ejs
        res.render('./admin/tambahPengguna', {
          namaBrand: 'Hubadci', 
          namaSekolah: 'SMK Pusdikhubad Cimahi',
          namaPengguna: 'rangerMerah',
          fotoProfil: formData.fotoProfil,
          namaLengkap: formData.namaLengkap,
          gelar: formData.gelar,
          email: formData.email,
          jabatan: formData.jabatan,
          nomorTelepon: formData.nomorTelepon,
          alamatRumah: formData.alamatRumah,
          alamatKota: formData.alamatKota,
          kodePosRumah: formData.kodePosRumah,
          kebangsaan: formData.kebangsaan,
          tempatLahir: formData.tempatLahir,
          tanggalLahir: formData.tanggalLahir,
          usia: formData.usia,
          username: formData.username,
          password: formData.password
        });
    } else {                
        req.flash('success', 'Data Berhasil Disimpan!');
        res.redirect('/daftarGuru');
    }
    });
  }
});

router.post('/unggahPengguna', upload.single("import-csv"), function(req, res) {
  uploadCsv(__dirname + '../../csvFiles/' + req.file.filename);
  console.log('File has imported :' + error);
});
  function uploadCsv(uriFile){
    let stream = fs.createReadStream(uriFile);
    let csvDataColl = [];
    let fileStream = csv
        .parse()
        .on("data", function (data) {
            csvDataColl.push(data);
        })
        .on("end", function () {
            csvDataColl.shift();
  
            
                    let query = 'INSERT INTO tblpengguna (`idPengguna`,`jenisPengguna`,`namaLengkap`,`gelarPengguna`,`emailPengguna`,`jabatanPengguna`,`nomorTelepon`,`alamatRumah`,`alamatKota`,`kodePosRumah`,`kebangsaanPengguna`,`tempatLahir`,`tanggalLahir`,`usiaPengguna`,`usernamePengguna`,`passwordPengguna`,`fotoProfil`) VALUES ?';
                    connection.query(query, [csvDataColl], (error, res) => {
                        console.log(error || res);
                    });
               
             
            fs.unlinkSync(uriFile)
        });
  
    stream.pipe(fileStream);
  }


router.get('/daftarPesertaDidik', function(req, res, next){
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

router.get('/daftarWali', function(req, res, next){
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

router.get('/daftarYayasan', function(req, res, next){
  res.render('./admin/daftarPengguna', {
    namaBrand: 'Hubadci', 
    namaSekolah: 'SMK Pusdikhubad Cimahi',
    namaPengguna: 'rangerMerah',
    jenisPengguna: 'Peserta Didik',
    thSatu: 'NAMA LENGKAP',
    thDua: 'JABATAN',
    thTiga: 'NOMOR TELEPON',
    thEmpat: 'STATUS'
  });
});
/* End Daftar Pengguna Aplikasi */

/*Tambah Pengguna Aplikasi*/

/* Get Page Under Construction */
router.get('/underConstruction', function(req, res, next){
  res.render('./underConstruction');
});
/* End Under Construction */

/* Get Page Dashboard Tata Usaha */
router.get('/dashboardTU', function(req, res, next){
  res.render('./admin/dashboardTU',{
    namaBrand: 'Hubadci', 
    namaSekolah: 'SMK Pusdikhubad Cimahi',
    namaPengguna: 'rangerMerah',
    tahunAjaran: '2023/2024',
    tahunLulusan: '2022/2023',
    //Pengumuman-Pengumuman Baiknya 8/9  Baris
    pengumumanTatausaha: 'Belum ada pengumuman dari Tata Usaha',
    pengumumanKurikulum: 'Belum ada pengumuman dari Kurikulum',
    pengumumanKesiswaan: 'Belum ada pengumuman dari Kesiswaan',
    pengumumanHubin: 'Belum ada pengumuman dari Hubin/Humas',
    pengumumanSarpras: 'Belum ada pengumuman dari Sarana Prasarana'
  });
});
/* End Page Dashboard Tata Usaha */

module.exports = router;
