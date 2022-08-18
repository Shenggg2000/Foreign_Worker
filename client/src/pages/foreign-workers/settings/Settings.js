
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Nav, Tab, Form, Button, Image } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../useToken';
import "./styles.scss";

export default (props) => {
  const { token } = useToken();
  const [settingCompanyInfo, setSettingCompanyInfo] = useState({
    address_city: "",
    address_post_code: "",
    address_state: "",
    address_street: "",
    contact: "",
    employer_email: "",
    employer_id: "",
    employer_name: "",
    epf_no: "",
    logo: "",
    reg_no: "",
    socso_no: "",
  });
  const [settingUserInfo, setSettingUserInfo] = useState({
    username: "",
    oldpassword: "",
    newpassword: "",
    confirmnewpassword: "",
  });
  const [newImage, setNewImage] = useState({
    hasNewImage: false,
    image: null,
    imagePreviewUrl: null,
  });
  const [editPassword, setEditPassword] = useState(false);
  const [incorrectOldPassword, setIncorrectOldPassword] = useState(false);
  const [incorrectNewPassword, setIncorrectNewPassword] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      // body: JSON.stringify({})
    };
    fetch('http://localhost:3001/api/auth/user', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          let info = data.data.result
          console.log(info + "123");
          setSettingCompanyInfo({
            address_city: detectIsNull(info.address_city),
            address_post_code: detectIsNull(info.address_post_code),
            address_state: detectIsNull(info.address_state),
            address_street: detectIsNull(info.address_street),
            contact: detectIsNull(info.contact),
            employer_email: detectIsNull(info.employer_email),
            employer_id: info.employer_id,
            employer_name: info.employer_name,
            epf_no: detectIsNull(info.epf_no),
            logo: detectIsNull(info.logo),
            reg_no: detectIsNull(info.reg_no),
            socso_no: detectIsNull(info.socso_no),
          });
          setSettingUserInfo(prev => {
            return ({
              ...prev,
              username: info.username,
            })
          })
        }
      });
  }

  const detectImage = () => {
    if (newImage.hasNewImage) {
      return newImage.imagePreviewUrl;
    } else if (settingCompanyInfo.logo !== "") {
      return 'http://localhost:3001/uploads/' + settingCompanyInfo.logo
    }
    return 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  }

  const detectIsNull = (str) => {
    if (!str) {
      return "";
    } else if (str === "null" || str === "NULL") {
      return "";
    }
    return str;
  }

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setSettingCompanyInfo(prev => {
        return ({
          ...prev,
          logo: reader.result,
        })
      });
      setNewImage({
        hasNewImage: true,
        image: file,
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  const updateCompany = (e) => {
    e.preventDefault();

    const body = new FormData()
    body.append('address_city', settingCompanyInfo.address_city)
    body.append('address_post_code', settingCompanyInfo.address_post_code)
    body.append('address_state', settingCompanyInfo.address_state)
    body.append('address_street', settingCompanyInfo.address_street)
    body.append('contact', settingCompanyInfo.contact)
    body.append('employer_email', settingCompanyInfo.employer_email)
    body.append('employer_name', settingCompanyInfo.employer_name)
    body.append('epf_no', settingCompanyInfo.epf_no)
    if (newImage.hasNewImage) {
      body.append('logo', newImage.image)
    }
    body.append('reg_no', settingCompanyInfo.reg_no)
    body.append('socso_no', settingCompanyInfo.socso_no)

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      body
    };
    fetch('http://localhost:3001/api/auth/update/employer', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          toast.success('Company Information Updated', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          loadData();
        }
      });
  }

  const changePasswordEditable = e => {
    if (editPassword) {
      setSettingUserInfo(prev => {
        return ({
          ...prev,
          oldpassword: "",
          newpassword: "",
          confirmnewpassword: "",
        })
      })
    }
    setEditPassword(prev => {
      return (!prev);
    })
  }

  const updatePersonal = async e => {
    e.preventDefault();
    setIncorrectOldPassword(false);
    let body = { username: settingUserInfo.username };
    if (editPassword) {
      if (settingUserInfo.newpassword !== settingUserInfo.confirmnewpassword) {
        setIncorrectNewPassword(true);
        return;
      } else {
        setIncorrectNewPassword(false);
      }
      body = { ...body, oldpassword: settingUserInfo.oldpassword, newpassword: settingUserInfo.newpassword }
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(body)
    }
    fetch('http://localhost:3001/api/auth/update/user', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          toast.success('Account Information Updated', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          loadData();
        } else {
          setIncorrectOldPassword(true);
          loadData();
        }
      });
  }

  return (
    <Row>
      <Col xs={12} className="p-3">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
        />
        <Card>
          <Card.Body>
            <div className='d-flex justify-content-between mb-3'>
              <h1 className="fs-4 fw-bold">Settings</h1>
            </div>
            <div className='w-100'>
              <Tab.Container defaultActiveKey="home">
                <Row>
                  <Col lg={12}>
                    <Nav className="nav-tabs">
                      <Nav.Item>
                        <Nav.Link eventKey="home" className="mb-sm-3 mb-md-0">
                          Company Settings
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="profile" className="mb-sm-3 mb-md-0">
                          Account Settings
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col lg={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="home" className="p-4">
                        <Form onSubmit={updateCompany}>
                          <div className="d-flex align-items-center mb-4">
                            <FontAwesomeIcon icon={faAngleRight} className="me-3" />
                            <p className="mb-0 fs-6 fw-bold">General information</p>
                          </div>
                          <Row>
                            <Col md={12}>
                              <Card border="light" className="bg-white shadow-sm mb-4">
                                <Card.Body>
                                  <p className="mb-2 fs-6 fw-bold">Company Logo</p>
                                  <div className="d-xl-flex align-items-center">
                                    <div className="user-avatar xl-avatar">
                                      <Image fluid rounded src={detectImage()} />
                                    </div>
                                    <div className="file-field">
                                      <div className="d-flex justify-content-xl-center ms-xl-3">
                                        <div className="d-flex">
                                          <span className="icon icon-md">
                                            <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                                          </span>
                                          <input type="file" onChange={(e) => handleImageChange(e)} />
                                          <div className="d-md-block text-start">
                                            <div className="fw-normal text-dark mb-1">Choose Image</div>
                                            <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12} className="mb-3">
                              <Form.Group id="companyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter your company name"
                                  value={settingCompanyInfo.employer_name}
                                  onChange={(e) => {
                                    let settingCompanyInfoTemp = JSON.parse(JSON.stringify(settingCompanyInfo));
                                    settingCompanyInfoTemp.employer_name = e.target.value;
                                    setSettingCompanyInfo(settingCompanyInfoTemp);
                                  }} />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6} className="mb-3">
                              <Form.Group id="emal">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="name@company.com"
                                  value={settingCompanyInfo.employer_email}
                                  onChange={(e) => {
                                    let settingCompanyInfoTemp = JSON.parse(JSON.stringify(settingCompanyInfo));
                                    settingCompanyInfoTemp.employer_email = e.target.value;
                                    setSettingCompanyInfo(settingCompanyInfoTemp);
                                  }} />
                              </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                              <Form.Group id="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="0123456789"
                                  value={settingCompanyInfo.contact}
                                  onChange={(e) => {
                                    let settingCompanyInfoTemp = JSON.parse(JSON.stringify(settingCompanyInfo));
                                    settingCompanyInfoTemp.contact = e.target.value;
                                    setSettingCompanyInfo(settingCompanyInfoTemp);
                                  }} />
                              </Form.Group>
                            </Col>
                          </Row>
                          <div className="d-flex align-items-center my-4">
                            <FontAwesomeIcon icon={faAngleRight} className="me-3" />
                            <p className="mb-0 fs-6 fw-bold">Address</p>
                          </div>
                          <Row>
                            <Col sm={12} className="mb-3">
                              <Form.Group id="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter your home address"
                                  value={settingCompanyInfo.address_street}
                                  onChange={(e) => {
                                    let settingCompanyInfoTemp = JSON.parse(JSON.stringify(settingCompanyInfo));
                                    settingCompanyInfoTemp.address_street = e.target.value;
                                    setSettingCompanyInfo(settingCompanyInfoTemp);
                                  }} />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={4} className="mb-3">
                              <Form.Group id="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City"
                                  value={settingCompanyInfo.address_city}
                                  onChange={(e) => {
                                    let settingCompanyInfoTemp = JSON.parse(JSON.stringify(settingCompanyInfo));
                                    settingCompanyInfoTemp.address_city = e.target.value;
                                    setSettingCompanyInfo(settingCompanyInfoTemp);
                                  }} />
                              </Form.Group>
                            </Col>
                            <Col sm={4} className="mb-3">
                              <Form.Group className="mb-2">
                                <Form.Label>Select state</Form.Label>
                                <Form.Select id="state"
                                  value={settingCompanyInfo.address_state !== "" ? settingCompanyInfo.address_state : '0'}
                                  onChange={(e) => {
                                    let settingCompanyInfoTemp = JSON.parse(JSON.stringify(settingCompanyInfo));
                                    settingCompanyInfoTemp.address_state = e.target.value;
                                    setSettingCompanyInfo(settingCompanyInfoTemp);
                                  }} >
                                  <option value="0">State</option>
                                  <option value="JHR">Johor</option>
                                  <option value="KDH">Kedah</option>
                                  <option value="KTN">Kelantan</option>
                                  <option value="MLK">Malacca</option>
                                  <option value="NSN">Negeri Sembilan</option>
                                  <option value="PHG">Pahang</option>
                                  <option value="PNG">Penang</option>
                                  <option value="PRK">Perak</option>
                                  <option value="PLS">Perlis</option>
                                  <option value="SBH">Sabah</option>
                                  <option value="SWK">Sarawak</option>
                                  <option value="SGR">Selangor</option>
                                  <option value="TRG">Terengganu</option>
                                  <option value="KUL">Kuala Lumpur</option>
                                  <option value="LBN">Labuan</option>
                                  <option value="PJY">Putrajaya</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col sm={4}>
                              <Form.Group id="zip">
                                <Form.Label>ZIP</Form.Label>
                                <Form.Control type="number" placeholder="ZIP"
                                  value={settingCompanyInfo.address_post_code}
                                  onChange={(e) => {
                                    let settingCompanyInfoTemp = JSON.parse(JSON.stringify(settingCompanyInfo));
                                    settingCompanyInfoTemp.address_post_code = e.target.value;
                                    setSettingCompanyInfo(settingCompanyInfoTemp);
                                  }} />
                              </Form.Group>
                            </Col>
                          </Row>
                          <div className="d-flex align-items-center my-4">
                            <FontAwesomeIcon icon={faAngleRight} className="me-3" />
                            <p className="mb-0 fs-6 fw-bold">Agencies</p>
                          </div>
                          <Row>
                            <Col md={4} className="mb-3">
                              <Form.Group id="companyName">
                                <Form.Label>Company Registration No</Form.Label>
                                <Form.Control type="text" placeholder="Company Registration No"
                                  value={settingCompanyInfo.reg_no}
                                  onChange={(e) => {
                                    let settingCompanyInfoTemp = JSON.parse(JSON.stringify(settingCompanyInfo));
                                    settingCompanyInfoTemp.reg_no = e.target.value;
                                    setSettingCompanyInfo(settingCompanyInfoTemp);
                                  }} />
                              </Form.Group>
                            </Col>
                            <Col md={4} className="mb-3">
                              <Form.Group id="companyName">
                                <Form.Label>EPF No</Form.Label>
                                <Form.Control type="text" placeholder="EPF No"
                                  value={settingCompanyInfo.epf_no}
                                  onChange={(e) => {
                                    let settingCompanyInfoTemp = JSON.parse(JSON.stringify(settingCompanyInfo));
                                    settingCompanyInfoTemp.epf_no = e.target.value;
                                    setSettingCompanyInfo(settingCompanyInfoTemp);
                                  }} />
                              </Form.Group>
                            </Col>
                            <Col md={4} className="mb-3">
                              <Form.Group id="companyName">
                                <Form.Label>SOCSO No</Form.Label>
                                <Form.Control type="text" placeholder="SOCSO No"
                                  value={settingCompanyInfo.socso_no}
                                  onChange={(e) => {
                                    let settingCompanyInfoTemp = JSON.parse(JSON.stringify(settingCompanyInfo));
                                    settingCompanyInfoTemp.socso_no = e.target.value;
                                    setSettingCompanyInfo(settingCompanyInfoTemp);
                                  }} />
                              </Form.Group>
                            </Col>
                          </Row>
                          <div className="mt-3">
                            <Button variant="primary" type="submit">Save All</Button>
                          </div>
                        </Form>
                      </Tab.Pane>
                      <Tab.Pane eventKey="profile" className="p-4">
                        <Form onSubmit={updatePersonal}>
                          <Row>
                            <Col md={12} className="mb-3">
                              <Form.Group id="companyName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter your username"
                                  value={settingUserInfo.username || ''}
                                  onChange={(e) => {
                                    let settingUserInfoTemp = JSON.parse(JSON.stringify(settingUserInfo));
                                    settingUserInfoTemp.username = e.target.value;
                                    setSettingUserInfo(settingUserInfoTemp);
                                  }} />
                              </Form.Group>
                            </Col>
                          </Row>
                          <div className="d-flex align-items-center justify-content-between my-4">
                            <div className="d-flex align-items-center">
                              <FontAwesomeIcon icon={faAngleRight} className="me-3" />
                              <p className="mb-0 fs-6 fw-bold">Change Password</p>
                            </div>
                            <div className='cursor-pointer text-info' onClick={changePasswordEditable}>Edit</div>
                          </div>
                          <Row>
                            <Col md={4} className="mb-3">
                              <Form.Group id="oldpassword">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control disabled={!editPassword} className={incorrectOldPassword ? "invalid" : ""} type="password" placeholder="Old Password"
                                  value={settingUserInfo.oldpassword}
                                  onChange={(e) => {
                                    let settingUserInfoTemp = JSON.parse(JSON.stringify(settingUserInfo));
                                    settingUserInfoTemp.oldpassword = e.target.value;
                                    setSettingUserInfo(settingUserInfoTemp);
                                  }} />
                                {incorrectOldPassword &&
                                  <p className="text-danger">Old Password didn't match.</p>
                                }
                              </Form.Group>
                            </Col>
                            <Col md={4} className="mb-3">
                              <Form.Group id="newpassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control disabled={!editPassword} type="password" placeholder="New Password"
                                  value={settingUserInfo.newpassword}
                                  onChange={(e) => {
                                    let settingUserInfoTemp = JSON.parse(JSON.stringify(settingUserInfo));
                                    settingUserInfoTemp.newpassword = e.target.value;
                                    setSettingUserInfo(settingUserInfoTemp);
                                  }} />
                              </Form.Group>
                            </Col>
                            <Col md={4} className="mb-3">
                              <Form.Group id="reenternewpassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control disabled={!editPassword} className={incorrectNewPassword ? "invalid" : ""} type="password" placeholder="Reenter New Password"
                                  value={settingUserInfo.confirmnewpassword}
                                  onChange={(e) => {
                                    let settingUserInfoTemp = JSON.parse(JSON.stringify(settingUserInfo));
                                    settingUserInfoTemp.confirmnewpassword = e.target.value;
                                    setSettingUserInfo(settingUserInfoTemp);
                                  }} />
                                {incorrectNewPassword &&
                                  <p className="text-danger">New Password didn't match.</p>
                                }
                              </Form.Group>
                            </Col>
                          </Row>
                          <div className="mt-3">
                            <Button variant="primary" type="submit">Save All</Button>
                          </div>
                        </Form>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
