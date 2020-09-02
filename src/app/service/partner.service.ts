import { Partner } from './../model/partner';
import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';
//import '@angular/common/locales/global/es';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators'
import { Router} from '@angular/router';
import swal from 'sweetalert2';
import { Region } from '../model/region';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private urlPartners = "https://cors-anywhere.herokuapp.com/https://spring-framework-5-app.herokuapp.com/api/partner/list-partner";
  private editPartners = "https://cors-anywhere.herokuapp.com/https://spring-framework-5-app.herokuapp.com/api/partner";
  private partnerPhoto = "https://cors-anywhere.herokuapp.com/https://spring-framework-5-app.herokuapp.com/api/partner-full-detail/";
  private partnerLocalPhoto = "http://localhost:8080/api/partner-full-detail/";
  private urlLocalPartners = "http://localhost:8080/api/partner/list-partner";
  private urlLocalRegions = "http://localhost:8080/api/partner";
  private urlRegions = "https://cors-anywhere.herokuapp.com/https://spring-framework-5-app.herokuapp.com/api/partner";
  private editLocalPartners = "http://localhost:8080/api/partner";
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-type':'application/json'});
  private numberPages: number;
  private currentPage: number;

  constructor(private http: HttpClient, public router: Router) { }

  getPartnersTotal() : number {
    //return this.http.get<any[]>(this.urlLocalPartners);
    return this.numberPages;
    
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getPartners(page:number) : Observable<any[]> {
    if(!page){
      page = 0;
    }
    return this.http.get<any[]>(this.urlPartners + '/page/'+page)
    .pipe(
      map(response => {
        this.numberPages = response['totalPages'];
        this.currentPage = response['number'];
        let partners = response['content'] as Partner[];
        return partners.map(partner => {
          partner.createAt = formatDate(partner.createAt,'dd-MM-yyyy', 'en-US');
          return partner;
        })
      })
    );

    // return this.http.get<Partner[]>(this.listAllPartners).pipe(
    //   map(response => response as Partner[] )
    // );

  }

  createPartner(partner: Partner) : Observable<Partner> {
    return this.http.post<Partner>(this.editPartners, partner, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        //this.router.navigate(['/partners']);
        if(e.status==409){      
          return throwError(e);
        }
        swal.fire("Error creating partner", e.errors, 'error');
        return throwError(e);
      })
    );
  }

  getPartner(id) : Observable<Partner> {
    return this.http.get<Partner>(`${this.editPartners}/${id}`).pipe(
      catchError(e => {
        //this.router.navigate(['/partners']);
        if(e.status==409){
          return throwError(e);
        }
        swal.fire('Error tring to edit', e.error.msg, 'error');
        return throwError(e);
      })
    );
  }

  updatePartner(partner: Partner, id:number) : Observable<Partner> {
    return this.http.put<Partner>(`${this.editPartners}/${id}`, partner,  {headers: this.httpHeaders})
    .pipe(
      catchError(e => {
        //this.router.navigate(['/partners']);
        swal.fire('Error in update partner edition', e.error.msg, 'error');
        return throwError(e);
      })
    )
    ;
  }

  updateFullPartner(formdata: FormData, id: number) : Observable<HttpEvent<{}>> {
    const req = new HttpRequest('PUT', this.partnerPhoto+id, formdata, {
      reportProgress: true
    });
    return this.http.request(req);
    
    // return this.http.put<Partner>('http://localhost:8080/api/partner-full-detail/'+id, formdata).pipe(
    //   map( (response:any) => response.partner as Partner),
    //   catchError(e => {
    //     this.router.navigate(['/partners']);
    //     swal.fire('Error in update partner edition', e.error.msg, 'error');
    //     return throwError(e);
    //   })
    // );
  }

  deletePartner(id : number) : Observable<Partner> {
    console.log("DELETING PARTNER , SERVICE STEP");
    return this.http.delete<Partner>(`${this.editPartners}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/partners']);
        swal.fire('Error deleting partner', e.error.msg, 'error');
        return throwError(e);
      })
    );
  }

  getRegions() :  Observable<Region[]>  {   
    return this.http.get<Region[]>(this.urlRegions + '/region');
  }
}
