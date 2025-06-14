import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private apiGetRole = `${environment.apiBaseUrl}/roles`;

    constructor(private http: HttpClient) { }

    getRoles():Observable<any> {
    return this.http.get<any[]>(this.apiGetRole);
  }
}