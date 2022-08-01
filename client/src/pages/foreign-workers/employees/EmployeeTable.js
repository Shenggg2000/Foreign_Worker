
import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCheck, faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { Routes } from "../../../routes";

import { TransactionsTable } from "../../../components/Tables";

export default () => (
  <>
    <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <div className="d-block mb-4 mb-xl-0">
        <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
          <Breadcrumb.Item  linkAs={Link} linkProps={{ to: Routes.ForeignWorker.path}}><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
          <Breadcrumb.Item active>Employees</Breadcrumb.Item>
        </Breadcrumb>
        <h4>Employees tables</h4>
        <p className="mb-0">
          A list of all the employees in the organization.
        </p>
      </div>
      <div className="btn-toolbar mb-2 mb-md-0">
        <ButtonGroup>
          <Button variant="outline-primary" size="sm">Import</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup>
      </div>
    </div>

    <div className="table-settings mb-4">
      <Row className="justify-content-between align-items-center">
        <Col xs={8} md={6} lg={3} xl={4}>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Search" />
          </InputGroup>
        </Col>
        <Col xs={4} md={2} xl={2} className="ps-md-0 text-end d-flex justify-content-between align-items-center">
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0 d-flex align-items-center">
              <span className="icon icon-sm icon-gray">
                <FontAwesomeIcon icon={faCog} />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-left">
              <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
              <Dropdown.Item className="d-flex fw-bold">
                10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
              </Dropdown.Item>
              <Dropdown.Item className="fw-bold">20</Dropdown.Item>
              <Dropdown.Item className="fw-bold">30</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Active</Button>
            <Button variant="outline-primary" size="sm">Archive</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>

    <TransactionsTable />
  </>
);
