import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
}

@Injectable({
  providedIn:'root'
})
export class AuthService{
  constructor(private http:HttpClient){}

  signup(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyAfV9t-oLYhJasno8v8XkICQRcq0M8gCjI',{
      email:email,
      password:password,
      returnSecureToken:true
      }
    );
  }
}
