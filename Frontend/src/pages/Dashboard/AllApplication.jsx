import { useEffect, useState } from "react";
import { getReq } from "../../Api/axios";

const AllApplication = () => {
  const [AllApplication, setAllApplication] = useState([]);

  const GetAllData = async () => {
    try {
      const response = await getReq("/auth/all-application");
      setAllApplication(response?.data?.response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    GetAllData();
  }, []);

  return (
    <div>
      <table className="w-[80vw] m-auto bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-600 text-white text-left">
            <th className="px-6 py-3 text-sm font-semibold uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-sm font-semibold uppercase">
              Sub Category
            </th>
            <th className="px-6 py-3 text-sm font-semibold uppercase">
              Amount
            </th>
            <th className="px-6 py-3 text-sm font-semibold uppercase">Year</th>
          </tr>
        </thead>
        <tbody>
          {AllApplication.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-indigo-100 transition duration-150`}
            >
              <td className="px-6 py-4 text-sm text-gray-700">
                {item.category}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {item.subCategory}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                Rs. {item.amount}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{item.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllApplication;
