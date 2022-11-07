import { React, useContext, useState } from "react";
import { Context } from "..";
import ProductItemBasket from "../components/ProductItemBasket";
import { observer } from "mobx-react-lite";


const Basket = observer(() => {
  const { user } = useContext(Context);
  // let basketProd = user.basketProd
  const [summ, setSumm] = useState(0)


  // setSummArr([...summArr, [1 ,2]])
  // useEffect(()=>{
  //   basketProd.map((item) => {
  //     setSumm((summ)=>summ = summ + item.price)
  //   })
  // }, [])

  const pushSumm = (newCount, oldCount, price)=>{
   
  setSumm((summ) => summ = summ - oldCount * price + newCount * price) 
  }


  return (
    <div className="container">
      <div className="basket-title mt-5 mb-4">
        <h4>Söwda sebediňiz</h4>
      </div>
      <div className="row basket">
        <div className="col-9 bg-white basket-wrapper pt-3">
          <div className="basket-product-content p-2">
            {user.basketProd.length !== 0 ? (
              // <ProductItemBasket/>

              user?.basketProd?.map((item) => <ProductItemBasket product={item} key={item.id} pushSumm = {pushSumm}/>)
            ) : (
              <div className="d-block" style={{ textAlign: "center" }}>
                <h3 className="c-bold"> Sebet boş </h3>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white basket-info-content p-2">
          <div style={{ textAlign: 'center' }} className="d-block"><h4 className="c-bold" style={{ fontSize: '1.5rem' }}>Sebediň mazmuny</h4></div>
          <div className="d-flex justify-content-between align-items-center p-3 basket-summ">
            <span>Summa</span>
            <span className='c-bold'>{summ} TMT</span>
          </div>
          <hr/>
          <div className="d-flex justify-content-between align-items-center p-3 basket-summ">
            <span>Jemi toleg</span>
            <span className='c-bold'>{summ} TMT</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Basket;
