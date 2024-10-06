import { FamilyGroup } from './FamilyGroup.model';

export class Car {
  carID?: number;
  carModel: string;
  carBrand: string;
  price: number;
  familyGroup: FamilyGroup;

  constructor(
    carModel: string,
    carBrand: string,
    price: number,
    familyGroup: FamilyGroup,
    carID?: number
  ) {
    this.carModel = carModel;
    this.carBrand = carBrand;
    this.price = price;
    this.familyGroup = familyGroup;
    if(carID){
      this.carID = carID;
    }
  }

  toString(): string {
    return `Car [carID=${this.carID}, carModel=${this.carModel}, carBrand=${this.carBrand}, price=${this.price}, familyGroup=${this.familyGroup}]`;
  }
}
