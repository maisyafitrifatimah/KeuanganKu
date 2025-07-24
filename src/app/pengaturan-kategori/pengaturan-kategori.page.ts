import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PostProvider } from '../../provider/post-provider';

@Component({
  selector: 'app-pengaturan-kategori',
  templateUrl: './pengaturan-kategori.page.html',
  styleUrls: ['./pengaturan-kategori.page.scss'],
  standalone: false,
})
export class PengaturanKategoriPage implements OnInit {
  tab: string = 'Pendapatan';
  kategoriList: any[] = [];

  iconOptions = [
    'cash-outline', 'briefcase-outline', 'logo-youtube', 'gift-outline', 'add-circle-outline',
    'restaurant-outline', 'bus-outline', 'cart-outline', 'document-text-outline', 'happy-outline',
    'remove-circle-outline', 'pricetag-outline'
  ];

  constructor(
    private postPvd: PostProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadKategori();
  }

  segmentChanged(event: any) {
    this.tab = event.detail.value;
    this.loadKategori();
  }

  loadKategori() {
    const body = {
      aksi: 'get_kategori',
      tipe: this.tab
    };

    this.postPvd.postData(body, 'action.php').subscribe(data => {
      if (data.success) {
        this.kategoriList = data.kategori;
      }
    });
  }

  async tambahKategori() {
    const iconAlert = await this.alertCtrl.create({
      header: 'Pilih Ikon',
      inputs: this.iconOptions.map(icon => ({
        type: 'radio',
        label: icon,
        value: icon
      })),
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Lanjut',
          handler: async (selectedIcon) => {
            const namaAlert = await this.alertCtrl.create({
              header: 'Nama Kategori',
              inputs: [{ name: 'nama', type: 'text', placeholder: 'Masukkan nama kategori' }],
              buttons: [
                { text: 'Batal', role: 'cancel' },
                {
                  text: 'Simpan',
                  handler: (data) => {
                    const body = {
                      aksi: 'tambah_kategori',
                      nama: data.nama,
                      tipe: this.tab,
                      icon: selectedIcon
                    };
                    this.postPvd.postData(body, 'action.php').subscribe(async res => {
                      const toast = await this.toastCtrl.create({
                        message: res.success ? 'Kategori ditambahkan!' : 'Gagal menambah kategori.',
                        duration: 2000
                      });
                      toast.present();
                      this.loadKategori();
                    });
                  }
                }
              ]
            });
            await namaAlert.present();
          }
        }
      ]
    });

    await iconAlert.present();
  }

  async editKategori(item: any) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Kategori',
      inputs: [
        {
          name: 'nama',
          type: 'text',
          value: item.nama,
          placeholder: 'Nama kategori'
        },
        {
          name: 'icon',
          type: 'text',
          value: item.icon,
          placeholder: 'Nama ikon (misal: cash-outline)'
        }
      ],
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Simpan',
          handler: (data) => {
            const body = {
              aksi: 'edit_kategori',
              id: item.id,
              nama: data.nama,
              icon: data.icon
            };
            this.postPvd.postData(body, 'action.php').subscribe(async res => {
              const toast = await this.toastCtrl.create({
                message: res.success ? 'Kategori diperbarui!' : 'Gagal memperbarui kategori.',
                duration: 2000
              });
              toast.present();
              this.loadKategori();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async hapusKategori(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Hapus Kategori',
      message: 'Yakin ingin menghapus kategori ini?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          handler: () => {
            const body = {
              aksi: 'hapus_kategori',
              id: id
            };
            this.postPvd.postData(body, 'action.php').subscribe(async res => {
              const toast = await this.toastCtrl.create({
                message: res.success ? 'Kategori dihapus!' : 'Gagal menghapus kategori.',
                duration: 2000
              });
              toast.present();
              this.loadKategori();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  getIconName(icon: string): string {
    return icon || 'pricetag-outline';
  }
}
