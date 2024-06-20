// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Article_factory_table from "layouts/article_factory_table";
import Grants_gov_table from "layouts/grants_gov_table";
import Google_jobs_table from "layouts/google_jobs_table";
import Yellowpages_table from "layouts/yellowpages_table";
import Procurement from "layouts/procurement";
// import Billing from "layouts/billing";
// import VirtualReality from "layouts/virtual-reality";
// import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Article_factory",
    key: "article_factory_table",
    route: "/article_factory_table",
    icon: <Office size="12px" />,
    component: <Article_factory_table />,
    noCollapse: true,
  },
  { type: "title", title: "BA trips", key: "account-pages" },
  {
    type: "collapse",
    name: "Yellow Pages",
    key: "yellowpages_table",
    route: "/yellowpages_table",
    icon: <Office size="12px" />,
    component: <Yellowpages_table />,
    noCollapse: true,
  },

  { type: "title", title: "Local Works", key: "Jobs-tables" },
  {
    type: "collapse",
    name: "Procurement",
    key: "procurement_table",
    route: "/procurement_table",
    icon: <Office size="12px" />,
    component: <Procurement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Grants_gov",
    key: "grants_gov_table",
    route: "/grants_gov_table",
    icon: <Office size="12px" />,
    component: <Grants_gov_table />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Google_jobs",
    key: "Google_jobs_table",
    route: "/Google_jobs_table",
    icon: <Office size="12px" />,
    component: <Google_jobs_table />,
    noCollapse: true,
  },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  // {
    //   type: "collapse",
    //   name: "Profile",
    //   key: "profile",
  //   route: "/profile",
  //   icon: <CustomerSupport size="12px" />,
  //   component: <Profile />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   route: "/authentication/sign-in",
  //   icon: <Document size="12px" />,
  //   component: <SignIn />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp />,
  //   noCollapse: true,
  // },
];

export default routes;
