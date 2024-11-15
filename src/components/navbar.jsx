import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import logo from "../assets/logo-cropped.png";
import logo from "../assets/AMETT Group Logos-UPDATED- cropped.jpg";
import { FiSearch } from "react-icons/fi";
import SearchBar from "./searchBar";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Auctions", href: "/auctions", current: false },
  { name: "Equipment Sales", href: "/equipment-types", current: false },
  { name: "Biomedical Engineering Servicing", href: "/service", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-baseBlue flex-none text-center">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 ">
            <div className="relative flex h-32 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="block h-20 w-auto lg:hidden" src={logo} alt="AMETT" />
                  <img className="hidden h-28 w-auto lg:block" src={logo} alt="AMETT" />
                </div>
                <div className="hidden sm:ml-6 sm:block align-middle">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-white text-black"
                            : "text-white hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium oswald-font text-xl md:text-xl sm:text-2xl lg:text-2xl"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 sm:right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden md:block">
                <SearchBar />
              </div>
            </div>
          </div>
          <div className="px-4 pb-4 block md:hidden">
            <div className="relative  text-gray-600 ">
              <input
                className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none  w-full"
                type="search"
                name="search"
                placeholder="Search for equipment"
              />
              <button type="submit" className="absolute right-0 top-0 mt-3 mr-2">
                <FiSearch />
              </button>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium oswald-font"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
