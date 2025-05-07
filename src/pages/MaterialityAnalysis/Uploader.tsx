// import React, { useEffect, useState } from "react";
// // import * as XLSX from "xlsx";
// import {
//   Container,
//   Typography,
//   // Stack,
//   Fade,
//   Box,
//   // Tabs,Fade
// } from "@mui/material";
// import { Tabs } from "../../components";
// import { DataPoints } from "./Details";
// import { ImportExport } from "./ImportExport";
// import { Overview } from "./Overview";
// import { RootState } from "../../types";
// import { useSelector } from "react-redux";

/**

export const MaterialityUploader: React.FC = () => {
  const [dataInsideOut, setDataInsideOut] = useState<any[]>([]);

  const [dataOutsideIn, setDataOutsideIn] = useState<any[]>([]);

  const [tab, setTab] = useState<number>(0);

  // const groupedData: Record<string, Record<string, any[]>> = {};
  // data.forEach((row) => {
  //   const main = row["Main topic"] || "Uncategorized";
  //   const sub = row["Subtopic"] || "General";
  //   if (!groupedData[main]) groupedData[main] = {};
  //   if (!groupedData[main][sub]) groupedData[main][sub] = [];
  //   groupedData[main][sub].push(row);
  // });

  const entityId = useSelector((state: RootState) => state.user.activeEntityId);

  // TODO: move to saga
  useEffect(() => {
    fetch(`http://localhost:3005/api/materiality/entity/${entityId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // Attach the JWT token
      },
      //   body: JSON.stringify(data),
      // signal: controller.signal,
    })
      .then((res) => res.json())
      .then(({ summary, info }) => {
        console.log("show the data: ", info);

        let outsideIn: any[] = [];
        let insideOut: any[] = [];

        let id = 0;

        normalize(info, []);

        setDataInsideOut(insideOut);
        setDataOutsideIn(outsideIn);

        // console.log("yaki: ", outsideIn);

        function normalize(arr: any[], superTopics: string[]) {
          arr.forEach((e) => {
            if (e.children) {
              //
              normalize(e.children, superTopics.concat(e.topic));
            } else {
              //
              // console.log("adding --- ", superTopics, e);

              let outsideInData: any = { id };
              let insideOutData: any = { id };

              id++;

              const topics = superTopics.concat(e.topic);

              // if (superTopics)

              for (let i = 0; i < topics.length; i++) {
                switch (i) {
                  case 1:
                    outsideInData["Main topic"] = topics[i];
                    insideOutData["Main topic"] = topics[i];
                    break;
                  case 2:
                    outsideInData.Subtopic = topics[i];
                    insideOutData.Subtopic = topics[i];
                    break;
                  case 3:
                    outsideInData["Sub-subtopic"] = topics[i];
                    insideOutData["Sub-subtopic"] = topics[i];
                    break;
                  default:
                    break;
                }
              }

              if (id === 2) {
                console.log("dokusen ======= ", e);
              }

              const {
                first_name: a,
                last_name: b,
                topic_id: c,
                perspective: d,
                ...restOutsideIn
              } = e.outsideIn;

              Object.entries(restOutsideIn).forEach(([key, value]) => {
                const parsed = parseFloat(value);
                if (isNaN(parsed)) return;
                restOutsideIn[key] = parsed;
              });

              outsideInData = { ...outsideInData, ...restOutsideIn };

              const {
                first_name: a0,
                last_name: b0,
                topic_id: c0,
                perspective: d0,
                ...restInsideOut
              } = e.outsideIn;

              Object.entries(restInsideOut).forEach(([key, value]) => {
                const parsed = parseFloat(value);
                if (isNaN(parsed)) return;
                restInsideOut[key] = parsed;
              });

              insideOutData = { ...insideOutData, ...restInsideOut };

              // console.log("tanaka---", outsideInData);

              // -------
              //               insideOutData["Actually/Potentially"] =
              //                 e.insideOut.actually_potentially;
              //               insideOutData["Affected stakeholders"] =
              //                 e.insideOut.affected_stakeholders;
              //               // insideOutData['Actually/Potentially'] = e.insideOut.actually_potentially Calculation of extent, scope, reversibility for graphics

              //               insideOutData[
              //                 `Definition "I" or "R" or "O"
              // `
              //               ] = e.insideOut.definition;
              //               insideOutData["Financial Risk"] = parseInt(
              //                 e.insideOut.financial_risk
              //               );
              //               insideOutData["IRO"] = e.insideOut.iro;

              // insideOutData["Actually/Potentially"] =
              //   e.insideOut.actually_potentially;
              // insideOutData["Actually/Potentially"] =
              //   e.insideOut.actually_potentially;
              // insideOutData["Actually/Potentially"] =
              //   e.insideOut.actually_potentially;

              // insideOutData["Actually/Potentially"] =
              //   e.insideOut.actually_potentially;
              // insideOutData["Actually/Potentially"] =
              //   e.insideOut.actually_potentially;
              // insideOutData["Actually/Potentially"] =
              //   e.insideOut.actually_potentially;
              // -------

              // outsideInData["Financial Risk"] = restOutsideIn.financial_risk;
              // outsideInData["Stakeholder Importance"] =
              //   restOutsideIn.stakeholder_importance;
              // outsideInData["Impact Score"] = restOutsideIn.impact_score;

              // console.log("yes: ", outsideInData);

              outsideIn.push(outsideInData);
              insideOut.push(insideOutData);

              // if (superTopics.length >= )
            }
          });
        }
      });
  }, [entityId]);

  // console.log("auth... ", auth);

  console.log("data in out: ", dataOutsideIn);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Materiality Analysis
      </Typography>

      <Tabs
        value={tab}
        onChange={(value) => setTab(value)}
        labels={["Overview", "Details", "Import / Export"]}
      />

      <Box sx={{ p: 3 }}>
        <Fade in={tab === 0} timeout={300}>
          <Container style={{ display: tab === 0 ? "block" : "none" }}>
            <Overview
              dataInsideOut={dataInsideOut}
              dataOutsideIn={dataOutsideIn}
            />
          </Container>
        </Fade>
        <Fade in={tab === 1} timeout={300}>
          <Container style={{ display: tab === 1 ? "block" : "none" }}>
            <DataPoints
              dataInsideOut={dataInsideOut}
              setDataInsideOut={setDataInsideOut}
              dataOutsideIn={dataOutsideIn}
              setDataOutsideIn={setDataOutsideIn}
            />
          </Container>
        </Fade>
        <Fade in={tab === 2} timeout={300}>
          <Container style={{ display: tab === 2 ? "block" : "none" }}>
            <ImportExport
              dataInsideOut={dataInsideOut}
              setDataInsideOut={setDataInsideOut}
              dataOutsideIn={dataOutsideIn}
              setDataOutsideIn={setDataOutsideIn}
              onImportComplete={() => setTab(0)}
            />
          </Container>
        </Fade>
      </Box>
    </Container>
  );
};

*/

// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   Fade,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { Tabs } from "../../components";
// import { DataPoints } from "./Details";
// import { ImportExport } from "./ImportExport";
// import { Overview } from "./Overview";
// import { RootState } from "../../types";
// import { useSelector } from "react-redux";

// export const MaterialityUploader: React.FC = () => {
//   const [dataInsideOut, setDataInsideOut] = useState<any[]>([]);
//   const [dataOutsideIn, setDataOutsideIn] = useState<any[]>([]);
//   const [tab, setTab] = useState<number>(0);
//   const [stakeholders, setStakeholders] = useState<any[]>([]);
//   const [selectedStakeholder, setSelectedStakeholder] = useState<string>("");

//   const entityId = useSelector((state: RootState) => state.user.activeEntityId);

//   useEffect(() => {
//     if (!entityId) return;

//     fetch(`http://localhost:3005/api/stakeholders/${entityId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setStakeholders(data);
//         if (data.length > 0) setSelectedStakeholder(data[0].id);
//       });
//   }, [entityId]);

//   useEffect(() => {
//     if (!entityId || !selectedStakeholder) return;

//     fetch(
//       `http://localhost:3005/api/materiality/entity/${entityId}/stakeholder/${selectedStakeholder}`
//     )
//       .then((res) => res.json())
//       .then(({ summary, info }) => {
//         let outsideIn: any[] = [];
//         let insideOut: any[] = [];
//         let id = 0;

//         function normalize(arr: any[], superTopics: string[]) {
//           arr.forEach((e) => {
//             if (e.children) {
//               normalize(e.children, superTopics.concat(e.topic));
//             } else {
//               let outsideInData: any = { id };
//               let insideOutData: any = { id };
//               id++;

//               const topics = superTopics.concat(e.topic);

//               for (let i = 0; i < topics.length; i++) {
//                 switch (i) {
//                   case 1:
//                     outsideInData["Main topic"] = topics[i];
//                     insideOutData["Main topic"] = topics[i];
//                     break;
//                   case 2:
//                     outsideInData.Subtopic = topics[i];
//                     insideOutData.Subtopic = topics[i];
//                     break;
//                   case 3:
//                     outsideInData["Sub-subtopic"] = topics[i];
//                     insideOutData["Sub-subtopic"] = topics[i];
//                     break;
//                   default:
//                     break;
//                 }
//               }

//               outsideIn.push(outsideInData);
//               insideOut.push(insideOutData);
//             }
//           });
//         }

//         normalize(info, []);
//         setDataInsideOut(insideOut);
//         setDataOutsideIn(outsideIn);
//       });
//   }, [entityId, selectedStakeholder]);

//   return (
//     <Container maxWidth="xl" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Materiality Analysis
//       </Typography>

//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Stakeholder</InputLabel>
//         <Select
//           value={selectedStakeholder}
//           label="Stakeholder"
//           onChange={(e) => setSelectedStakeholder(e.target.value)}
//         >
//           {stakeholders.map((stakeholder) => (
//             <MenuItem key={stakeholder.id} value={stakeholder.id}>
//               {stakeholder.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <Tabs
//         value={tab}
//         onChange={(value) => setTab(value)}
//         labels={["Overview", "Details", "Import / Export"]}
//         // disabled={["Import / Export"]}
//       />

//       <Box sx={{ p: 3 }}>
//         <Fade in={tab === 0} timeout={300}>
//           <Container style={{ display: tab === 0 ? "block" : "none" }}>
//             <Overview
//               dataInsideOut={dataInsideOut}
//               dataOutsideIn={dataOutsideIn}
//             />
//           </Container>
//         </Fade>
//         <Fade in={tab === 1} timeout={300}>
//           <Container style={{ display: tab === 1 ? "block" : "none" }}>
//             <DataPoints
//               dataInsideOut={dataInsideOut}
//               setDataInsideOut={setDataInsideOut}
//               dataOutsideIn={dataOutsideIn}
//               setDataOutsideIn={setDataOutsideIn}
//             />
//           </Container>
//         </Fade>
//         <Fade in={tab === 2} timeout={300}>
//           <Container style={{ display: tab === 2 ? "block" : "none" }}>
//             <ImportExport
//               dataInsideOut={dataInsideOut}
//               setDataInsideOut={setDataInsideOut}
//               dataOutsideIn={dataOutsideIn}
//               setDataOutsideIn={setDataOutsideIn}
//               onImportComplete={() => setTab(0)}
//             />
//           </Container>
//         </Fade>
//       </Box>
//     </Container>
//   );
// };

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Fade,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Tabs } from "../../components";
import { DataPoints } from "./Details";
import { ImportExport } from "./ImportExport";
import { Overview } from "./Overview";
import { RootState } from "../../types";
import { useSelector } from "react-redux";

export const MaterialityUploader: React.FC = () => {
  const [dataInsideOut, setDataInsideOut] = useState<any[]>([]);
  const [dataOutsideIn, setDataOutsideIn] = useState<any[]>([]);
  const [tab, setTab] = useState<number>(0);
  const [stakeholders, setStakeholders] = useState<any[]>([]);
  const [selectedStakeholder, setSelectedStakeholder] = useState<string>("");

  const entityId = useSelector((state: RootState) => state.user.activeEntityId);

  useEffect(() => {
    if (!entityId) return;

    fetch(`http://localhost:3005/api/stakeholders/${entityId}`)
      .then((res) => res.json())
      .then((data) => {
        setStakeholders(data);
        if (data.length > 0) setSelectedStakeholder(data[0].id);
      });
  }, [entityId]);

  useEffect(() => {
    if (!entityId || !selectedStakeholder) return;

    console.log("attempt this: ", selectedStakeholder, entityId);

    fetch(
      `http://localhost:3005/materiality/${entityId}/${selectedStakeholder}`
    )
      .then((res) => res.json())
      .then((nestedData) => {
        const flatData = flattenMateriality(nestedData);
        setDataInsideOut(flatData);
        setDataOutsideIn(flatData);
      })
      .catch((err) => console.error("Error fetching materiality data:", err));
  }, [entityId, selectedStakeholder]);

  const flattenMateriality = (data: Record<string, any>) => {
    const result: any[] = [];
    for (const mainTopic in data) {
      const subtopics = data[mainTopic];
      for (const subtopic in subtopics) {
        const subsubtopics = subtopics[subtopic];
        for (const key in subsubtopics) {
          const entry = subsubtopics[key];
          result.push({
            "Main topic": mainTopic,
            Subtopic: subtopic === "__self__" ? null : subtopic,
            ...entry,
          });
        }
      }
    }
    return result;
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Materiality Analysis
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Stakeholder</InputLabel>
        <Select
          value={selectedStakeholder}
          label="Stakeholder"
          onChange={(e) => setSelectedStakeholder(e.target.value)}
        >
          {stakeholders.map((stakeholder) => (
            <MenuItem key={stakeholder.id} value={stakeholder.id}>
              {stakeholder.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Tabs
        value={tab}
        onChange={(value) => setTab(value)}
        labels={["Overview", "Details", "Import / Export"]}
      />

      <Box sx={{ p: 3 }}>
        <Fade in={tab === 0} timeout={300}>
          <Container style={{ display: tab === 0 ? "block" : "none" }}>
            <Overview
              dataInsideOut={dataInsideOut}
              dataOutsideIn={dataOutsideIn}
            />
          </Container>
        </Fade>
        <Fade in={tab === 1} timeout={300}>
          <Container style={{ display: tab === 1 ? "block" : "none" }}>
            <DataPoints
              dataInsideOut={dataInsideOut}
              setDataInsideOut={setDataInsideOut}
              dataOutsideIn={dataOutsideIn}
              setDataOutsideIn={setDataOutsideIn}
            />
          </Container>
        </Fade>
        <Fade in={tab === 2} timeout={300}>
          <Container style={{ display: tab === 2 ? "block" : "none" }}>
            <ImportExport
              dataInsideOut={dataInsideOut}
              setDataInsideOut={setDataInsideOut}
              dataOutsideIn={dataOutsideIn}
              setDataOutsideIn={setDataOutsideIn}
              onImportComplete={() => setTab(0)}
            />
          </Container>
        </Fade>
      </Box>
    </Container>
  );
};
