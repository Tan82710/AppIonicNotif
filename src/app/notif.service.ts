import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Message }  from './message'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  xhr = new XMLHttpRequest();
  //testUrl = "https://pokeapi.co/api/v2/ability";
  testUrl = "http://192.168.1.61:4000/messages";
  //testUrl = "http://localhost:4000/messages";

  message : string; 


  constructor(private http: HttpClient) { }
  
  //{responseType:'json'}
  getUrl() : Observable<Message>{
    return this.http.get<Message>(this.testUrl, {responseType:'json'})
  }

}