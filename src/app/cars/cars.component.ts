import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Car } from '../Model/Car.model';
import { CarServiceService } from '../Services/car-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FamilyGroup } from '../Model/FamilyGroup.model';
import { response } from 'express';
import { AuthService } from '../Services/auth-service.service';


@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {

  cars: Car[] = []; 
  FGs !: FamilyGroup[];
  FG_ID !: number;

  searchBy: string = 'model';
  searchTerm: string = '';
  searchFG: number = 0;

  Admin !: Boolean;

  constructor(private carService: CarServiceService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllCars();
    this.carService.getAllFGs().subscribe(
      (response)=>{
        this.FGs = response;
      },
      (error)=>{
        confirm(error);
      }
    );
    this.Admin = this.authService.isAdmin();
    console.log(this.Admin);
  }

  getAllCars(): void {
    this.carService.getAllCars().subscribe(
      (response) => {
        this.cars = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCar(id: number | undefined) {
    if(id != undefined) {
      let rep = confirm("Are you sure you want to delete this car?");
      if (rep) {
        this.carService.deleteCar(id).subscribe(
          () => {
            this.getAllCars();
            console.log(`Car with ID ${id} deleted successfully`);
          },
          (error) => {
            console.error('Error deleting car:', error);
          }
        );
      }
    }
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.searchFG = 0;
    this.getAllCars();
  }

  search(): void {
    if (this.searchBy === 'model') {
      this.cars = this.cars.filter(car => car.carModel.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else if (this.searchBy === 'brand') {
      this.cars = this.cars.filter(car => car.carBrand.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else if (this.searchBy === 'category') {
      this.carService.getCarsByFG(this.searchFG).subscribe(
        (response)=>{
          this.cars = response;
        }
      );
    }
  }


  redirect(id : number | undefined) {
    if(id != undefined) {
      this.router.navigate(['/UpdateCar/'+id]);
    }
  }
}