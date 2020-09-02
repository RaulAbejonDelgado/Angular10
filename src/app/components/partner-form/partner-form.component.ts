import { Partner } from 'src/app/model/partner';
import { PartnerService } from "../../service/partner.service";
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { Region } from 'src/app/model/region';


@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.css']
})
export class PartnerFormComponent implements OnInit {
  public partner:Partner = new Partner();
  public errors: string[];
  enable: boolean = true;
  private selectedImage: File;
  public regions: Region[];
  public progress: number = 0 ;
  public localEndpoint = "http://localhost:8080/api/uploads/";
  public herokuEndpoint = "https://spring-framework-5-app.herokuapp.com/api/uploads/" ;
  
  constructor(private  partnerService : PartnerService,
     private router: Router,private  activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.getPartner();
    this.getRegions();
  }

  public create(): void {
    console.log("********---- CLICKED -----********");
    console.log(this.partner);
    this.partnerService.createPartner(this.partner).subscribe(res => {
      console.log(res);
      this.router.navigate(['/partners/page/0']);
      swal.fire('New partner', `Partner ${this.partner.name} created succesfull`,'success')
    }, err => {
      this.errors = err.error.errors as string[];
      console.log(this.errors);
    });

  }

  public getPartner():void {
    this.activateRoute.params.subscribe(params => {
      console.log(params);
      let id= params['id'];
      if(id){
        this.partnerService.getPartner(id).subscribe(res => {
          console.log(res);
          this.partner = res;
        });
      }
    }, err => {
      this.errors = err.error.errors as string[]; 
      console.log(this.errors);
    });
  }

  public updatePartner() :void {
    this.activateRoute.params.subscribe(params => {
      console.log(params);
      let id= params['id'];
      if(id){
        this.partnerService.updatePartner(this.partner,id).subscribe(res =>{
          this.router.navigate(['/partners']);
          swal.fire('Partner updated', `Partner ${this.partner.name} edited succesfull`,'success')
        }, err => {
          this.errors = err.error.errors as string[]; 
          console.log(this.errors);
        });
      }
    }, err => {
      this.errors = err.error.errors as string[]; 
      console.log(this.errors);
    });
  }

  public updateFullPartner() :void {
    this.activateRoute.params.subscribe(params => {
      let id= params['id'];
      let formData = new FormData();
      formData.append("file",  this.selectedImage);
      formData.append("id",id);
      if(id && this.selectedImage){
        this.partnerService.updatePartner(this.partner,id).subscribe(res =>{
          this.partnerService.updateFullPartner(formData, id).subscribe( resp => {
            console.log(res);
            console.log(resp);
            this.partner.photo = res['partner']['photo'];
            if(resp.type === HttpEventType.UploadProgress){
              this.progress = Math.round((resp.loaded / resp.total)*100);
            } else if(resp.type === HttpEventType.Response) {
              let response : any = resp.body;
              this.partner = response.partner as Partner;
              swal.fire('Partner updated', `Partner ${this.partner.name} edited succesfull`,'success')
            }           
          }, err => {
            this.errors = err.error.errors as string[];
            console.log(this.errors);
          });        
        }, err => {
          this.errors = err.error.errors as string[];
          console.log(this.errors);
        });
      }else{
        this.partnerService.updatePartner(this.partner,id).subscribe(res =>{
            swal.fire('Partner updated', `Partner ${this.partner.name} edited succesfull`,'success')
        }, err => {
          this.errors = err.error.errors as string[];
          console.log(this.errors);
        })
      }
    }, err => {
      this.errors = err.error.errors as string[];
      console.log(this.errors);
    });
  }

  enableDiscableButton() : void {
    this.enable = this.enable == true ? this.enable = false : this.enable = true
  } 

  selectPhoto(event){
    this.selectedImage = event.target.files[0];
    this.progress = 0 ;
    if(this.selectedImage.type.indexOf('image') < 0) {
      swal.fire('Error uploading photo', 'The selected file should be a image type','error')
    }
  }

  getRegions(){
    this.partnerService.getRegions().subscribe(regions => {
      this.regions = regions;
    })
  }

  compareRegion(c1: Region, c2: Region): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
