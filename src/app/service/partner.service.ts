
import { Injectable } from '@angular/core';
import { Partner } from '../model/partner';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private urlPartners = "https://cors-anywhere.herokuapp.com/https://spring-framework-5-app.herokuapp.com/api/partner/list-partner";
  private editPartners = "https://cors-anywhere.herokuapp.com/https://spring-framework-5-app.herokuapp.com/api/partner";
  private editLocalPartners = "http://localhost:8080/api/partner";
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-type':'application/json'})

  constructor(private http: HttpClient) { }

  getPartners() : Observable<Partner[]> {

    return this.http.get<Partner[]>(this.urlPartners);

    // return this.http.get<Partner[]>(this.listAllPartners).pipe(
    //   map(response => response as Partner[] )
    // );

  }

  createPartner(partner: Partner) : Observable<Partner> {
    return this.http.post<Partner>(this.editPartners, partner, {headers: this.httpHeaders})
  }

  getPartner(id) : Observable<Partner> {
    return this.http.get<Partner>(`${this.urlPartners}/${id}`);
  }
}
