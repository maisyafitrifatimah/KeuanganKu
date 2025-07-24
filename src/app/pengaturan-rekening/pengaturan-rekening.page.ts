// Update untuk pengaturan-rekening.page.ts dengan fitur manual icon dari database, edit, dan hapus rekening

import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { PostProvider } from '../../provider/post-provider';

@Component({
  selector: 'app-pengaturan-rekening',
  templateUrl: './pengaturan-rekening.page.html',
  styleUrls: ['./pengaturan-rekening.page.scss'],
  standalone: false,
})
export class PengaturanRekeningPage implements OnInit {
  daftarRekening: { id: number, nama: string, saldo: number, icon: string }[] = [];
  iconOptions = [
    'wallet-outline', 'card-outline', 'cash-outline', 'business-outline',
    'briefcase-outline', 'bank-outline', 'pricetag-outline', 'logo-paypal'
  ];

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private postPvd: PostProvider
  ) {}

  ngOnInit() {
    this.ambilDataRekening();
  }

  ambilDataRekening() {
    this.postPvd.postData({ aksi: 'get_rekening' }, 'action.php').subscribe(data => {
      this.daftarRekening = data.rekening || [];
    });
  }

  getTotalRekening(): number {
    return this.daftarRekening.reduce((total, r) => total + r.saldo, 0);
  }

  async tampilkanFormTambah() {
    let selectedIcon = 'wallet-outline';

    const iconAlert = await this.alertCtrl.create({
      header: 'Pilih Ikon Rekening',
      inputs: this.iconOptions.map(icon => ({
        type: 'radio', label: icon, value: icon
      })),
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Lanjut',
          handler: async icon => {
            selectedIcon = icon;
            const formAlert = await this.alertCtrl.create({
              header: 'Tambah Rekening',
              inputs: [
                { name: 'nama', type: 'text', placeholder: 'Nama rekening' },
                { name: 'saldo', type: 'number', placeholder: 'Saldo awal' }
              ],
              buttons: [
                { text: 'Batal', role: 'cancel' },
                {
                  text: 'Simpan',
                  handler: data => {
                    if (data.nama && data.saldo) {
                      this.tambahRekening(data.nama, parseFloat(data.saldo), selectedIcon);
                    }
                  }
                }
              ]
            });
            await formAlert.present();
          }
        }
      ]
    });
    await iconAlert.present();
  }

  tambahRekening(nama: string, saldo: number, icon: string) {
    this.postPvd.postData({ aksi: 'tambah_rekening', nama, saldo, icon }, 'action.php').subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: res.success ? 'Rekening ditambahkan!' : 'Gagal menambah rekening.',
        duration: 2000
      });
      toast.present();
      this.ambilDataRekening();
    });
  }

  async hapusRekening(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Hapus Rekening?',
      message: 'Data akan dihapus permanen.',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          handler: () => {
            this.postPvd.postData({ aksi: 'hapus_rekening', id }, 'action.php').subscribe(async res => {
              const toast = await this.toastCtrl.create({
                message: res.success ? 'Rekening dihapus!' : 'Gagal menghapus rekening.',
                duration: 2000
              });
              toast.present();
              this.ambilDataRekening();
            });
          }
        }
      ]
    });
    alert.present();
  }

  async editRekening(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Rekening',
      inputs: [
        { name: 'nama', type: 'text', value: item.nama, placeholder: 'Nama rekening' },
        { name: 'saldo', type: 'number', value: item.saldo, placeholder: 'Saldo' }
      ],
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Simpan',
          handler: (data) => {
            this.postPvd.postData({
              aksi: 'edit_rekening',
              id: item.id,
              nama: data.nama,
              saldo: data.saldo
            }, 'action.php').subscribe(() => this.ambilDataRekening());
          }
        }
      ]
    });
    await alert.present();
  }
}
