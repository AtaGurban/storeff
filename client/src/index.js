import React, { createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom';
// import { DatePicker } from 'antd';
import App from './App';
import {UserStore} from './store/UserStore';
import { TypeStore } from './store/TypeStore';
import { BrandStore } from './store/BrandStore';
import { BannerStore } from './store/BannerStore';
import { DeviceStore } from './store/DeviceStore';



export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    type: new TypeStore(),
    brand: new BrandStore(),
    banner: new BannerStore(),
    device: new DeviceStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

