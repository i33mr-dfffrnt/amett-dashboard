import { useEffect, useState } from "react";
import FeaturedAuction from "./featuredAuction";
import amettAPI from "../api/amettAPI";

const FeaturedAuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await amettAPI.get(`/auctions?status=Active&sort=-currentBid&limit=6`);
        setAuctions(
          response.data.data.auctions.map((el) => {
            return { ...el, currentBid: el.currentBid + el.currentBid * 0.1 };
          })
        );
      } catch (error) {}
    };
    fetchAuctions();
  }, []);

  return (
    <div className="my-10">
      <h2 className="m-4 text-left playfairDisplay-font text-xl sm:text-3xl font-semibold">
        Featured auctions{"  "}
        <a href="/auctions" className="underline sm:text-xl text-sm font-medium">
          View All
        </a>
      </h2>
      <div className="text-left	 divide-x divide-gray-400 overflow-auto whitespace-nowrap">
        {auctions.map((auction) => {
          return <FeaturedAuction auction={auction} />;
        })}
      </div>
    </div>
  );
};

export default FeaturedAuctionList;
