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
import ManageModels from "./pages/adminDashboard/manageModels";
import ModelForm from "./pages/adminDashboard/modelForm";
import ServiceForm from "./pages/serviceForm";
import ServiceStatus from "./pages/serviceStatus";

import SearchResults from "./pages/searchResults";
import AuctionOverview from "./pages/auctionOverview";
import EquipManufacturersPage from "./pages/equipManufacturersPage";

import ManageAuctions from "./pages/adminDashboard/manageAuctions";
import ManageBids from "./pages/adminDashboard/manageBids";
import ManageQuoteRequests from "./pages/adminDashboard/manageQuoteRequests";
import UpdateModel from "./pages/adminDashboard/updateModel";
import ManageManufacturers from "./pages/adminDashboard/manageManu";
import ManageTypes from "./pages/adminDashboard/manageTypes";
import ManufacturerForm from "./pages/adminDashboard/manufacturerForm";
import TypeForm from "./pages/adminDashboard/typeForm";
import ManageAdmins from "./pages/adminDashboard/manageAdmins";
import AdminLogin from "./pages/adminDashboard/adminLogin";
import UpdateAuction from "./pages/adminDashboard/updateAuction";
import UpdateManufacturer from "./pages/adminDashboard/updateManufacturer";
import UpdateType from "./pages/adminDashboard/updateType";
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
        <Route path="/service" element={<ServiceForm />} />
        <Route path="/service/status/:serviceId" element={<ServiceStatus />} />

        {/* Admin pages */}
        <Route path="/admin-dashboard/login" element={<AdminLogin />} />

        {/* Admin pages protected*/}

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminHome />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/manage-models" element={<ManageModels />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/create-model" element={<ModelForm />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/update-model/:modelId" element={<UpdateModel />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/manage-auctions" element={<ManageAuctions />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/update-auction/:auctionId" element={<UpdateAuction />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/manage-bids" element={<ManageBids />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/manage-quote-requests" element={<ManageQuoteRequests />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/manage-manufacturers" element={<ManageManufacturers />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/manage-types" element={<ManageTypes />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/create-manufacturer" element={<ManufacturerForm />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/admin-dashboard/update-manufacturer/:manufacturerId"
            element={<UpdateManufacturer />}
          />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/create-type" element={<TypeForm />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/update-type/:typeId" element={<UpdateType />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/admin-dashboard/manage-admins" element={<ManageAdmins />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
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
