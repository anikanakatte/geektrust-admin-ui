import "./App.css";
import Dashboard from "./components/Dashboard";

export const config = {
  endpoint:
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
};

export default function App() {
  return (
    <div className="container">
      <Dashboard />
    </div>
  );
}
