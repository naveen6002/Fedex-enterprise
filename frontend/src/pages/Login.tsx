import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <button
          onClick={() => navigate("/fedex/dashboard")}
          className="w-full bg-blue-600 text-white p-2 rounded mb-3"
        >
          FedEx Admin Login
        </button>

        <button
          onClick={() => navigate("/dca/dashboard")}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          DCA Login
        </button>
      </div>
    </div>
  );
}
