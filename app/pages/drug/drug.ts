import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Configure } from '../../configure'
import { Api } from '../../providers/api/api'

interface RowData {
  drug_name: string,
  name1?: string,
  name2?: string,
  name3?: string,
  qty?: number
}
interface HttpResult {
  ok: boolean,
  rows?: Array<RowData>
}
@Component({
  templateUrl: 'build/pages/drug/drug.html',
  providers: [Api, Configure]
})
export class DrugPage implements OnInit {
  url: string
  an: string
  drugs: Array<RowData>
  constructor(private navCtrl: NavController,
    private configure: Configure,
    private api: Api,
    private navParams: NavParams
  ) {
    this.an = this.navParams.get('an')
    this.url = this.configure.getUrl()
  }

  ngOnInit() {
    this.api.getDrug(this.url, this.an)
      .then(data => {
        let result = <HttpResult>data
        this.drugs = result.rows
      }, err => {
        console.log(err)
      });
  }

}
