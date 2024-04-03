import React, { useState } from "react";

// Your existing imports
import { Listbox, ListboxItem } from "@nextui-org/react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { ListboxWrapper } from "../components/ListboxWrapper";

// Import the LoginForm component (make sure to create this component as described)
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
  const [isRegistering, setIsRegistering] = useState(false);
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const login = (email, password) => {
    console.log("Login attempt with:", email, password);
    // Placeholder for actual authentication logic
    setIsLoggedIn(true); // Simulate successful login
  };
  
  const register = (email, password) => {
    console.log("Registration attempt with:", email, password);
    // Add your registration logic here
	setIsLoggedIn(true); // Simulate successful login
  };

  if (!isLoggedIn) {
    return (
      <main className="p-5 flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          {!isRegistering ? (
            <>
              <LoginForm onLogin={login} />
              <button
                onClick={() => setIsRegistering(true)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <RegisterForm onRegister={register} />
              <button
                onClick={() => setIsRegistering(false)}
                className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Back to Login
              </button>
            </>
          )}
        </div>
      </main>
    );
}

  return (
    <main className="p-5">
      <h1 className="text-center text-3xl">StudySprint</h1>
      <div className="flex flex-col md:flex-row gap-5 mt-5">
        {/* Timer card */}
        <Card className="flex-1" style={{ flexGrow: 1.7 }}>
          <CardBody className="items-center">
            <h1 className="text-center text-large mb-11">Timer Card</h1>
            <CountdownCircleTimer
              size={260}
              isPlaying={true}
              duration={60}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
            <p className="text-center">
              Make beautiful websites regardless of your design experience.
            </p>
          </CardBody>
        </Card>

        {/* Tasks Card */}
        <div className="flex flex-col flex-1 gap-5">
          <Card>
            <h1 className="text-center mt-2 text-large">Select a Task</h1>
            <CardBody className="items-center">
              <div>
                <ListboxWrapper style={{ width: "100%" }}>
                  <Listbox
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                  >
                    <ListboxItem key="l1">CPSC471</ListboxItem>
                    <ListboxItem key="l2">Business</ListboxItem>
                    <ListboxItem key="l3">SENG300</ListboxItem>
                    <ListboxItem key="l4">Single Date</ListboxItem>
                    <ListboxItem key="l5">Iteration</ListboxItem>
                  </Listbox>
                </ListboxWrapper>
                <p className="text-small text-default-500">
                  Selected value: {selectedValue}
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Goal Card */}
          <Card>
            <h1 className="text-center mt-2 text-large">Daily Goal</h1>
            <p className="text-center text-default-500 text-small">
              Completed: 0 minutes
            </p>
            <CardBody>
              <p>Placeholder text</p>
              <CardFooter>Placeholder text</CardFooter>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default Home;
