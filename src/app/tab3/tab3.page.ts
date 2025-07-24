import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../provider/post-provider';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  jenis: string = 'Pendapatan';
  kategori: string = '';
  rekening: number | null = null;
  nominal: number | null = null;
  deskripsi: string = '';
  tanggal: Date = new Date();
  jam: string = '';

  daftarKategori: any[] = [];
  daftarRekening: any[] = [];

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvd: PostProvider,
    private dbService: DatabaseService
  ) {}

  ngOnInit() {
    const now = new Date();
    this.tanggal = now;
    this.jam = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    this.ambilKategori();
    this.ambilRekening();
  }

  ionViewWillEnter() {
    this.ambilKategori(); 
    this.ambilRekening(); 
  }

  ambilKategori() {
    const body = {
      aksi: 'get_kategori',
      tipe: this.jenis  
    };

    this.postPvd.postData(body, 'action.php').subscribe(res => {
      if (res.success) {
        this.daftarKategori = res.kategori;
      } else {
        this.daftarKategori = [];
        console.error('Gagal ambil kategori:', res.msg);
      }
    });
  }

  ambilRekening() {
    this.postPvd.postData({ aksi: 'get_rekening' }, 'action.php').subscribe(res => {
      if (res.success) {
        this.daftarRekening = res.rekening;
      } else {
        this.daftarRekening = [];
        console.error('Gagal ambil rekening:', res.msg);
      }
    });
  }

  jenisChanged(event: any) {
    this.jenis = event.detail.value;
    this.ambilKategori(); 
  }

  async simpanTransaksi() {
    if (!this.kategori || !this.rekening || !this.nominal) {
      const toast = await this.toastController.create({
        message: 'Harap lengkapi semua field!',
        duration: 2000
      });
      await toast.present();
      return;
    }

    const body = {
      jenis: this.jenis,
      kategori: this.kategori,
      id_rekening: this.rekening,
      nominal: this.nominal,
      deskripsi: this.deskripsi,
      tanggal: this.tanggal.toISOString().split('T')[0],
      jam: this.jam,
      aksi: 'tambah_transaksi'
    };

    this.postPvd.postData(body, 'action.php').subscribe(async data => {
      const toast = await this.toastController.create({
        message: data.success ? 'Transaksi berhasil disimpan!' : 'Gagal menyimpan transaksi.',
        duration: 2000
      });
      await toast.present();

      if (data.success){
      this.dbService.notifyDataChange();
      this.router.navigate(['/tab1']);
      }
    });
  }
}
