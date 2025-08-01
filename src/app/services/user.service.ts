import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private _http: HttpClient ) { }
  
  private apiUrl = `${environment.apiUrl}/users`;

  getUsers() {
    return this._http.get<User[]>(`${this.apiUrl}`);
  }

  addUser(user: User):Observable<User>{
    return this._http.post<User>(`${this.apiUrl}`, user);
  }

  updateUser(id: number, user: User): Observable<User>{
    return this._http.put<User>(`${this.apiUrl}/${id}`, user)
  }

  getUserById(id: number): Observable<User>{
    return this._http.get<User>(`${this.apiUrl}/${id}`)
  }

  deletUser(id: number){
    return this._http.delete(`${this.apiUrl}/${id}`)
  }




}
