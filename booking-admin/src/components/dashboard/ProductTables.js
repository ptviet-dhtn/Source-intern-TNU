import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { GrEdit } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import ProductAdd from "../../views/ProductAdd";
import { AuthStateContext } from "../../contexts/auth";

const ProductTables = () => {
  const [open, setOpen] = useState(false);
  const [openMDelete, setOpenMDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const { user } = useContext(AuthStateContext);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [message, setMessage] = useState("");
  const fetchData = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const navigateToAdd = () => {
    // navigate("/product/add");
    setOpen(true);
    setCurrentProduct(null);
  };
  const onClose = () => {
    setOpen(false);
    fetchData();
  };
  const deleteProduct = async () => {
    try {
      const res = await axios.delete("/api/products/" + deleteId, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      if (res.status === 200) {
        fetchData();
        setOpenMDelete(false);
      }
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Please login and try again");
      }
      if (error.response.status === 500) {
        setMessage(
          "Can't delete product because product have checkout in `checkout list`"
        );
      }
    }
  };
  return (
    <>
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Danh Sách Sản Phẩm</CardTitle>
            <div className="d-flex">
              <CardSubtitle className="mb-2 text-muted me-auto" tag="h6">
                Tất cả sản phẩm có trong cửa hàng
              </CardSubtitle>

              <Button onClick={navigateToAdd} className="btn" color="primary">
                <GrAdd /> Thêm Sản Phẩm
              </Button>
            </div>
            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Tên Sản Phẩm</th>
                  <th>Loại Sản Phẩm</th>
                  <th>Mô Tả</th>
                  <th>Giá Tiền</th>
                  <th>Hình Ảnh</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={index} className="border-top">
                    <td>{item.title}</td>
                    <td>{item.category?.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>
                      <img
                        src={"/upload/" + item.image}
                        alt={item.title}
                        height={50}
                      ></img>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setOpen(true);
                          setCurrentProduct(item);
                        }}
                        type="button"
                        class="btn btn-success"
                      >
                        <GrEdit />
                      </button>
                      <button
                        onClick={() => {
                          setOpenMDelete(true);
                          setDeleteId(item.id);
                          setMessage("");
                        }}
                        type="button"
                        class="btn btn-danger"
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>

        <Modal isOpen={open} toggle={() => setOpen(false)}>
          <ModalBody>
            <ProductAdd onClose={onClose} product={currentProduct} />
          </ModalBody>
        </Modal>
      </div>
      <Modal isOpen={openMDelete} toggle={() => setOpenMDelete(false)}>
        <ModalHeader toggle={() => setOpenMDelete(false)}>Delete ?</ModalHeader>
        <ModalBody>
          Do you want delete this product?
          <p className="text-danger">{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => deleteProduct(deleteId)}>
            Delete
          </Button>{" "}
          <Button onClick={() => setOpenMDelete(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ProductTables;
