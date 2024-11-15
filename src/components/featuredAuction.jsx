import { Link } from "react-router-dom";

const FeaturedAuction = (props) => {
  return (
    <Link
      to={`/auctions/${props.auction._id}`}
      className="text-left playfairDisplay-font inline-block	px-4  w-2/4 sm:w-1/3	whitespace-normal"
    >
      <img
        className="h-30 sm:h-60 w-full"
        src={props.auction.imageUrl}
        alt=""
        style={{ objectFit: "cover" }}
      />
      <h4 className="font-semibold text-xs sm:text-lg truncate">{props.auction.name}</h4>
      <h4 className="text-xs sm:text-base font-medium">
        Current Bid: {props.auction.currentBid} USD
      </h4>
      <h4 className="text-xs sm:text-base font-medium">
        End Date: {props.auction.endDate.split("T")[0]}
      </h4>
    </Link>
  );
};

export default FeaturedAuction;
