import { makeAutoObservable } from "mobx";

export class BannerStore {
  constructor() {
    this._banners = [];
    makeAutoObservable(this);
  }

  setBanner(banner) {
    this._banners.push(banner)
  }

  get Banners() {
    return this._banners;
  }
}