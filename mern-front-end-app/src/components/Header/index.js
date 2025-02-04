import React, { useEffect, useState } from "react";
import "./style.css";
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import authAction, { signupAction } from "../../actions/auth.action";
import { signout } from "../../actions/auth.action";
import { useHistory } from "react-router-dom";
import Cart from '../../components/UI/Cart'

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const history = useHistory();

  const userSignUp = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }
    dispatch(signupAction(user));
  };

  const userLogin = () => {
    if (signup) {
      userSignUp();
    } else {
      dispatch(authAction({ email, password }));
    }
  };
  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<span className="fullName">{auth.user.fullName}</span>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "SuperCoin Zone", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          { label: "Orders", href: `/account/orders`, icon: null },
          { label: "Wishlist", href: "", icon: null },
          { label: "My Chats", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <span
            className="loginButton"
            onClick={() => {
              setLoginModal(true);
              setSignup(false);
            }}
          >
            Login
          </span>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              if (!auth.authenticate) {
                setLoginModal(true);
                history.push("/account/orders");
              }
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ cursor: "pointer" }}
            >
              New Customer?
            </span>
            <span
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#2874f0", cursor: "pointer" }}
            >
              Sign Up
            </span>
          </div>
        }
      />
    );
  };

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2 style={{ cursor: "default" }}>
                {signup ? "Sign up" : "Login"}
              </h2>
              <p style={{ cursor: "default" }}>
                Get access to your Orders, Wishlist and Recommendations
              </p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={<a href="/">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? "Sign up" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{ margin: "40px 0px 20px 0px" }}
                  onClick={userLogin}
                />

                {!signup && (
                  <p style={{ textAlign: "center", cursor: "default" }}>OR</p>
                )}

                {!signup && (
                  <MaterialButton
                    title="Request OTP"
                    bgColor="#ffffff"
                    textColor="#2874f0"
                    style={{ margin: "20px 0px" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="subHeader">
        <div className="logo">
          <a href="/">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a href="/" style={{ marginTop: "-10px" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}

          <DropdownMenu
            menu={
              <a href="/" className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              { label: "Sell on flipkart", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <a href="/cart" className="cart">
             <Cart count={Object.keys(cart.cartItems).length}/>
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
