import logo from "../assets/logo2.png";

const About = () => {
  return (
    <>
      <div
        id="about"
        className="py-10 grid grid-cols-1 justify-items-center md:grid-cols-2 sm:grid-cols-2 px-6"
      >
        <div className="p-10   bg-white rounded-lg shadow-lg ">
          <img className="h-44 sm:h-56" src={logo} alt="amett Logo" />
        </div>
        <div className="text-left mt-1 w-full sm:max-w-xl">
          <div className="text-baseBlue ">
            <h2 className="text-xl sm:text-4xl mb-5 mt-2 playfairDisplay-font font-bold">
              AMETT at a Glance
            </h2>
            <h4 className="text-sm sm:text-lg rubik-font font-semibold">
              AMETT’s headquarter office located in the US supplies its local office in the Kingdom
              and is committed to conveying medical technology solutions needed in healthcare
              facilities to the MENA region. Our- highly educated and trained Biomedical Engineers
              are dedicated to ensuring our clients receive the optimum equipment for safety,
              diagnosis, and treatments. At AMETT, we strive to provide clients with the fastest and
              most reliable services to help healthcare staff focus on their duties.
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
