import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Context } from "..";
import { authRoutes, publicRoutes, adminRoutes } from "../routes";


const AppRouter = observer(() => {
  const { user } = useContext(Context);
  return (
    <Routes>
      {user.isAuth ? (
        (user?.user?.role === "ADMIN") ? (
          adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.Element}
              exact
            />
          ))
        ) : (
          authRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.Element}
              exact
            />
          ))
        )
      ) : (
        publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.Element}
            exact
          />
        ))
      )}
      <Route path="/*" element={<Navigate to="/shop" />} />

    </Routes>
  );
});

export default AppRouter;
