import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable, pipe } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PostProvider{
    //server:string ='https://tis1.itbi.ac.id/api/';
    server: string = 'http://localhost/api/';

    constructor(public http:HttpClient){}
    postData(body:any, file:string): Observable<any> {
    let type = 'application/json; charset=utf-8';
    let headers = new HttpHeaders({'content-Type':type});

    return this.http.post(this.server+file,JSON.stringify(body),{
        headers: headers,
    }).pipe(
        map((res:any)=>{
            return res;
        })
    )
    }
}

