// import React, { useState } from "react";
// import { Paper, Typography, Box, Stack, TextField } from "@mui/material";
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   ZAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface Props {
//   dataInsideOut: any[];
//   dataOutsideIn: any[];
// }

// export function Matrix({ dataInsideOut, dataOutsideIn }: Props) {
//   const [filterCategory, setFilterCategory] = useState<string | null>(null);
//   const [filterSource, setFilterSource] = useState<string>("All");
//   const [selectedStakeholder, setSelectedStakeholder] = useState<string>("All");

//   const combinedData = [
//     ...(filterSource === "All" || filterSource === "Inside-Out"
//       ? dataInsideOut
//       : []),
//     ...(filterSource === "All" || filterSource === "Outside-In"
//       ? dataOutsideIn
//       : []),
//   ];

//   return (
//     <Paper sx={{ p: 2, overflowX: "auto" }}>
//       <Typography variant="h6" gutterBottom>
//         Materiality Matrix
//       </Typography>

//       <Stack direction="row" spacing={2} sx={{ my: 2 }}>
//         <TextField
//           select
//           label="Data Source"
//           value={filterSource}
//           onChange={(e) => setFilterSource(e.target.value)}
//           SelectProps={{ native: true }}
//           sx={{ width: 200 }}
//         >
//           <option value="All">All</option>
//           <option value="Inside-Out">Inside-Out</option>
//           <option value="Outside-In">Outside-In</option>
//         </TextField>

//         <TextField
//           select
//           label="Filter ESG Category"
//           value={filterCategory ?? "All"}
//           onChange={(e) =>
//             setFilterCategory(e.target.value === "All" ? null : e.target.value)
//           }
//           SelectProps={{ native: true }}
//           sx={{ width: 200 }}
//         >
//           <option value="All">All</option>
//           <option value="E">Environment (E)</option>
//           <option value="S">Social (S)</option>
//           <option value="G">Governance (G)</option>
//         </TextField>

//         <TextField
//           select
//           label="Stakeholder"
//           value={selectedStakeholder}
//           onChange={(e) => setSelectedStakeholder(e.target.value)}
//           SelectProps={{ native: true }}
//           sx={{ width: 200 }}
//         >
//           <option value="All">All</option>
//           <option value="Investor">Investor</option>
//           <option value="Customer">Customer</option>
//           <option value="Employee">Employee</option>
//           <option value="Regulator">Regulator</option>
//         </TextField>
//       </Stack>

//       <Box sx={{ minWidth: 600 }}>
//         <ResponsiveContainer width="100%" height={400}>
//           <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//             <CartesianGrid />
//             <XAxis
//               type="number"
//               dataKey="Financial Risk"
//               name="Financial Risk"
//               domain={[0, 10]}
//               label={{
//                 value: "Financial Risk",
//                 position: "insideBottom",
//                 offset: -5,
//               }}
//             />
//             <YAxis
//               type="number"
//               dataKey="Stakeholder Importance"
//               name="Stakeholder Importance"
//               domain={[0, 10]}
//               label={{
//                 value: "Stakeholder Importance",
//                 angle: -90,
//                 position: "insideLeft",
//               }}
//             />
//             <ZAxis
//               dataKey="Impact Score"
//               range={[60, 200]}
//               name="Impact Score"
//             />
//             <Tooltip
//               cursor={{ strokeDasharray: "3 3" }}
//               content={({ active, payload }) => {
//                 if (active && payload && payload.length) {
//                   const d = payload[0].payload;

//                   console.log("show the d -------> ", d);

//                   return (
//                     <Paper sx={{ p: 1 }}>
//                       <Typography variant="subtitle2">
//                         <strong>{d["Main topic"]}</strong>
//                       </Typography>
//                       {d["Subtopic"] && <div>Subtopic: {d["Subtopic"]}</div>}
//                       {d["Sub-subtopic"] && (
//                         <div>Sub-subtopic: {d["Sub-subtopic"]}</div>
//                       )}
//                       <div>Impact Score: {d["Impact Score"]}</div>
//                       <div>Financial Risk: {d["Financial Risk"]}</div>
//                       <div>
//                         Stakeholder Importance: {d["Stakeholder Importance"]}
//                       </div>
//                       <div>Stakeholder: {d["Stakeholder"]}</div>
//                     </Paper>
//                   );
//                 }
//                 return null;
//               }}
//             />
//             {["E", "S", "G"].map((prefix, idx) => (
//               <Scatter
//                 key={prefix}
//                 name={`Category ${prefix}`}
//                 data={combinedData.filter(
//                   (d) =>
//                     d.ESRS?.startsWith(prefix) &&
//                     d["Impact Score"] != null &&
//                     d["Financial Risk"] != null &&
//                     d["Stakeholder Importance"] != null &&
//                     (!filterCategory || d.ESRS?.startsWith(filterCategory)) &&
//                     (selectedStakeholder === "All" ||
//                       d.Stakeholder === selectedStakeholder)
//                 )}
//                 fill={["#1976d2", "#d32f2f", "#388e3c"][idx]}
//               />
//             ))}
//           </ScatterChart>
//         </ResponsiveContainer>
//       </Box>
//     </Paper>
//   );
// }

import React, { useState } from "react";
import { Paper, Typography, Box, Stack, TextField } from "@mui/material";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  dataInsideOut: any[];
  dataOutsideIn: any[];
}

export function Matrix({ dataInsideOut, dataOutsideIn }: Props) {
  const [filterSource, setFilterSource] = useState<string>("All");
  // const [selectedStakeholder, setSelectedStakeholder] = useState<string>("All");

  const combinedData = [
    ...(filterSource === "All" || filterSource === "Inside-Out"
      ? dataInsideOut
      : []),
    ...(filterSource === "All" || filterSource === "Outside-In"
      ? dataOutsideIn
      : []),
  ];

  return (
    <Paper sx={{ p: 2, overflowX: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Materiality Matrix
      </Typography>

      <Stack direction="row" spacing={2} sx={{ my: 2 }}>
        <TextField
          select
          label="Data Source"
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          SelectProps={{ native: true }}
          sx={{ width: 200 }}
        >
          <option value="All">All</option>
          <option value="Inside-Out">Inside-Out</option>
          <option value="Outside-In">Outside-In</option>
        </TextField>
      </Stack>

      <Box sx={{ minWidth: 600 }}>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="financial_risk"
              name="Financial Risk"
              domain={[0, 10]}
              label={{
                value: "Financial Risk",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              type="number"
              dataKey="stakeholder_importance"
              name="Stakeholder Importance"
              domain={[0, 10]}
              label={{
                value: "Stakeholder Importance",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <ZAxis
              dataKey="impact_score"
              range={[60, 200]}
              name="Impact Score"
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <Paper sx={{ p: 1 }}>
                      <Typography variant="subtitle2">
                        <strong>{d["Main topic"]}</strong>
                      </Typography>
                      {d["Subtopic"] && <div>Subtopic: {d["Subtopic"]}</div>}
                      {d["Sub-subtopic"] && (
                        <div>Sub-subtopic: {d["Sub-subtopic"]}</div>
                      )}
                      <div>Impact Score: {d["impact_score"]}</div>
                      <div>Financial Risk: {d["financial_risk"]}</div>
                      <div>
                        Stakeholder Importance: {d["stakeholder_importance"]}
                      </div>
                      <div>Perspective: {d["perspective"]}</div>
                    </Paper>
                  );
                }
                return null;
              }}
            />

            {combinedData.length > 0 && (
              <Scatter
                name="Materiality Data"
                data={combinedData.filter(
                  (d) =>
                    d["impact_score"] != null &&
                    d["financial_risk"] != null &&
                    d["stakeholder_importance"] != null
                )}
                fill="#1976d2"
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
