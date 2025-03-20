// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import Audit from "./pages/Auditing";
// import Authentication from "./pages/Authentication";
// import Dashboard from "./pages/Dashboard";
// // import { Dashboard } from "@mui/icons-material";

// function App() {
//   // const [count, setCount] = useState(0);

//   return (
//     <>
//       {/* <div>Hello World</div> */}

//       {/* <Audit /> */}

//       <Dashboard />

//       {/* <Authentication type={"login"} onSubmit={() => {}} /> */}

//       {/* <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p> */}
//     </>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
// import EntityConfig from "./pages/EntityConfig";
// import Procedures from "./pages/Procedures";
// import DataAggregation from "./pages/DataAggregation";
// import DataConsolidation from "./pages/DataConsolidation";
// import ReportingEngine from "./pages/ReportingEngine";
// import Auditing from "./pages/Auditing";
// import Publication from "./pages/Publication";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             ESG Reporting Accelerator
//           </Typography>
//           <Button color="inherit" component={Link} to="/entity-config">
//             Entity Config
//           </Button>
//           <Button color="inherit" component={Link} to="/procedures">
//             Procedures
//           </Button>
//           <Button color="inherit" component={Link} to="/data-aggregation">
//             Data Aggregation
//           </Button>
//           <Button color="inherit" component={Link} to="/data-consolidation">
//             Data Consolidation
//           </Button>
//           <Button color="inherit" component={Link} to="/reporting-engine">
//             Reporting
//           </Button>
//           <Button color="inherit" component={Link} to="/auditing">
//             Auditing
//           </Button>
//           <Button color="inherit" component={Link} to="/publication">
//             Publication
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Container>
//         <Routes>
//           <Route path="/entity-config" element={<EntityConfig />} />
//           <Route path="/procedures" element={<Procedures />} />
//           <Route path="/data-aggregation" element={<DataAggregation />} />
//           <Route path="/data-consolidation" element={<DataConsolidation />} />
//           <Route path="/reporting-engine" element={<ReportingEngine />} />
//           <Route path="/auditing" element={<Auditing />} />
//           <Route path="/publication" element={<Publication />} />
//           <Route
//             path="/"
//             element={
//               <Typography variant="h4">
//                 Welcome to ESG Reporting Accelerator
//               </Typography>
//             }
//           />
//         </Routes>
//       </Container>
//     </Router>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
} from "@mui/material";
import { Provider, useDispatch } from "react-redux";
// import store from "./reducer";
import EntityConfig from "./pages/EntityConfig";
import Procedures from "./pages/Procedures";
import DataAggregation from "./pages/DataAggregation";
import DataConsolidation from "./pages/DataConsolidation";
import ReportingEngine from "./pages/ReportingEngine";
import Auditing from "./pages/Auditing";
import Publication from "./pages/Publication";
import AuthForms from "./pages/AuthForms";
import Dashboard from "./pages/Dashboard";
import { loginRequest } from "./actions";
// import { Dashboard } from "@mui/icons-material";
// import { Dashboard } from "@mui/icons-material";

const App: React.FC = () => {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(loginRequest({ email: "user97@example.com", password: "hello" }));
  }, [dispath]);

  return (
    // <Provider store={store}>
    <Router>
      <AppBar position="static" color="primary" sx={{ width: "100vw" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ESG Reporting Accelerator
          </Typography> */}
          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="logos/full.png"
              alt="ESG Logo"
              style={{ height: "40px", marginRight: "16px" }} // Adjust height/margin as needed
            />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ESG Reporting Accelerator
            </Typography>
          </Box> */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="logos/full.png"
              alt="ESG Logo"
              style={{ height: "40px" }}
            />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ESG Reporting Accelerator
            </Typography>
          </Box>

          <Box>
            <Button color="inherit" component={Link} to="/entity-config">
              Entity Config
            </Button>
            <Button color="inherit" component={Link} to="/procedures">
              Procedures
            </Button>
            <Button color="inherit" component={Link} to="/data-aggregation">
              Data Aggregation
            </Button>
            <Button color="inherit" component={Link} to="/data-consolidation">
              Data Consolidation
            </Button>
            <Button color="inherit" component={Link} to="/reporting-engine">
              Reporting
            </Button>
            <Button color="inherit" component={Link} to="/auditing">
              Auditing
            </Button>
            <Button color="inherit" component={Link} to="/publication">
              Publication
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ width: "100%" }}>
        <Routes>
          <Route path="/entity-config" element={<EntityConfig />} />
          <Route path="/procedures" element={<Procedures />} />
          <Route path="/data-aggregation" element={<DataAggregation />} />
          <Route path="/data-consolidation" element={<DataConsolidation />} />
          <Route path="/reporting-engine" element={<ReportingEngine />} />
          <Route path="/auditing" element={<Auditing />} />
          <Route path="/publication" element={<Publication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/"
            element={
              <Typography variant="h4">
                Welcome to ESG Reporting Accelerator Tool
              </Typography>
            }
          />
          <Route path="/auth" element={<AuthForms />} />
        </Routes>
      </Container>
    </Router>
    // </Provider>
  );
};

export default App;
