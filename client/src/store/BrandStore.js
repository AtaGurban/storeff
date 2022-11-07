import { makeAutoObservable } from "mobx";

export class BrandStore {
  constructor() {
    this._brands = [];
    makeAutoObservable(this);
  }

  setBrand(brand) {
    this._brands.push(brand)
  }

  get Brands() {
    return this._brands;
  }
}
 