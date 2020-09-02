import { Component, OnInit } from '@angular/core';
import { Partner } from 'src/app/model/partner';
import { PartnerService } from 'src/app/service/partner.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  partners: Partner[];
  partner: Partner;
  pagesNumbers: number[];
  currentPage: number;
  fromPage: number;
  toPage: number;
  public localEndpoint = "http://localhost:8080/api/uploads/";
  public herokuEndpoint = "https://spring-framework-5-app.herokuapp.com/api/uploads/" ;

  constructor(private partnerService : PartnerService,
     private router: Router, 
     private  activateRoute:ActivatedRoute) {
       this.pagesNumbers = [];
      }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      console.log(params);
      let page:number = params['page'];
      this.partnerService.getPartners(page).subscribe(res => {
        this.partners = res;
        this.currentPage = this.partnerService.getCurrentPage();
        this.fromPage = Math.min(Math.max(1, this.currentPage - 3), this.partnerService.getPartnersTotal() - 4);
        this.toPage = Math.max(Math.min(this.partnerService.getPartnersTotal(), this.currentPage + 2), 6);
        if(this.partnerService.getPartnersTotal() > this.currentPage) {
          this.pagesNumbers = new Array(this.toPage - this.fromPage + 1).fill(0).map((_valor,indice) => indice + this.fromPage);
        }else{
          this.pagesNumbers = new Array(this.partnerService.getPartnersTotal()).fill(0).map((_valor,indice) => indice +1);
        }
      });
    })
    
  }

  public deletePartner() : void {
    this.activateRoute.params.subscribe(params => {
      console.log("deletePArtner");
      console.log(params);
      let id= params['id'];
      if(id){
        this.partnerService.deletePartner(id).subscribe(res => {

          swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              this.partner = res;
              this.router.navigate(['/partners']);
              swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          });
        })
      }
    })
  }
}
