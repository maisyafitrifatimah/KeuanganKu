import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostProvider } from '../../provider/post-provider';
import { ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-laporan-pendapatan',
  templateUrl: './laporan-pendapatan.page.html',
  styleUrls: ['./laporan-pendapatan.page.scss'],
  standalone: false,
})
export class LaporanPendapatanPage implements OnInit {
  bulanIni: Date = new Date();
  totalPendapatan: number = 0;
  dataPendapatan: any[] = [];

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

  chartPendapatan: ChartConfiguration<'doughnut'>['data'] = {
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
    this.totalPendapatan = 0;
    this.dataPendapatan = [];

    const bulan = this.bulanIni.getMonth() + 1;
    const tahun = this.bulanIni.getFullYear();

    try {
      const res: any = await this.postPvd
        .postData({ aksi: 'get_transaksi_bulan', bulan, tahun }, 'action.php')
        .toPromise();

      if (res.success) {
        const data: any = {};
        res.transaksi.forEach((trx: any) => {
          if (trx.jenis === 'pendapatan') {
            this.totalPendapatan += Number(trx.nominal);
            if (!data[trx.kategori]) data[trx.kategori] = { nominal: 0, transaksi: 0 };
            data[trx.kategori].nominal += Number(trx.nominal);
            data[trx.kategori].transaksi += 1;
          }
        });

        const labels = Object.keys(data);
        const values = Object.values(data).map((v: any) => v.nominal);
        const colors = ['#36A2EB', '#4BC0C0', '#FFCE56', '#FF6384', '#9966FF'];

        this.chartPendapatan = {
          labels,
          datasets: [{ data: values, backgroundColor: colors.slice(0, labels.length) }]
        };

        this.dataPendapatan = labels.map((label, i) => ({
          kategori: label,
          nominal: values[i],
          transaksi: data[label].transaksi,
          persen: (values[i] / this.totalPendapatan) * 100
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }
}
