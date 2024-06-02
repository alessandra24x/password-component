import "./App.css";
import PasswordValidator from "./Password";
import { PasswordRequirement } from "./utils/validatePassword";

function App() {
  const passwordReqs: PasswordRequirement[] = [
    "specialChar",
    "digit",
    "uppercase",
    "noConsecutive",
  ];

  return <PasswordValidator options={passwordReqs} />;
}

export default App;
