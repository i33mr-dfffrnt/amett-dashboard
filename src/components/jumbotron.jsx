const Jumbotron = () => {
  return (
    <div className="p-12 relative overflow-hidden bg-no-repeat bg-cover jumbotron-image ">
      <div
        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
        style={{
          backgroundColor: "rgba(8, 10, 55, 0.65)",
        }}
      >
        <div className="text-left flex md:justify-start justify-center items-center h-full">
          <div className="text-white ml-10 sm:24 lg:ml-36 px-1">
            <div className="flex">
              <div className="bg-baseGreen w-6 h-9 sm:w-8 sm:h-12 float-left mt-1 sm:mt-3 mr-3"></div>
              <h1 className="text-5xl sm:text-7xl font-bold	 mb-1 playfairDisplay-font w-80	">
                AMETT Group
              </h1>
            </div>
            <h4 className="ml-8 sm:ml-11 font-medium	mb-6 rubik-font sm:text-xl	text-base w-3/4">
              Unlock the promise of Medical Technology to transform the Future of Patient Care
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
