import { ActivatedRoute } from '@angular/router';
import { PartnerService } from './../../service/partner.service';
import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/model/partner';

@Component({
  selector: 'app-partner-detail',
  templateUrl: './partner-detail.component.html',
  styleUrls: ['./partner-detail.component.css']
})
export class PartnerDetailComponent implements OnInit {

  partner: Partner;
  resourcePath: string = "localhost:8080/api/uploads/";

  constructor(public partnerService: PartnerService, public activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id : number= params['id'];
      if(id) {
        this.partnerService.getPartner(id).subscribe(res => {
          this.partner = res;
          this.resourcePath = this.resourcePath+this.partner.photo;
        })
      }
    })
  }

}
