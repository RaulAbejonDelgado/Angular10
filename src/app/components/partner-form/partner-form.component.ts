import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partner } from 'src/app/model/partner';
import { PartnerService } from "../../service/partner.service";
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.css']
})
export class PartnerFormComponent implements OnInit {
  public partner:Partner = new Partner();
  constructor(private  partnerService : PartnerService,
     private router: Router,private  activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getPartner();
  }

  public create(): void {
    console.log("********---- CLICKED -----********");
    console.log(this.partner);
    this.partnerService.createPartner(this.partner).subscribe(res => {
      console.log(res);
      this.router.navigate(['/partners'])
      swal.fire('New partner', `Partner ${this.partner.name} created succesfull`,'success')
    })

  }

  public getPartner():void {
    this.activateRoute.params.subscribe(params => {
      console.log(params);
      let id= params['id'];
      if(id){
        this.partnerService.getPartner(id).subscribe(res => this.partner = res)
      }
    })
    

  }

}
