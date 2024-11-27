import {
  BrowserRouter as Router,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import EquipTypesPage from "./pages/equipTypesPage";
import ModelOverview from "./pages/modelOverview";
import Auctions from "./pages/auctions";
import Footer from "./components/footer";
import PrivateRoute from "./components/privateRoute";

import AdminHome from "./pages/adminDashboard/adminHome";

/* Equipment (Product)*/
import ManageEquipment from "./pages/adminDashboard/manageEquipment";
import ManageServices from "./pages/adminDashboard/manageServices";
import ManageRequests from "./pages/adminDashboard/manageRequests";
import ModalForm from "./pages/adminDashboard/modelForm";
import ServiceForm from "./pages/adminDashboard/serviceForm";
import UpdateModel from "./pages/adminDashboard/updateModel";
import UpdateService from "./pages/adminDashboard/updateService";
import UpdateServiceType from "./pages/adminDashboard/updateServiceType";

/* Equipment Manufacturers  (Product Manufacturer)*/
import ManageEquipmentManufacturers from "./pages/adminDashboard/manageManu";
import ManufacturerForm from "./pages/adminDashboard/manufacturerForm";
import UpdateManufacturer from "./pages/adminDashboard/updateManufacturer";

/* Equipment Types (Product Collection) */
import ManageEquipmentTypes from "./pages/adminDashboard/manageEquipmentTypes";
import ManageServiceTypes from "./pages/adminDashboard/manageServiceTypes";
import TypeForm from "./pages/adminDashboard/typeForm";
import ServiceTypeForm from "./pages/adminDashboard/serviceTypeForm";
import UpdateType from "./pages/adminDashboard/updateType";

/*Other  */

import ManageAuctions from "./pages/adminDashboard/manageAuctions";
import ManageBids from "./pages/adminDashboard/manageBids";
import ManageQuoteRequests from "./pages/adminDashboard/manageQuoteRequests";

import ManageAdmins from "./pages/adminDashboard/manageAdmins";
import AdminLogin from "./pages/adminDashboard/adminLogin";
import UpdateAuction from "./pages/adminDashboard/updateAuction";

import NotFoundPage from "./pages/notFoundPage";
import AdminNotFoundPage from "./pages/adminDashboard/adminNotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin pages */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Admin pages protected*/}

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<AdminHome />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/manage-equipment" element={<ManageEquipment />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/manage-services" element={<ManageServices />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/manage-requests" element={<ManageRequests />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/create-equipment" element={<ModalForm />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/create-service" element={<ServiceForm />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/update-model/:modelId" element={<UpdateModel />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/update-service/:serviceId" element={<UpdateService />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/update-service-type/:typeId" element={<UpdateServiceType />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/manage-auctions" element={<ManageAuctions />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/update-auction/:auctionId" element={<UpdateAuction />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/manage-bids" element={<ManageBids />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/manage-quote-requests" element={<ManageQuoteRequests />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/manage-equipment-manufacturers"
            element={<ManageEquipmentManufacturers />}
          />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/manage-equipment-types" element={<ManageEquipmentTypes />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/manage-service-types" element={<ManageServiceTypes />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/create-manufacturer" element={<ManufacturerForm />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/update-manufacturer/:manufacturerId" element={<UpdateManufacturer />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/create-equipment-type" element={<TypeForm />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/create-service-type" element={<ServiceTypeForm />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/update-equipment-type/:typeId" element={<UpdateType />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/manage-admins" element={<ManageAdmins />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/404" element={<AdminNotFoundPage />} />
        </Route>

        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
