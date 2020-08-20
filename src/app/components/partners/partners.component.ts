import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/model/partner';
import { PartnerService } from 'src/app/service/partner.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  partners: Partner[];
  constructor(private partnerService : PartnerService) { }

  ngOnInit() {
    this.partnerService.getPartners().subscribe(res => {
      this.partners = res['partnerList'];
    });
  }

}

