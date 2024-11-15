import customDot from "../assets/customDot.png";

const WhoAreWe = () => {
  const list = [
    {
      title: "We Aspire",
      description:
        "To transform healthcare systems using cutting edge engineering, digital and consulting solutions",
    },
    {
      title: "We Optimize",
      description: "healthcare operations performance",
    },
    {
      title: "We Provide",
      description: "Health solutions that allow patients to have integrated care pathways",
    },
    {
      title: "We Digitize",
      description:
        "The patient experience journey to allow patients and healthcare professionals to have access to the right information at the right time to make the right decision to deliver the right impact",
    },
    {
      title: "We Supply",
      description:
        "The market with the highest tech technologies to integrate the existing systems to attain the 2030 vision",
    },
  ];
  return (
    <div className="bg-baseGray p-8  text-left ">
      <h2 className="text-2xl sm:text-4xl mb-5 mt-2 playfairDisplay-font font-bold text-baseBlack">
        Who are we?
      </h2>
      <h3 className="text-sm sm:text-base rubik-font font-semibold text-baseBlue">
        AMETT is a Company that drives patient-centric value-based healthcare through turnkey
        engineering solutions and delivering productivity across labor, operations and asset
        utilization
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-8 mt-6">
        {list.map((el) => {
          return (
            <div key={el.title}>
              <div className="flex">
                <img src={customDot} alt="" className="h-8 mt-0.5" />
                <h4 className="text-baseBlack text-xl sm:text-3xl ml-2 playfairDisplay-font font-semibold">
                  {el.title}
                </h4>
              </div>
              <p className="ml-11 mt-2 rubik-font text-baseBlue text-sm sm:text-base">
                {el.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhoAreWe;
