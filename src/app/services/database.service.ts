import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostProvider } from '../../provider/post-provider'; 

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  dataChanged$ = new BehaviorSubject<void>(undefined);

  constructor(private postPvd: PostProvider) {} 

  notifyDataChange() {
    this.dataChanged$.next();
  }

  async getStorageInfo(): Promise<{ used: number; total: number; message?: string }> {
    console.log('getStorageInfo dipanggil (fungsi dummy)');
    
    return {
      used: 156, 
      total: 500, 
      message: 'Fungsi Google Drive belum diimplementasikan sepenuhnya.'
    };
  }

  async backupData(): Promise<{ success: boolean; message: string }> {
    console.log('backupData dipanggil (fungsi dummy)');
    return { success: false, message: 'Fungsi backup belum diimplementasikan.' };
  }

  async restoreData(): Promise<{ success: boolean; message: string }> {
    console.log('restoreData dipanggil (fungsi dummy)');
    return { success: false, message: 'Fungsi restore belum diimplementasikan.' };
  }

  async getAllTransaksi(): Promise<any[]> {
    try {
      const res: any = await this.postPvd.postData({ aksi: 'get_all_transaksi' }, 'action.php').toPromise();
      if (res.success && res.transaksi) {
        return res.transaksi;
      } else {
        console.warn('Gagal mengambil semua transaksi atau tidak ada transaksi ditemukan:', res.msg);
        return [];
      }
    } catch (error) {
      console.error('Error saat mengambil semua transaksi:', error);
      return [];
    }
  }
}
