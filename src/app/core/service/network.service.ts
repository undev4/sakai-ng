import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

    constructor(private http: HttpClient) {
    
    }

    get<T>(path: string, options?: { params?: HttpParams }): Observable<T> {
        return this.http.get<T>(this.sitePath(path), options)
    }

    post<T>(path: string, body: any ,options?: { params?: HttpParams }): Observable<T> {
        return this.http.post<T>(this.sitePath(path), body, options)
    }
    signupPost<T>(email:string,captcha?:string): Observable<T>{
        return this.http.post<T>('/v1/signup', {email,captcha})
    }
    



    private sitePath(path: string): string  {
        if (path && !path.startsWith("/")) {
          path = "/" + path;
        }
        let v = "/v1" + path;
        return v;
      }
    
      isASCII(str: string): boolean {
        let ax = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
        let set = new Set(ax)
        let ch = str.split('')
        for (let index = 0; index < ch.length; index++) {
          const element = ch[index];
          if (set.has(element) == false) {
            return false
          }
          
        }
        return true
      }
}

