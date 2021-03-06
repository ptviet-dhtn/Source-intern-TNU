import {
  Nav,
  Table,
  Card,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiEye } from "react-icons/hi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { ImUndo2 } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [item, setItem] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [checkouts, setCheckouts] = useState([]);
  const [products, setProducts] = useState([]);
  const [deliveredList, setDeliveredList] = useState([]);
  useEffect(() => {
    if (location.search === "?delivered") {
      setActiveTab("2");
    }
    const getProductByCheckoutId = async () => {
      if (item) {
        const { data } = await axios.get("/api/checkout/detail/" + item.id);
        setProducts(data);
      }
    };
    getProductByCheckoutId();
  }, [item, openDetail]);

  useEffect(() => {
    if (activeTab === "1") {
      navigate("/admin/checkout-list");
    }
    if (activeTab === "2") {
      navigate("/admin/checkout-list?delivered");
    }
  }, [activeTab, navigate]);

  useEffect(() => {
    const fetchCheckouts = async () => {
      const { data } = await axios.get("/api/checkout");
      setCheckouts(data);
    };
    const fetchDelivereds = async () => {
      const { data } = await axios.get("/api/checkout/delivered");
      setDeliveredList(data);
    };
    fetchCheckouts();
    fetchDelivereds();
  }, []);
  const handleOpenDetail = (item) => {
    setOpenDetail(true);
    setItem(item);
  };
  const handleAddToDelivered = async (item) => {
    const res = await axios.put(`/api/checkout/status/${item.id}?status=1`);
    if (res.status === 200) {
      let index = checkouts.findIndex((object) => {
        return object.id === item.id;
      });
      checkouts.splice(index, 1);
      setCheckouts(checkouts);
      setDeliveredList((prevState) => [...prevState, item]);
    }
  };

  const handleRevertToCheckout = async (item) => {
    const res = await axios.put(`/api/checkout/status/${item.id}?status=0`);
    if (res.status === 200) {
      let index = deliveredList.findIndex((object) => {
        return object.id === item.id;
      });
      deliveredList.splice(index, 1);
      setDeliveredList(deliveredList);
      setCheckouts((prevState) => [...prevState, item]);
    }
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === "1" && "active"}
            onClick={() => setActiveTab("1")}
          >
            ????n h??ng
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" && "active"}
            onClick={() => setActiveTab("2")}
          >
            ???? giao
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Card>
            <CardBody>
              <Table
                className="no-wrap mt-3 align-middle"
                responsive
                borderless
              >
                <thead>
                  <tr>
                    <th>ID ????n h??ng</th>
                    <th>Kh??ch h??ng</th>
                    <th>?????a ch???</th>
                    <th>??i???n tho???i</th>
                    <th>T???ng gi?? ti???n</th>
                    <th>Ng??y t???o</th>
                    <th>Chi ti???t</th>
                  </tr>
                </thead>
                <tbody>
                  {checkouts.map((c, i) => (
                    <tr key={i} className="border-top">
                      <td>
                        {c.id}-{c.checkoutId}
                      </td>
                      <td>{c.user.email}</td>
                      <td>{`${c.address}, ${c.commune}, ${c.district}, ${c.province}`}</td>
                      <td>{c.phone}</td>
                      <td>{c.totalPrice}.000???</td>
                      <td>{c.createdAt}</td>
                      <td>
                        <Button
                          onClick={() => handleOpenDetail(c)}
                          color="primary"
                        >
                          <HiEye />
                        </Button>

                        <Button
                          color="success"
                          onClick={() => handleAddToDelivered(c)}
                        >
                          <MdOutlineLocalShipping />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="2">
          <Card>
            <CardBody>
              <Table
                className="no-wrap mt-3 align-middle"
                responsive
                borderless
              >
                <thead>
                  <tr>
                    <th>ID ????n h??ng</th>
                    <th>Kh??ch h??ng</th>
                    <th>?????a ch???</th>
                    <th>??i???n tho???i</th>
                    <th>T???ng gi?? ti???n</th>
                    <th>Ng??y t???o</th>
                    <th>Chi ti???t</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveredList.map((c, i) => (
                    <tr key={i} className="border-top">
                      <td>
                        {c.id}-{c.checkoutId}
                      </td>
                      <td>{c.user.email}</td>
                      <td>{`${c.address}, ${c.commune}, ${c.district}, ${c.province}`}</td>
                      <td>{c.phone}</td>
                      <td>{c.totalPrice}.000???</td>
                      <td>{c.createdAt}</td>
                      <td>
                        <Button
                          onClick={() => handleOpenDetail(c)}
                          color="primary"
                        >
                          <HiEye />
                        </Button>
                        <Button
                          onClick={() => handleRevertToCheckout(c)}
                          color="primary"
                        >
                          <ImUndo2 />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>
      </TabContent>

      <Modal
        toggle={() => {
          setOpenDetail(!openDetail);
        }}
        isOpen={openDetail}
      >
        <ModalHeader
          toggle={() => {
            setOpenDetail(!openDetail);
          }}
        >
          Chi ti???t ????n h??ng
        </ModalHeader>
        <ModalBody>
          <Table borderless>
            <thead>
              <tr>
                <th>T??n S???n Ph???m</th>
                <th>S??? L?????ng</th>
                <th>Gi?? Ti???n</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                  <td>{item.product.title}</td>
                  <td>{item.quantity}</td>
                  <td>{item.product.price * item.quantity}.000???</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {item && (
            <div>
              {products.length > 0 && (
                <p>
                  <strong>Th??nh Ti???n: </strong>
                  {products.reduce((p, c) => {
                    return p + c.product.price * c.quantity;
                  }, 0)}
                  .000???
                </p>
              )}

              <p>
                <strong>?????a Ch???: </strong>
                {`${item.address}, ${item.commune}, ${item.district}, ${item.province}`}
              </p>
              <p>
                <strong>S??T:</strong>
                {item.phone}
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={function noRefCheck() {}}>
            In ????n H??ng
          </Button>{" "}
          <Button
            onClick={() => {
              setOpenDetail(!openDetail);
            }}
          >
            ????ng
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
