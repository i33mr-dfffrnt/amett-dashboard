import AdminSidebar from "../../components/adminSidebar";
import { IoAddCircleOutline, IoTrash, IoPencil } from "react-icons/io5";

const ManageAdmins = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
      <AdminSidebar />
      <div className="col-span-4 mt-10 ">
        <h2 className="text-xl sm:text-4xl mb-5 mt-2 playfairDisplay-font font-bold">
          Manage Admins
        </h2>
        <div className="flex flex-row justify-end gap-3 my-4">
          <button className=" flex w-30 text-sm items-center justify-center rounded-sm border border-transparent bg-dodger py-1 px-4  font-semibold text-white hover:bg-dodgerDark focus:outline-none">
            <IoAddCircleOutline size={30} className="mr-2" />
            Add Admin
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
                    />
                    <label for="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  admin username
                </th>
                <th scope="col" className="px-6 py-3">
                  Access
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b   hover:bg-gray-50 ">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2  "
                    />
                    <label for="checkbox-table-search-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Active</td>

                <td className="flex items-center justify-center px-6 py-4 space-x-3 ">
                  <button className=" flex w-30 text-sm items-center justify-center rounded-3xl border border-transparent  drop-shadow-lg bg-white py-1 px-1  font-semibold text-white ">
                    <IoTrash size={20} color="#FA0562" />
                  </button>
                  <button className=" flex w-30 text-sm items-center justify-center rounded-3xl border border-transparent  drop-shadow-lg bg-white py-1 px-1  font-semibold text-white ">
                    <IoPencil size={20} color="#1CABFF" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmins;
