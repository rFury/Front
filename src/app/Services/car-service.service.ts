import { Injectable } from '@angular/core';
import { Car } from '../Model/Car.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FamilyGroup } from '../Model/FamilyGroup.model';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  Url = 'http://127.0.0.1:8080/Cars/api';

  constructor(private http: HttpClient, private authService: AuthService) { }


  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.Url);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.Url}/${id}`);
  }

  getCarsByFG(id: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.Url}/FamilyGroup/${id}`);
  }

  getAllFGs(): Observable<FamilyGroup[]> {
    return this.http.get<FamilyGroup[]>(this.Url + "/FamilyGroups");
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.Url}/${id}`);
  }

  UpdateCar(Carx: Car): Observable<any> {
    return this.http.put(this.Url, Carx);
  }

  AddCar(Carx: Car): Observable<any> {
    return this.http.post<any>(this.Url, Carx);
  }

  AddFG(FGx: FamilyGroup): Observable<any> {
    return this.http.post<any>(this.Url + "/FamilyGroups", FGx);
  }
}
