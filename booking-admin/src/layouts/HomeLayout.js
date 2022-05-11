import React, { useEffect, useState, useContext } from "react";
import {
  CartStateContext,
  CartDispatchContext,
  toggleCartPopup,
} from "../contexts/cart";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  // UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Badge,
} from "reactstrap";
import { Outlet } from "react-router-dom";
import LogoHome from "../assets/images/logos/logohome.jpg";
import user1 from "../assets/images/users/user4.jpg";
import axios from "axios";
import { ImCart } from "react-icons/im";
import CartPreview from "../components/CartPreview";
import {
  AuthDispatchContext,
  AuthStateContext,
  signOut,
} from "../contexts/auth";
export default function HomeLayout() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await axios.get("/api/category");
      setCategory(data);
    };
    getCategory();
  }, []);
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const { items: cartItems, isCartOpen } = useContext(CartStateContext);
  const cartDispatch = useContext(CartDispatchContext);
  const cartQuantity = cartItems.length;

  const { isLoggedIn, user, isLoggingIn } = useContext(AuthStateContext);
  console.log(isLoggedIn, user, isLoggingIn);

  const navigate = useNavigate();
  const authDispatch = useContext(AuthDispatchContext);
  const handleLogout = () => {
    signOut(authDispatch);
    navigate("/auth/login");
  };
  // const username = JSON.parse(localStorage.getItem("user")).username;
  return (
    <div>
      <Navbar
        color="white"
        light
        expand="md"
        className="fix-header"
        style={{ top: "0", zIndex: "99", width: "100%", position: "fixed" }}
      >
        <div className="d-flex align-items-center">
          <div className="d-lg-block d-none me-5 pe-3">
            <Link to={"/"}>
              <img
                style={{ width: "150px", height: "50px" }}
                src={LogoHome}
                alt="logo-w"
              ></img>
            </Link>
          </div>
          <NavbarBrand href="/">
            <img src={LogoHome} className="d-lg-none" alt="logo-w" />
          </NavbarBrand>
          <Button
            color="primary"
            className=" d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-list"></i>
          </Button>
        </div>
        <div className="hstack gap-2">
          <Button
            color="primary"
            size="sm"
            className="d-sm-block d-md-none"
            onClick={Handletoggle}
          >
            {isOpen ? (
              <i className="bi bi-x"></i>
            ) : (
              <i className="bi bi-three-dots-vertical"></i>
            )}
          </Button>
        </div>

        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            {/* <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                Danh Mục Sản Phẩm
              </DropdownToggle>
              <DropdownMenu end>
                {category.map(({ id, name }) => (
                  <DropdownItem key={id}>{name}</DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown> */}
            <NavItem>
              <Link to="/starter" className="nav-link">
                Giới Thiệu
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/about" className="nav-link">
                Liên Hệ
              </Link>
            </NavItem>
            <NavItem>
              <div className="nav-link">
                <div className="cart-icon" style={{ marginLeft: "800px" }}>
                  <Dropdown
                    tag="a"
                    inNavbar={true}
                    isOpen={isCartOpen}
                    toggle={() => toggleCartPopup(cartDispatch)}
                  >
                    <DropdownToggle tag="a" data-toggle="dropdown">
                      <div style={{ position: "relative" }}>
                        <ImCart
                          style={{
                            width: "25px",
                            height: "35px",
                          }}
                        >
                          ImCart
                        </ImCart>
                        <Badge
                          color="danger"
                          pill
                          style={{
                            position: "absolute",
                            bottom: "-5px",
                            right: "-2px",
                          }}
                        >
                          {cartQuantity}
                        </Badge>
                      </div>
                    </DropdownToggle>
                    <DropdownMenu
                      style={{ left: "-287px", width: "348px", top: "45px" }}
                    >
                      <CartPreview showCheckout />
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </NavItem>
          </Nav>
          {user ? (
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle color="transparent">
                {/* <span>{username}</span>&nbsp; */}
                <img
                  src={user1}
                  alt="profile"
                  className="rounded-circle"
                  width="30"
                ></img>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={handleLogout}>Đăng Xuất</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavItem style={{ display: "flex" }}>
              <Link to="/auth/login" className="nav-link">
                Đăng nhập
              </Link>
              <Link to="/auth/login" className="nav-link">
                Đăng ký
              </Link>
            </NavItem>
          )}
        </Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
}
