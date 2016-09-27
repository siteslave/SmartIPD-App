import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { Configure } from '../../configure'
import { Api } from '../../providers/api/api'

import { DrugPage } from '../drug/drug'

interface RowData {
  an: string,
  hn: string,
  regdate: string,
  regtime: string,
  pname?: string,
  fname: string,
  lname: string,
  ward_name?: string,
  prediag?: string
}
interface HttpResult {
  ok: boolean,
  rows?: Array<RowData>
}

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [Api, Configure]
})
export class HomePage implements OnInit {
  url: string
  patient: Array<RowData>

  constructor(public navCtrl: NavController,
    private configure: Configure,
    private api: Api,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.url = this.configure.getUrl()   
  }

  ngOnInit() {
    this.api.getList(this.url)
      .then(data => {
        let result = <HttpResult>data
        this.patient = result.rows
      }, err => {
        console.log(err)
      });
  }

  showMenu(person: RowData) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      buttons: [
        {
          text: 'ข้อมูลลงทะเบียน',
          // role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          text: 'การให้ยา',
          handler: () => {
            this.navCtrl.push(DrugPage, { an: person.an })
          }
        }, {
          text: 'ผลตรวจ LAB',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
}
