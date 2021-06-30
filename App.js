import React, { useEffect, useState } from "react";
import { HashRouter, Redirect, Route } from "react-router-dom";
import { Profile } from "./new-src/pages/profile";
import { SignUpScreen } from "./new-src/pages/sign-up";
import { EditProfile } from "./new-src/pages/edit-profile";
import { LikesWishlistsShares } from "./new-src/pages/likes-wishlists-shares";
import { Provider, useSelector } from "react-redux";
import { store } from "./new-src/redux/store";
import { LoadingScreen } from "./components/LoadingScreen";
import { initializeApp } from "./new-src/redux/app-reducer";
import { getIsAuth } from "./new-src/redux/selectors";
import { AddToFavorite } from "./new-src/pages/add-to-favorites";
import { AddProduct } from "./new-src/pages/add-product";
import { AddProductFinal } from "./new-src/pages/add-product-final";
import { AddFavouriteContextProvider } from "./new-src/context/create-favourite-context";
import { CompleteProfile } from "./new-src/pages/complete-profile";
import "./global.scss";

const ProtectedRoute = (props: any) => {
  const isSignedIn = useSelector(getIsAuth);

  if (isSignedIn) {
    return <Route {...props}>{props.children}</Route>;
  }

  return <Redirect to={"/"} />;
};

const Container = () => {
  const [initialized, setInitialized] = useState(false);

  const onStoreUpdate = () => {
    const currentState = store.getState();
    setInitialized(currentState.app.initialized);
  };

  useEffect(() => {
    store.dispatch(initializeApp()).catch((e) => {
      alert(e);
    });
    const unsubscribe = store.subscribe(onStoreUpdate.bind(this));
    return () => unsubscribe();
  }, []);

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="app-container">
        <Provider store={store}>
          <Route exact={true} path="/" component={SignUpScreen} />
          <AddFavouriteContextProvider>
            <ProtectedRoute
              exact={true}
              path="/add-to-favorite"
              component={AddToFavorite}
            />
            <ProtectedRoute
              exact={true}
              path="/add-product"
              component={AddProduct}
            />
            <ProtectedRoute
              exact={true}
              path="/add-product-final"
              component={AddProductFinal}
            />
          </AddFavouriteContextProvider>
          <Route exact={true} path="/sign-up" component={SignUpScreen} />
          <ProtectedRoute exact={true} path="/profile" component={Profile} />
          <ProtectedRoute
            exact={true}
            path="/edit-profile"
            component={EditProfile}
          />
          <Route
            exact={true}
            path="/likes-wishlists-shares"
            component={LikesWishlistsShares}
          />
          <Route
            exact={true}
            path="/complete-profile"
            component={CompleteProfile}
          />
        </Provider>
        {/* <SwitchWithSlide
            updateStep={(...currentStep: any) => this.setState({ currentStep })}
          >
          <Route exact={true} path="/">
            <LandingPage/>
          </Route>
          <Route exact={true} path="/log-in">
            <LandingLogIn/>
          </Route>
          <Route exact={true} path="/sign-in">
            <SignIn/>
          </Route>
          <Route exact={true} path="/sign-up">
            <SignUp/>
          </Route>
          <ProtectedRoute exact={true} path="/profile-photo">
            <AddPhotoPage/>
          </ProtectedRoute>
          <ProtectedRoute exact={true} path="/profile-complete">
            <CompleteProfile/>
          </ProtectedRoute>
          <ProtectedRoute exact={true} path="/edit-profile">
            <EditProfile/>
          </ProtectedRoute>
          <ProtectedRoute exact={true} path="/profile">
            <ProfileNew/>
          </ProtectedRoute>        
          <ProtectedRoute exact={true} path="/clout">
            <Clout />
          </ProtectedRoute>
          <ProtectedRoute exact={true} path="/profile/:userId">
            <ViewPorfile />
          </ProtectedRoute>
          <ProtectedRoute exact={true} path="/feed">
            <Feed/>
          </ProtectedRoute>
          <ProtectedRoute exact={true} path="/brand">
            <BrandPage/>
          </ProtectedRoute>
          <ProtectedRoute exact={true} path="/product/:productID">
            <ProductPage/>
          </ProtectedRoute>
          <ProtectedRoute exact={true} path="/endorsement/:endorsementID">
            <EndorsedProduct/>
          </ProtectedRoute>
          <ProtectedRoute path="/create-endorsement/:productID">
            <AddEndorsement/>
          </ProtectedRoute>
          <Redirect to="/"/>
        </SwitchWithSlide> */}
      </div>
    </>
  );
};

const App = () => (
  <HashRouter>
    <Container />
  </HashRouter>
);

export default App;
