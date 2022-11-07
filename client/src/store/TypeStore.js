import { makeAutoObservable } from "mobx";

export class TypeStore {
    constructor(){
        this._types = []
        this._titleTypes = []
        this._subTypes = []
        this._categories = []
        // this._currentCategory = 0
        makeAutoObservable(this)
    }


    setCategory(category){
      this._categories.push(category)
    }

    // setCurrentCategory(currentcategory){
    //   this._currentCategory = currentcategory
    // }

    setType(type) {
        this._types.push(type)
      }

    setTitleType(titleType) {
        this._titleTypes.push(titleType)
      }

    setSubType(subType) {
        this._subTypes.push(subType)
      }
      

    get Types() {
      return this._types;
    }

    // get CurrentCategory(){
    //   return this._currentCategory
    // }

    get TitleTypes() {
      return this._titleTypes;
    }

    get SubTypes() {
      return this._subTypes;
    }

    get Category() {
      return this._categories
    }
}