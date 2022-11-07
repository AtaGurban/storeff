import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import { fetchTypes, fetchSubTypes, fetchTitleTypes, fetchCategories } from "./http/typeAPI";
import { fetchBrands } from "./http/brandAPI";
import { fetchBanners } from "./http/bannerAPI";
import { fetchDevices } from "./http/deviceAPI";
import Footer from "./components/Footer";


const App = observer(() => {
  const { user, type, brand, banner, device } = useContext(Context)
  const [loading, setLoading] = useState(true)
  useEffect(async () => {
    await fetchTypes().then(data => type.setType(data))
    await fetchCategories().then(data => type.setCategory(data))
    await fetchTitleTypes().then(data => type.setTitleType(data))
    await fetchSubTypes().then(data => type.setSubType(data))
    await fetchBrands().then(data => brand.setBrand(data))
    await fetchBanners().then(data => banner.setBanner(data))
    // if(user.user){
    //   await fetchBasketDevices(user.user.id).then(data => user.setBasketProd(data))
    // }
    await fetchDevices('?favourite=true').then(data => device.setDevice(data))
    await fetchDevices('?newProducts=true').then(data => device.setNewProducts(data))
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))

  }, [])

  if(loading){
  return (
    <div style={{alignItems: 'center',  justifyContent: 'center', height: '100vh'}} className='d-flex'>
      <Spinner animation={'grow'}/>
    </div>)
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer/>
    </BrowserRouter>
  );
});
export default App;
