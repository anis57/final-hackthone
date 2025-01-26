import { useState } from "react";
import { categories } from "../../utils/category"; 
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [deposit, setDeposit] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [estimatedLoan, setEstimatedLoan] = useState(null);

  const navigate = useNavigate()
  
  const calculateLoan = () => {
    if (!deposit || !loanPeriod) {
      alert("Please fill all fields.");
      return;
    }
    const loanAmount = parseFloat(deposit) * parseFloat(loanPeriod) * 0.1;
    setEstimatedLoan(loanAmount.toFixed(2));
  };

  return (
    <div className="h-screen bg-gray-50 p-4">
      <section className="my-8">
        <h2 className="text-xl font-semibold mb-4">Loan Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, index) => (
            <div key={index} className="bg-white shadow rounded p-4">
              <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
              <div className="flex items-center  justify-between">
                <ul className="text-sm text-gray-600">
                  {cat.subcategories.map((sub, subIndex) => (
                    <li key={subIndex} className="list-disc ml-4">
                      {sub}
                    </li>
                  ))}
                </ul>
                <button
                  className=" p-3 px-6 rounded-md text-white
                   bg-blue-500 hover:bg-blue-600 focus:outline-none
                    focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => navigate('/login')}
                >
                  Proceed
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 shadow rounded-md">
        <h2 className="text-xl font-semibold mb-4">Loan Calculator</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Category
            </label>
            <select
              className="w-full border rounded p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Select Subcategory
            </label>
            <select
              className="w-full border rounded p-2"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              disabled={!category}
            >
              <option value="">Choose Subcategory</option>
              {category &&
                categories
                  .find((cat) => cat.name === category)
                  ?.subcategories.map((sub, index) => (
                    <option key={index} value={sub}>
                      {sub}
                    </option>
                  ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Initial Deposit
            </label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Loan Period (Years)
            </label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={calculateLoan}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Calculate Loan
        </button>

        {estimatedLoan && (
          <div className="mt-4 bg-green-100 p-4 rounded">
            <p className="font-semibold">Estimated Loan: ${estimatedLoan}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;