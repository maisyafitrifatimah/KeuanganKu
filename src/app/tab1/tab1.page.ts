// tab1.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostProvider } from '../../provider/post-provider';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false, 
})
export class Tab1Page implements OnInit, OnDestroy {
 
  semuaTransaksi: any[] = [];
  transaksiPerTanggal: any[] = [];
  totalPendapatan: number = 0;
  totalPengeluaran: number = 0;
  totalSaldo: number = 0;
  bulanIni: Date = new Date();

  private destroy$ = new Subject<void>();

  constructor(
    private postPvd: PostProvider,
    private dbService: DatabaseService
  ) {
    this.dbService.dataChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('Perubahan data terdeteksi, menyegarkan transaksi...');
        this.ambilData();
      });
  }

  ngOnInit() {
    this.ambilData();
  }

  ionViewWillEnter() {
    this.ambilData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async ambilData() {
    this.totalPendapatan = 0;
    this.totalPengeluaran = 0;
    this.totalSaldo = 0;
    this.semuaTransaksi = [];
    this.transaksiPerTanggal = [];

    try {
      const resRekening: any = await this.postPvd.postData({ aksi: 'get_rekening' }, 'action.php').toPromise();
      if (resRekening.success && resRekening.rekening) {
        this.totalSaldo = resRekening.rekening.reduce((sum: number, rek: any) => sum + Number(rek.saldo), 0);
      } else {
        console.warn('Gagal mengambil data rekening atau tidak ada rekening.');
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }

    const bulan = this.bulanIni.getMonth() + 1;
    const tahun = this.bulanIni.getFullYear();

    try {
      const resTransaksi: any = await this.postPvd.postData({ aksi: 'get_transaksi_bulan', bulan, tahun }, 'action.php').toPromise();
      
      if (resTransaksi.success && resTransaksi.transaksi) {
        this.semuaTransaksi = resTransaksi.transaksi;

        const groupByTanggal: Record<string, { transaksi: any[], totalPendapatan: number, totalPengeluaran: number }> = {};

        this.semuaTransaksi.forEach(trx => {
          const tanggal = trx.tanggal;

          if (!groupByTanggal[tanggal]) {
            groupByTanggal[tanggal] = { transaksi: [], totalPendapatan: 0, totalPengeluaran: 0 };
          }

          groupByTanggal[tanggal].transaksi.push(trx);

          const nominal = Number(trx.nominal);
          const jenis = trx.jenis.toLowerCase();

          if (jenis === 'pendapatan') {
            this.totalPendapatan += nominal;
            groupByTanggal[tanggal].totalPendapatan += nominal;
          } else if (jenis === 'pengeluaran') {
            this.totalPengeluaran += nominal;
            groupByTanggal[tanggal].totalPengeluaran += nominal;
          }
        });

        this.transaksiPerTanggal = Object.entries(groupByTanggal).map(([tanggal, data]) => ({
          tanggal,
          transaksi: data.transaksi,
          totalPendapatan: data.totalPendapatan,
          totalPengeluaran: data.totalPengeluaran
        })).sort((a: any, b: any) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
      } else {
        this.semuaTransaksi = [];
        this.totalPendapatan = 0;
        this.totalPengeluaran = 0;
        this.transaksiPerTanggal = [];
        console.warn('Gagal mengambil data transaksi atau tidak ada transaksi untuk bulan ini.');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }
 
  geserBulan(offset: number) {
    const newDate = new Date(this.bulanIni);
    newDate.setMonth(newDate.getMonth() + offset);
    this.bulanIni = newDate;
    this.ambilData();
  }

  getIcon(kategori: string): string {
    switch (kategori.toLowerCase()) {
      case 'gaji': return 'wallet-outline';
      case 'makanan': return 'restaurant-outline';
      case 'transportasi': return 'car-outline';
      case 'belanja': return 'cart-outline';
      case 'pendidikan': return 'school-outline';
      case 'hiburan': return 'game-controller-outline';
      case 'tagihan': return 'receipt-outline';
      case 'kesehatan': return 'medkit-outline';
      default: return 'cash-outline';
    }
  }
}
