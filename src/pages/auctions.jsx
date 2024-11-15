import { useEffect } from "react";
import { useState } from "react";
import amettAPI from "../api/amettAPI";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

const Auctions = () => {
  const [auctionsList, setAuctionsList] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await amettAPI.get(`/auctions?status=Active&sort=-currentBid`);

        setAuctionsList(
          response.data.data.auctions.map((el) => {
            return { ...el, currentBid: el.currentBid + el.currentBid * 0.1 };
          })
        );
      } catch (error) {}
    };
    fetchAuctions();
  }, []);
  return (
    <>
      <Navbar />
      <div className="p-4 flex-auto playfairDisplay-font">
        <div className="p-4 flex-auto playfairDisplay-font grid grid-cols-1 justify-items-center md:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-4">
          {auctionsList &&
            auctionsList.map((el) => {
              return (
                <Link
                  to={`/auctions/${el._id}`}
                  className="text-left playfairDisplay-font  w-full  flex flex-col rounded-lg shadow-xl"
                >
                  <img
                    className="h-48 sm:h-72 rounded-t-lg	"
                    src={el.imageUrl}
                    alt=""
                    style={{ objectFit: "cover" }}
                  />
                  <div className="p-2">
                    <h4 className="font-semibold text-xs sm:text-lg ">{el.name}</h4>
                    <h4 className="text-xs sm:text-base font-medium">
                      Current Bid: {el.currentBid} USD
                    </h4>
                    <h4 className="text-xs sm:text-base font-medium">
                      End Date: {el.endDate.split("T")[0]}
                    </h4>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Auctions;
