import AdminSidebar from "../../components/adminSidebar";
import Chart from "../../components/chart";
import { RiAuctionLine } from "react-icons/ri";
import { GiMedicalDrip, GiMoneyStack, GiPriceTag } from "react-icons/gi";
import { useEffect, useState } from "react";
import amettAPI from "../../api/amettAPI";

const AdminHome = () => {
  const [auctionsLength, setAuctionsLength] = useState(0);
  const [modelsLength, setModelsLength] = useState(0);
  const [bidsLength, setBidsLength] = useState(0);
  const [quoteRequestsLength, setQuoteRequestsLength] = useState(0);
  const [latestUpdate, setLatestUpdate] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await amettAPI.get(`/auctions`);
        setAuctionsLength(response.data.data.auctions.length);
      } catch (error) {}
    };

    const fetchModels = async () => {
      try {
        const response = await amettAPI.get(`/equipment-models`);
        setModelsLength(response.data.data.equipmentModels.length);
      } catch (error) {}
    };
    const fetchBids = async () => {
      try {
        const response = await amettAPI.get(`/bids`);
        setBidsLength(response.data.data.bids.length);
      } catch (error) {}
    };
    const fetchQuoteRequests = async () => {
      try {
        const response = await amettAPI.get(`/quotes`);
        setQuoteRequestsLength(response.data.data.quotes.length);
      } catch (error) {}
    };

    const fetchLatestUpdate = async () => {
      try {
        const response = await amettAPI.get(`/jobs/latest`);
        setLatestUpdate(`${new Date(response.data.data.job[0].lastRunTimestamp).toLocaleString()}`);
      } catch (error) {}
    };

    const fetchPerformanceSnapshots = async () => {
      try {
        const response = await amettAPI.get(`/jobs/performance-snapshots`);

        setData({
          labels: response.data.data.performanceSnapshots.map((el) => {
            return new Date(el.createdAt).toDateString().split(" ")[1];
          }),
          datasets: [
            {
              fill: false,
              label: "Active Auctions",
              // data: labels.map(() => faker.datatype.number()),
              data: response.data.data.performanceSnapshots.map((el) => {
                return el.noOfAuctions;
              }),
              // data: 0,
              // data: labels.map(() => 1),
              borderColor: "rgb(107, 171, 189)",
              backgroundColor: "rgba(107, 171, 189,0.5)",
            },
            {
              fill: false,
              label: "Models",
              // data: labels.map(() => faker.datatype.number()),
              // data: 0,
              data: response.data.data.performanceSnapshots.map((el) => {
                return el.noOfModels;
              }),
              // data: labels.map(() => 1),
              borderColor: "rgb(225, 97, 98)",
              backgroundColor: "rgba(225, 97, 98, 0.5)",
            },
            {
              fill: false,
              label: "Bids",
              // data: labels.map(() => faker.datatype.number()),
              data: response.data.data.performanceSnapshots.map((el) => {
                return el.noOfBids;
              }),
              // data: 0,
              // data: labels.map(() => 1),
              borderColor: "rgb(243, 206, 178)",
              backgroundColor: "rgba(243, 206, 178,0.5)",
            },
            {
              fill: false,
              label: "Quote Requests",
              data: response.data.data.performanceSnapshots.map((el) => {
                return el.noOfQuoteRequests;
              }),
              // data: labels.map(() => faker.datatype.number()),
              // data: 0,
              // data: labels.map(() => 1),
              borderColor: "rgb(134, 151, 166)",
              backgroundColor: "rgba(134, 151, 166, 0.5)",
            },
          ],
        });
      } catch (error) {}
    };
    fetchAuctions();
    fetchModels();
    fetchBids();
    fetchQuoteRequests();
    fetchLatestUpdate();
    fetchPerformanceSnapshots();
  }, []);
  return (
    <div className="grid grid-cols-5 gap-4">
      <AdminSidebar />
      <div className="col-span-4 ">
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="grid grid-cols-2 py-8 px-10 rounded-2xl shadow-lg bg-blueCard flex items-center content-center ">
            <div className="flex items-center ">
              <div>
                <h2 className="text-7xl mb-10 rubik-font text-white">{auctionsLength}</h2>
                <h3 className="text-4xl rubik-font text-white font-semibold">Active Auctions</h3>
              </div>
            </div>
            <div className="flex justify-end">
              <RiAuctionLine size={150} color="#FFF" />
            </div>
          </div>
          <div className="grid grid-cols-2 py-8 px-10 rounded-2xl shadow-lg bg-redCard flex items-center content-center ">
            <div className="flex items-center ">
              <div>
                <h2 className="text-7xl mb-10 rubik-font text-white">{modelsLength}</h2>
                <h3 className="text-4xl  rubik-font text-white font-semibold">Models</h3>
              </div>
            </div>
            <div className="flex justify-end">
              <GiMedicalDrip size={150} color="#FFF" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="grid grid-cols-2 py-8 px-10 rounded-2xl shadow-lg bg-brownCard flex items-center content-center ">
            <div className="flex items-center ">
              <div>
                <h2 className="text-4xl lg:text-6xl mb-10 rubik-font text-white">{bidsLength}</h2>
                <h3 className="text-3xl  rubik-font text-white font-semibold">Bids</h3>
              </div>
            </div>
            <div className="flex justify-end">
              <GiMoneyStack size={150} color="#FFF" />
            </div>
          </div>
          <div className="grid grid-cols-2 py-8 px-10 rounded-2xl shadow-lg bg-grayCard flex items-center content-center ">
            <div className="flex items-center ">
              <div>
                <h2 className="text-4xl lg:text-6xl mb-10 rubik-font text-white">
                  {quoteRequestsLength}
                </h2>
                <h3 className="text-3xl  rubik-font text-white font-semibold">Quote Requests</h3>
              </div>
            </div>
            <div className="flex justify-end">
              <GiPriceTag size={150} color="#FFF" />
            </div>
          </div>
          <div className="grid grid-cols-2 py-8 px-10 rounded-2xl shadow-lg bg-lBlueCard flex items-center content-center ">
            <div className="flex items-center ">
              <div>
                <h2 className="lg:text-3xl text-2xl mb-4 rubik-font text-white">{latestUpdate}</h2>
                <h3 className="text-2xl lg:text-3xl  rubik-font text-white font-semibold">
                  Latest Auctions Update
                </h3>
              </div>
            </div>
            {/* <div className="flex justify-end">
              <GiMedicalDrip size={150} color="#FFF" />
            </div> */}
          </div>
        </div>
        {data && (
          <div className="h-96">
            <Chart data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
