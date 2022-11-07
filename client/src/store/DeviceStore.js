import { makeAutoObservable } from "mobx";

export class DeviceStore {
  constructor() {
    this._devices = [];
    this._newProducts = [];
    makeAutoObservable(this);
  }

  setNewProducts(device) {
    this._newProducts.push(device)
  }

  setDevice(device) {
    this._devices.push(device)
  }

  get Devices() {
    return this._devices;
  }
  get NewProducts() {
    return this._newProducts;
  }
}