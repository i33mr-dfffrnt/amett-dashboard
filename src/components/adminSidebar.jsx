// import logo from "../assets/logo-cropped.png";
import logo from "../assets/AMETT Group Logos-UPDATED- cropped.jpg";
import { TbDeviceHeartMonitor, TbHome } from "react-icons/tb";
import { RiAuctionLine, RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlineRequestQuote } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import amettAPI from "../api/amettAPI";

const AdminSidebar = () => {
  const navigate = useNavigate();
  return (
    <div className=" h-screen sticky top-0 p-3 bg-baseBlue shadow">
      <div className="space-y-3">
        <div className="flex items-center">
          <img className="  w-auto" src={logo} alt="AMETT" />
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm bg-white">
              <Link to={"/"} className="flex items-center p-2 space-x-3 rounded-md">
                <TbHome size={24} />
                <span className="font-semibold oswald-font text-xl ">Home</span>
              </Link>
            </li>
            <li className="rounded-sm bg-white">
              <Link to={"/manage-equipment"} className="flex items-center p-2 space-x-3 rounded-md">
                <TbDeviceHeartMonitor size={24} />
                <span className="font-semibold oswald-font text-xl ">Equipment</span>
              </Link>
            </li>
            <li className="rounded-sm bg-white">
              <Link to={"/manage-services"} className="flex items-center p-2 space-x-3 rounded-md">
                <MdOutlineRequestQuote size={24} />
                <span className="font-semibold oswald-font text-xl ">Services</span>
              </Link>
            </li>
            <li className="rounded-sm bg-white">
              <Link to={"/manage-requests"} className="flex items-center p-2 space-x-3 rounded-md">
                <MdOutlineRequestQuote size={24} />
                <span className="font-semibold oswald-font text-xl ">Requests</span>
              </Link>
            </li>
            {/* <li className="rounded-sm bg-white">
              <Link
                to={"/manage-auctions"}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <RiAuctionLine size={24} />

                <span className="font-semibold oswald-font text-xl ">Manage Auctions</span>
              </Link>
            </li>
            <li className="rounded-sm bg-white">
              <Link
                to={"/manage-bids"}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <BiDollar size={24} />

                <span className="font-semibold oswald-font text-xl ">Manage Bids</span>
              </Link>
            </li>
            <li className="rounded-sm bg-white">
              <Link
                to={"/manage-quote-requests"}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <MdOutlineRequestQuote size={24} />
                <span className="font-semibold oswald-font text-xl ">Manage Quotes</span>
              </Link>
            </li> */}

            <li className="rounded-sm bg-white">
              <button
                className="flex items-center p-2 space-x-3 rounded-md"
                onClick={async () => {
                  await amettAPI.post(`/auth/logout`);
                  navigate("/login");
                }}
              >
                <RiLogoutBoxLine size={24} />
                <span className="font-semibold oswald-font text-xl ">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
