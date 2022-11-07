import { React, useState, useContext } from "react";
import { Container, Form, Button, Tabs, Tab } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { login, registration } from "../http/userAPI";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/pathConsts";

const Auth = observer(() => {
  const [emailAndNumber, setEmailAndNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const location = useLocation();
  let navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
 
  


  // const emailAndPhoneHandler = (e) =>{

  //   const phoneRe = (/\+993\(\d{2}\)\d{2}-\d{2}-\d{2}/);
  //   const re = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  //   if((!re.test(String(e.target.value).toLowerCase()))){
  //     setEmailError('Email yalnys')
  //    }else{
  //     setEmailError('');
  //     setNumberError('');
  //   }

  // }
  const { user } = useContext(Context);
  // const authSubmit = (e) => {
  //   let userItem = {
  //     name: { name },
  //     emailOrNumber: { emailAndNumber },
  //     password: { password },
  //   };
  //   // user.setUser(user);
  //   user.setIsAuth(true);
  //   user.setUser(userItem);
  // };

  const authSubmit = async () => {
    // if (emailAndNumber === user.user.email && password === user.user.password) {
    //   user.setIsAuth(true);
    // }
   
    let data;
    try {
      if (emailAndNumber || password){
        data = await login(emailAndNumber, password)
        user.setUser(data)
        user.setIsAuth(true)
        navigate(SHOP_ROUTE)
      }
    } catch (error) {
      alert(error.response.data.message)
    }


  };

  const signIn = async () => {
    try {
      const email = emailAndNumber;
      let data;
    
      if ((password === passwordTwo)) {
       data = await registration(email, name, password);
       
        user.setUser(data)
        user.setIsAuth(true)
        navigate(SHOP_ROUTE)
      }

      
    } catch (error) {
      alert(error.response.data.message)
    }

  };

  return (
    <div>
      {!isLogin ? (
        <Container className="auth-page align-items-center justify-content-center">
          <Tabs id="uncontrolled-tab-example" className="auth-tab mx-auto justify-content-center">
            <Tab eventKey="e-mail" title="E-mail" className="auth-tab mx-auto">
              <div className="auth-page-card p-5 ">
                <Form className="d-flex flex-column">
                  <Form.Control
                    className="mt-3"
                    placeholder={"Siziň adyňyz"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Control
                    className="mt-3"
                    placeholder={"Öz elektron poçtaňyzy ýazyň"}
                    value={emailAndNumber}
                    onChange={(e) => setEmailAndNumber(e.target.value)}
                  />
                  <Form.Control
                    className="mt-3"
                    placeholder="Öz açarsözüňizi giriziň"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control
                    className="mt-3"
                    placeholder="Öz açarsözüňizi tassyklaň"
                    type="password"
                    value={passwordTwo}
                    onChange={(e) => setPasswordTwo(e.target.value)}
                  />
                  <Link className="mt-2 ms-auto" to={LOGIN_ROUTE}>
                    Giris etmek isleyarin
                  </Link>
                  <Button onClick={signIn} className="mt-3 align-self-end">
                    Agza bolmak
                  </Button>
                </Form>
              </div>
            </Tab>
            <Tab
              eventKey="Telefon"
              title="Telefon"
              className="auth-tab mx-auto"
            >
              <div className="auth-page-card p-5 ">
                <Form className="d-flex flex-column">
                  <Form.Control
                    className="mt-3"
                    placeholder={"Öz telefon belginizi ýazyň"}
                    value={emailAndNumber}
                    onChange={(e) => setEmailAndNumber(e.target.value)}
                  />
                  <Form.Control
                    className="mt-3"
                    placeholder="Öz açarsözüňizi giriziň"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control
                    className="mt-3"
                    placeholder="Öz açarsözüňizi tassyklaň"
                    type="password"
                    value={passwordTwo}
                    onChange={(e) => setPasswordTwo(e.target.value)}
                  />
                  <Link className="mt-2 ms-auto" to={LOGIN_ROUTE}>
                    Giris etmek isleyarin
                  </Link>
                  <Button
                    onClick={signIn}
                    className="my-btn mt-3 align-self-end"
                  >
                    Agza bolmak
                  </Button>
                </Form>
              </div>
            </Tab>
          </Tabs>
        </Container>
      ) : (
        <Container className="auth-page align-items-center justify-content-center">
          <Tabs id="uncontrolled-tab-example" className="auth-tab mx-auto justify-content-center">
            <Tab eventKey="e-mail" title="E-mail" className="auth-tab mx-auto">
              <div className="auth-page-card p-5 ">
                <Form className="d-flex flex-column">
                  <Form.Control
                    className="mt-3"
                    placeholder={"Öz elektron poçtaňyzy ýazyň"}
                    value={emailAndNumber}
                    onChange={(e) => setEmailAndNumber(e.target.value)}
                  />
                  <Form.Control
                    className="mt-3"
                    placeholder="Öz açarsözüňizi giriziň"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Link className="mt-2 ms-auto" to={REGISTRATION_ROUTE}>
                    Agza bolmak isleyarin
                  </Link>
                  <Button onClick={authSubmit} className="mt-3 align-self-end">
                    Girmek
                  </Button>
                </Form>
              </div>
            </Tab>
            <Tab
              eventKey="Telefon"
              title="Telefon"
              className="auth-tab mx-auto"
            >
              <div className="auth-page-card p-5">
                <Form className="d-flex flex-column">
                  <Form.Control
                    className="mt-3"
                    placeholder="Öz telefon belgiňizi ýazyň"
                    value={emailAndNumber}
                    onChange={(e) => setEmailAndNumber(e.target.value)}
                  />
                  <Form.Control
                    className="mt-3"
                    placeholder="Öz açarsözüňizi giriziň"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Link className="mt-2 ms-auto" to={REGISTRATION_ROUTE}>
                    Agza bolmak isleyarin
                  </Link>
                  <Button
                    onClick={(e) => authSubmit(e)}
                    className="mt-3 align-self-end"
                  >
                    Girmek
                  </Button>
                </Form>
              </div>
            </Tab>
          </Tabs>
        </Container>
      )}
    </div>
  );
});

export default Auth;
