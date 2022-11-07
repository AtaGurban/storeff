import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { React, useContext } from "react";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  BASKET_ROUTE,
  SHOP_ROUTE,
  FAVOURITE_ROUTE,
  ADMIN_ROUTE,
} from "../utils/pathConsts";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const ModalAuth = observer(({ modalAuth, setModalAuth }) => {
  let rootClasses = "modal-auth";

  if (modalAuth) {
    rootClasses = "modal-auth active-modal-nav ";
  }

  let modalAuthFlag = false;
  const { user } = useContext(Context);
  const hideModal = () => {
    setTimeout(() => {
      if (!modalAuthFlag) {
        setModalAuth(false);
      }
    }, 0);

    modalAuthFlag = false;
  };

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    user.clearBasketProd()
    localStorage.setItem("token", "");
  };

  return user.isAuth ? (
    <div onMouseOut={hideModal} onMouseOver={(e) => (modalAuthFlag = true)} className={rootClasses}>
      <div onMouseOut={(e) => e.stopPropagation()}>
        <h4
          // onMouseOut={(e) => (modalAuthFlag = true)}
          
        >
          {user.user.name}
        </h4>

        <Link onClick={(e) => setModalAuth(false)} to={BASKET_ROUTE}>
          <Button
            className="modal-auth-btn outline"
            onMouseOver={(e) => (modalAuthFlag = true)}
          >
            Sebedim
          </Button>
        </Link>

        <Link
          onMouseOut={(e) => e.stopPropagation}
          onClick={(e) => setModalAuth(false)}
          to={FAVOURITE_ROUTE}
          className='modal-auth-link'
        >
          <Button
            className="modal-auth-btn outline"
            onMouseOver={(e) => (modalAuthFlag = true)}
          >
            Saýlan harytlarym
          </Button>
        </Link>
        {user?.user?.role === "ADMIN" ? (
          <Link
            onMouseOut={(e) => e.stopPropagation}
            onClick={(e) => setModalAuth(false)}
            to={ADMIN_ROUTE}
          >
            <Button
              className="modal-auth-btn outline"
              
              onMouseOver={(e) => (modalAuthFlag = true)}
              
            >
              Admin panel
            </Button>
          </Link>
        ) : (
          console.log("fdfd")
        )}
        <Link
          onMouseOut={(e) => e.stopPropagation}
          onClick={((e) => setModalAuth(false), logOut)}
          to={SHOP_ROUTE}
        >
          <Button
            className="modal-auth-btn"
            variant="outline-danger"
            onMouseOver={(e) => (modalAuthFlag = true)}
            onClick={() => logOut()}
          >
            Çykyş!
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    <div onMouseOut={hideModal} className={rootClasses}>
      <div onMouseOut={(e) => e.stopPropagation()}>
        <Link onClick={(e) => setModalAuth(false)} to={LOGIN_ROUTE}>
          <Button
            className="modal-auth-btn btn-warning"
            onMouseOver={(e) => (modalAuthFlag = true)}
          >
            Giriş!
          </Button>
        </Link>
        <Link
          onMouseOut={(e) => e.stopPropagation}
          onClick={(e) => setModalAuth(false)}
          to={REGISTRATION_ROUTE}
        >
          <Button
            className="modal-auth-btn btn-dark"
            onMouseOver={(e) => (modalAuthFlag = true)}
          >
            Agza bol!
          </Button>
        </Link>
      </div>
    </div>
  );
});

export default ModalAuth;
