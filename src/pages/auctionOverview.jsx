import { useEffect, useState } from "react";
import amettAPI from "../api/amettAPI";
import Navbar from "../components/navbar";

import { useNavigate, useParams } from "react-router-dom";
import BidModal from "../components/bidModal";
import { Link } from "react-router-dom";

export default function AuctionOverview() {
  const { auctionId } = useParams();

  const navigate = useNavigate();

  const [bidModalState, setBidModalState] = useState(false);

  const [auction, setAuction] = useState({});

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await amettAPI.get(`/auctions/${auctionId}?status=Active`);
        response.data.data.auction.currentBid =
          response.data.data.auction.currentBid + response.data.data.auction.currentBid * 0.1;

        setAuction(response.data.data.auction);
      } catch (error) {
        navigate("/404", { replace: true });
      }
    };
    fetchAuction();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex-auto   ">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="justify-start flex max-w-2xl items-center space-x-2  lg:max-w-7xl mt-2 pl-4"
          >
            <li>
              <div className="flex items-center">
                <Link
                  to={`/auctions`}
                  className=" text-sm font-medium text-gray-500 hover:text-gray-600"
                >
                  Auctions
                </Link>
              </div>
            </li>
            {auction && auction.name && (
              <li>
                <div className="flex items-center">
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                  <p className="ml-2 text-sm font-medium text-gray-900">{`${auction.name}`}</p>
                </div>
              </li>
            )}
          </ol>
        </nav>
        {auction && auction.name && (
          <BidModal
            bidModalState={bidModalState}
            setBidModalState={() => setBidModalState(false)}
            selectedAuction={auction}
          />
        )}
        {auction && auction.name && (
          <div className="bg-white">
            {/* Model info */}
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-8 lg:pb-24">
              <div className="w-full rounded-lg shadow-md product-carousel">
                <div className="product-carousel-slide rounded-lg">
                  <img src={auction.imageUrl} alt=".." className="carousel-img " />
                </div>
              </div>
              <div className="mt-2 lg:mt-0 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl playfairDisplay-font">
                  {auction.name}
                </h1>
                <p className="text-3xl tracking-tight text-gray-900">
                  Current Bid: {auction.currentBid} USD
                </p>
                <p className="text-3xl tracking-tight text-gray-900">
                  End Date: {auction.endDate.split("T")[0]}
                </p>

                <button
                  onClick={() => {
                    setBidModalState(true);
                  }}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-baseBlack py-3 px-8 text-base font-medium text-white hover:bg-baseBlue focus:outline-none focus:ring-2 focus:ring-baseBlue focus:ring-offset-2"
                >
                  Make a Bid
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
