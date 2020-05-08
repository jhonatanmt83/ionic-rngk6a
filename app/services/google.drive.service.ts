import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable}  from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()

export class GoogleDriveService {
   data: any = null;

  SHEET_ID = '12JHei2yl4PKRLogIgi5crxKRdroXMh3vN4Ei5CoZ9wY';
  ACCESS_TOKEN = 'ya29.a0Ae4lvC2Nr9l6clZ89WVL-xmLYyOsCf2eNcGXzxT8A8Kbn3i6rwIGmMzwDWGOuv9VVmhNukriAPKiFoZr0Li6OatKRpCIiy4SqQoESHnEAo-fAN9uu7C7mkl7rfEINI25r9iTU5RE6j1FEr3Dh-E4NIPbPvBhTNvb5sY';
  private headers;
  
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.ACCESS_TOKEN}`
    });
  }

  public getAuthSheet(offset:number, limit:number): Observable<any> {
    var n = 4;
    return this.http.get(`https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/A${n + offset}:F${n + offset + limit}`, {
      headers: this.headers
    })
      .pipe(
        map((res, any) => {
          if ( res['values'] ) {
            return res['values'];
          }
          return [];
        })
      )
  }

  public getAuthTitle(): Observable<any> {
    var n = 4;
    return this.http.get(`https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/A1`, {
      headers: this.headers
    })
      .pipe(
        map((res, any) => {
          if ( res['values'] ) {
            return res['values'];
          }
          return [];
        })
      )
  }

}