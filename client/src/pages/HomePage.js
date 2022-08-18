import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarForeignWorker from "../components/SidebarForeignWorker";
import NavbarForeignWorker from "../components/NavbarForeignWorker";
import FooterForeignWorker from "../components/FooterForeignWorker";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";

import FWDashboard from "./foreign-workers/dashboard/Dashboard";
import FWEmployeeTable from "./foreign-workers/employees/EmployeeTable";
import FWLinks from "./foreign-workers/links/Links";
import FWPayroll from "./foreign-workers/payroll/PayrollRun";
import FWPayrollHistory from "./foreign-workers/payroll/PayrollHistory";
import FWPayrollHistoryDetail from "./foreign-workers/payroll/PayrollHistoryDetail";
import FWReminder from "./foreign-workers/reminder/Reminder";
import FWSetting from "./foreign-workers/settings/Settings";
import FWLogin from "./foreign-workers/Login";
import FWRegister from "./foreign-workers/Register";
import FW404 from "./foreign-workers/404";
import useToken from './foreign-workers/useToken';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const { token } = useToken();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => {
      if (token) {
        props.history.push("/");
        return (
          <></>
        );
      } else {
        return (
          <>
            <Preloader show={loaded ? false : true} />
            <Component {...props} />
          </>
        )
      }
    }} />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const { token } = useToken();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  if (!rest.path.includes("library")) {
    return (
      <Route {...rest} render={props => {
        console.log(token);
        if (!token) {
          props.history.push("/login");
          return (
            <></>
          );
        } else {
          return (
            <>
              <Preloader show={loaded ? false : true} />
              <SidebarForeignWorker />

              <main className="content">
                <NavbarForeignWorker />
                <Component {...props} />
                <FooterForeignWorker toggleSettings={toggleSettings} showSettings={showSettings} />
              </main>
            </>
          )
        }
      }}
      />
    );
  } else {
    return (
      <Route {...rest} render={props => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
          </main>
        </>
      )}
      />
    );
  }
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} />
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />

    {/* components */}
    <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

    {/* documentation */}
    <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
    <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
    <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
    <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
    <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
    <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
    <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} />

    {/* Foreign Worker */}
    <RouteWithSidebar exact path={Routes.ForeignWorker.path} component={FWDashboard} />
    <RouteWithSidebar exact path={Routes.ForeignWorkerEmployee.path} component={FWEmployeeTable} />
    <RouteWithSidebar exact path={Routes.ForeignWorkerPayroll.path} component={FWPayroll} />
    <RouteWithSidebar exact path={Routes.ForeignWorkerPayrollHistory.path} component={FWPayrollHistory} />
    <RouteWithSidebar path={Routes.ForeignWorkerPayrollHistoryDetail.path} component={FWPayrollHistoryDetail} />
    <RouteWithSidebar exact path={Routes.ForeignWorkerReminder.path} component={FWReminder} />
    <RouteWithSidebar exact path={Routes.ForeignWorkerLinks.path} component={FWLinks} />
    <RouteWithSidebar exact path={Routes.ForeignWorkerSetting.path} component={FWSetting} />
    <RouteWithLoader exact path={Routes.ForeignWorkerLogin.path} component={FWLogin} />
    <RouteWithLoader exact path={Routes.ForeignWorkerRegister.path} component={FWRegister} />
    <RouteWithLoader exact path={Routes.ForeignWorkerNotFound.path} component={FW404} />

    <Redirect to={Routes.ForeignWorkerNotFound.path} />
  </Switch>
);
