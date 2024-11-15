import Navbar from "../components/navbar";
import FeaturedEquipmentList from "../components/featuredEquipmentList";
import FeaturedAuctionList from "../components/featuredAuctionList";
import Jumbotron from "../components/jumbotron";
import About from "../components/about";
import WhoAreWe from "../components/whoAreWe";

const Home = () => {
  return (
    <div className="flex-auto">
      <Navbar />
      <Jumbotron />
      <About />
      <FeaturedEquipmentList />
      <FeaturedAuctionList />
      <WhoAreWe />
    </div>
  );
};

export default Home;
