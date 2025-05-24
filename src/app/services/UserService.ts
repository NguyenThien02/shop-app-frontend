import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RegisterDTO } from "../dtos/RegisterDTO";
import { Observable } from "rxjs";
import { LoginDTO } from "../dtos/LoginDTO";
import { UserResponse } from "../responses/UserResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiGetUserDetail = `${environment.apiBaseUrl}/users/detail`;

  constructor(private http: HttpClient) { }

  register(registerDTO: RegisterDTO): Observable<any> {
    debugger
    return this.http.post(this.apiRegister, registerDTO);
  }

  login(loginDTO : LoginDTO): Observable<any> {
    debugger
    return this.http.post(this.apiLogin, loginDTO);
  }

  getUserByToken(token: string) {
    return this.http.get(this.apiGetUserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  getUserById(userId : number){
    return this.http.get(`${this.apiGetUserDetail}/${userId}`)
  }
}