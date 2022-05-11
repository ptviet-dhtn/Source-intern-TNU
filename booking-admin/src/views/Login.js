import React, { useState, useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { AuthDispatchContext, signIn } from "../contexts/auth";

const Login = () => {
  const authDispatch = useContext(AuthDispatchContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await login(username, password);
    if (data.token) {
      signIn(authDispatch, data);
      if (data.roles[0] === "ROLE_USER") {
        navigate("/");
      }
      if (data.roles[0] === "ROLE_ADMIN") {
        navigate("/admin");
      }
    }
    console.log(data);
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={submitHandler}>
                    <h1>Đăng Nhập</h1>
                    <p className="text-medium-emphasis">
                      Nhập Tài Khoản Của Bạn
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupText>
                        <FaUser />
                      </InputGroupText>
                      <Input
                        placeholder="Tên Đăng Nhập"
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupText>
                        <FaLock />
                      </InputGroupText>
                      <Input
                        type="password"
                        placeholder="Mật Khẩu"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs={6} style={{ margin: "auto" }}>
                        <Button type="submit" color="primary" className="px-4">
                          Đăng Nhập
                        </Button>
                      </Col>
                      {/* <Col xs={6} className="text-right">
                        <Button color="link" className="px-0">
                          Quên Mật Khẩu?
                        </Button>
                      </Col> */}
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>Đăng Ký</h2>
                    <p>
                      Đăng ký một tài khoản để có thể sử dụng cho các dịch vụ
                      lâu dài của chúng tôi!
                    </p>
                    <Link to="/auth/register">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Đăng Ký Ngay!
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
