import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GoogleDriveService} from '../../app/services/google.drive.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products:any=[];
  
  title="FLORIANITA";

  constructor(public navCtrl: NavController, private googleDriveProvider:GoogleDriveService ) {
    this.loadTitle();
    this.load();
  }

  loadTitle() {
    this.googleDriveProvider
      .getAuthTitle()
      .subscribe((data) => {
        // this.title = 
        if ( data && data.length == 1 ) {
          this.title = data[0];
        }
      });    
    
  }

  load() {
    this.googleDriveProvider
      .getAuthSheet(0, 10)
      .subscribe((data) => {
        this.products = [];
        data.forEach((r) => {
     
          this.products.push({
            'codigo': r[0],
            'nombre': r[1],
            'descripcion': r[2],
            'precio': r[3],
            'foto': r[5]
          });

        }, this);
      });
  }

}
