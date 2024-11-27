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
import ServiceReqForm from "./pages/serviceForm";
import ServiceStatus from "./pages/serviceStatus";

import SearchResults from "./pages/searchResults";
import AuctionOverview from "./pages/auctionOverview";
import EquipManufacturersPage from "./pages/equipManufacturersPage";

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
        <Route path="/" element={<Home />} />
        <Route path="/equipment-types" element={<EquipTypesPage />} />
        <Route path="/equipment-manufacturers/:typeId" element={<EquipManufacturersPage />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auctions/:auctionId" element={<AuctionOverview />} />
        <Route path="/models" element={<ModelOverview />} />
        <Route path="/search/:searchTerm" element={<SearchResults />} />
        <Route path="/service" element={<ServiceReqForm />} />
        <Route path="/service/status/:serviceId" element={<ServiceStatus />} />

        {/* Admin pages */}
        <Route path="/admin-dashboard/login" element={<AdminLogin />} />

        {/* Admin pages protected*/}

        <Route path="/">
          <Route path="/admin-dashboard" element={<AdminHome />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/manage-equipment" element={<ManageEquipment />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/manage-services" element={<ManageServices />} />
        </Route>
        <Route path="/">
          <Route path="/admin-dashboard/manage-requests" element={<ManageRequests />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/create-equipment" element={<ModalForm />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/create-service" element={<ServiceForm />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/update-model/:modelId" element={<UpdateModel />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/update-service/:serviceId" element={<UpdateService />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/manage-auctions" element={<ManageAuctions />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/update-auction/:auctionId" element={<UpdateAuction />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/manage-bids" element={<ManageBids />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/manage-quote-requests" element={<ManageQuoteRequests />} />
        </Route>

        <Route path="/">
          <Route
            path="/admin-dashboard/manage-equipment-manufacturers"
            element={<ManageEquipmentManufacturers />}
          />
        </Route>

        <Route path="/">
          <Route
            path="/admin-dashboard/manage-equipment-types"
            element={<ManageEquipmentTypes />}
          />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/manage-service-types" element={<ManageServiceTypes />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/create-manufacturer" element={<ManufacturerForm />} />
        </Route>

        <Route path="/">
          <Route
            path="/admin-dashboard/update-manufacturer/:manufacturerId"
            element={<UpdateManufacturer />}
          />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/create-equipment-type" element={<TypeForm />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/create-service-type" element={<ServiceTypeForm />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/update-equipment-type/:typeId" element={<UpdateType />} />
        </Route>

        <Route path="/">
          <Route path="/admin-dashboard/manage-admins" element={<ManageAdmins />} />
        </Route>
        <Route path="/">
          <Route path="/admin-dashboard/404" element={<AdminNotFoundPage />} />
        </Route>

        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
