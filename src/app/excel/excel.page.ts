import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.page.html',
  styleUrls: ['./excel.page.scss'],
  standalone: false,
})
export class ExcelPage {
  startDate: string;
  endDate: string;

  constructor() {
    this.startDate = '';
    this.endDate = '';
  }

  exportToExcel(): void {
    const data = [
      { TanggalMulai: this.startDate, TanggalAkhir: this.endDate }
    ];
    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(wb, ws, 'Data Export');

    // Generate buffer
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Create a blob from the buffer
    const blob = new Blob([buf], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'export.xlsx';
    link.click();
  }
}
