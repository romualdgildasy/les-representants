import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  protected readonly recentSales = signal([
    { email: 'fan.numero1@gmail.com', album: 'Âmes Libres', amount: '6 500', method: 'Orange Money' },
    { email: 'styfler.fan@yahoo.fr', album: 'Âmes Libres', amount: '6 500', method: 'MTN MoMo' },
    { email: 'diaspora.paris@gmail.com', album: 'Âmes Libres', amount: '6 500', method: 'PayPal' },
  ]);
}