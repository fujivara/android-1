import {inject, Injectable} from '@angular/core';
import {AlertController, AlertOptions} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly alertController = inject(AlertController);

  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertController.create(opts);

    await alert.present();
  }
}
