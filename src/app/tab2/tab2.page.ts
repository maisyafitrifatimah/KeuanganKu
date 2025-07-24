// FileName: /tab2/tab2.page.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { PostProvider } from '../../provider/post-provider';
import { ChartConfiguration } from 'chart.js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit, OnDestroy {
  bulanIni: Date = new Date();
  totalPendapatan: number = 0;
  totalPengeluaran: number = 0;
  totalSaldo: number = 0;

  private destroy$ = new Subject<void>();

  // ✅ Konfigurasi Chart.js
  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false, // <-- TAMBAHKAN INI
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.label || '';
            if (label) label += ': ';
            // Pastikan totalPendapatan tidak nol untuk menghindari pembagian dengan nol
            const percentage = this.totalPendapatan !== 0 ? ((context.parsed / this.totalPendapatan) * 100).toFixed(2) : '0.00';
            if (context.parsed !== null) {
              label += ` (${percentage}%)`;
            }
            return label;
          }
        }
      }
    }
  };

  chartPendapatan: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  };

  chartPengeluaran: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  };

  constructor(
    private dbService: DatabaseService,
    private postPvd: PostProvider,
    private router: Router
  ) {
    this.dbService.dataChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('Perubahan data terdeteksi di Tab2, menyegarkan laporan...');
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

    this.chartPendapatan = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    this.chartPengeluaran = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };

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
        const transaksiBulanIni = resTransaksi.transaksi;

        const dataPendapatan: Record<string, number> = {};
        const dataPengeluaran: Record<string, number> = {};

        transaksiBulanIni.forEach((trx: any) => {
          const nominal = Number(trx.nominal);
          const jenis = trx.jenis.toLowerCase();

          if (jenis === 'pendapatan') {
            this.totalPendapatan += nominal;
            dataPendapatan[trx.kategori] = (dataPendapatan[trx.kategori] || 0) + nominal;
          } else if (jenis === 'pengeluaran') {
            this.totalPengeluaran += nominal;
            dataPengeluaran[trx.kategori] = (dataPengeluaran[trx.kategori] || 0) + nominal;
          }
        });

        this.chartPendapatan = this.toChartData(dataPendapatan);
        this.chartPengeluaran = this.toChartData(dataPengeluaran);

      } else {
        console.warn('Gagal mengambil data transaksi atau tidak ada transaksi untuk bulan ini.');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }

  toChartData(data: Record<string, number>): ChartConfiguration<'doughnut'>['data'] {
    const labels = Object.keys(data);
    const values = Object.values(data).map(v => Number(v));
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
      '#E7E9ED', '#8A2BE2', '#A52A2A', '#5F9EA0', '#20B2AA', '#DAA520',
      '#ADFF2F', '#FF4500', '#BA55D3', '#7B68EE', '#EE82EE', '#9ACD32'
    ];

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors.slice(0, labels.length)
        }
      ]
    };
  }

  geserBulan(offset: number) {
    const newDate = new Date(this.bulanIni);
    newDate.setMonth(newDate.getMonth() + offset);
    this.bulanIni = newDate;
    this.ambilData();
  }

  navigateToDetail(tipe: string) {
    if (tipe === 'pendapatan') {
      this.router.navigate(['/laporan-pendapatan'], {
        queryParams: { bulan: this.bulanIni.toISOString() }
      });
    } else if (tipe === 'pengeluaran') {
      this.router.navigate(['/laporan-pengeluaran'], {
        queryParams: { bulan: this.bulanIni.toISOString() }
      });
    }
  }
  
}
