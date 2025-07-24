import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostProvider } from '../../provider/post-provider';
import { ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-laporan-pengeluaran',
  templateUrl: './laporan-pengeluaran.page.html',
  styleUrls: ['./laporan-pengeluaran.page.scss'],
  standalone: false,
})
export class LaporanPengeluaranPage implements OnInit {
  bulanIni: Date = new Date();
  totalPengeluaran: number = 0;
  dataPengeluaran: any[] = [];

  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      datalabels: {
        color: '#000',
        font: { weight: 'bold' },
        formatter: (value: number, context: any) => {
          const total = (context.chart.data.datasets[0].data as number[]).reduce((a, b) => a + b, 0);
          return ((value / total) * 100).toFixed(1) + '%';
        }
      }
    }
  };
  chartPlugins = [ChartDataLabels];

  chartPengeluaran: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  };

  constructor(private route: ActivatedRoute, private postPvd: PostProvider) {}

  ngOnInit() {
    const bulanParam = this.route.snapshot.queryParamMap.get('bulan');
    if (bulanParam) this.bulanIni = new Date(bulanParam);
    this.ambilData();
  }

  async ambilData() {
    this.totalPengeluaran = 0;
    this.dataPengeluaran = [];

    const bulan = this.bulanIni.getMonth() + 1;
    const tahun = this.bulanIni.getFullYear();

    try {
      const res: any = await this.postPvd
        .postData({ aksi: 'get_transaksi_bulan', bulan, tahun }, 'action.php')
        .toPromise();

      if (res.success) {
        const data: any = {};
        res.transaksi.forEach((trx: any) => {
          if (trx.jenis === 'pengeluaran') {
            this.totalPengeluaran += Number(trx.nominal);
            if (!data[trx.kategori]) data[trx.kategori] = { nominal: 0, transaksi: 0 };
            data[trx.kategori].nominal += Number(trx.nominal);
            data[trx.kategori].transaksi += 1;
          }
        });

        const labels = Object.keys(data);
        const values = Object.values(data).map((v: any) => v.nominal);
        const colors = ['#FF9F40', '#FF6384', '#FFCD56', '#9966FF', '#36A2EB'];

        this.chartPengeluaran = {
          labels,
          datasets: [{ data: values, backgroundColor: colors.slice(0, labels.length) }]
        };

        this.dataPengeluaran = labels.map((label, i) => ({
          kategori: label,
          nominal: values[i],
          transaksi: data[label].transaksi,
          persen: (values[i] / this.totalPengeluaran) * 100
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }
}
