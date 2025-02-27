// import React, { useState } from "react";
// import {
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   FormControl,
//   InputLabel,
//   Box,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Importing CSS for the date picker

// const Audit: React.FC = () => {
//   const [taskId, setTaskId] = useState<string>("");
//   const [assignedPerson, setAssignedPerson] = useState<string>("");
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [status, setStatus] = useState<string>("");

//   const [auditData, setAuditData] = useState<any[]>([]); // Mock audit data

//   const handleTaskIdChange = (event: any) => setTaskId(event.target.value);
//   const handleAssignedPersonChange = (event: any) =>
//     setAssignedPerson(event.target.value);
//   const handleStatusChange = (event: any) => setStatus(event.target.value);

//   const handleStartDateChange = (date: Date | null) => setStartDate(date);
//   const handleEndDateChange = (date: Date | null) => setEndDate(date);

//   const generateAuditReport = () => {
//     // Simulating fetching filtered audit data based on the filters
//     setAuditData([
//       {
//         task: "Task 1",
//         status: "Pending",
//         assignedPerson: "John",
//         date: "2025-01-15",
//         actionTaken: "Review pending",
//       },
//       {
//         task: "Task 2",
//         status: "Completed",
//         assignedPerson: "Alice",
//         date: "2025-01-16",
//         actionTaken: "Approved",
//       },
//       {
//         task: "Task 3",
//         status: "Pending",
//         assignedPerson: "Bob",
//         date: "2025-01-17",
//         actionTaken: "Review pending",
//       },
//     ]);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Typography variant="h4" gutterBottom>
//         Auditing Dashboard
//       </Typography>

//       {/* Filter Section */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <FormControl fullWidth>
//             <InputLabel>Task ID</InputLabel>
//             <TextField value={taskId} onChange={handleTaskIdChange} fullWidth />
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <FormControl fullWidth>
//             <InputLabel>Assigned Person</InputLabel>
//             <Select
//               value={assignedPerson}
//               onChange={handleAssignedPersonChange}
//               fullWidth
//             >
//               <MenuItem value="John">John</MenuItem>
//               <MenuItem value="Alice">Alice</MenuItem>
//               <MenuItem value="Bob">Bob</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <FormControl fullWidth>
//             <InputLabel>Start Date</InputLabel>
//             <DatePicker
//               selected={startDate}
//               onChange={handleStartDateChange}
//               dateFormat="yyyy-MM-dd"
//               placeholderText="Select start date"
//               className="react-datepicker__input-text"
//               wrapperClassName="react-datepicker-wrapper"
//             />
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <FormControl fullWidth>
//             <InputLabel>End Date</InputLabel>
//             <DatePicker
//               selected={endDate}
//               onChange={handleEndDateChange}
//               dateFormat="yyyy-MM-dd"
//               placeholderText="Select end date"
//               className="react-datepicker__input-text"
//               wrapperClassName="react-datepicker-wrapper"
//             />
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <FormControl fullWidth>
//             <InputLabel>Status</InputLabel>
//             <Select value={status} onChange={handleStatusChange} fullWidth>
//               <MenuItem value="Completed">Completed</MenuItem>
//               <MenuItem value="Pending">Pending</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {/* Generate Audit Report Button */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={generateAuditReport}
//         style={{ marginTop: "20px" }}
//       >
//         Generate Audit Report
//       </Button>

//       {/* Audit Logs/Report Display Section */}
//       {auditData.length > 0 && (
//         <div style={{ marginTop: "30px" }}>
//           <Typography variant="h6">Audit Log</Typography>
//           <table>
//             <thead>
//               <tr>
//                 <th>Task</th>
//                 <th>Status</th>
//                 <th>Assigned Person</th>
//                 <th>Date</th>
//                 <th>Action Taken</th>
//               </tr>
//             </thead>
//             <tbody>
//               {auditData.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.task}</td>
//                   <td>{item.status}</td>
//                   <td>{item.assignedPerson}</td>
//                   <td>{item.date}</td>
//                   <td>{item.actionTaken}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Audit Actions Section */}
//       <Box mt={5}>
//         <Typography variant="h6" gutterBottom>
//           Audit Actions
//         </Typography>
//         <Card>
//           <CardContent>
//             <FormControlLabel
//               control={<Checkbox />}
//               label="Approve All Pending Tasks"
//             />
//             <FormControlLabel control={<Checkbox />} label="Reject All Tasks" />
//             <Button
//               variant="contained"
//               color="success"
//               style={{ marginTop: "20px" }}
//             >
//               Approve Selected Tasks
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               style={{ marginTop: "20px", marginLeft: "10px" }}
//             >
//               Reject Selected Tasks
//             </Button>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Optional Chart/Visualizations */}
//       <div style={{ marginTop: "30px" }}>
//         <Typography variant="h6">Audit Data Visualization</Typography>
//         {/* Bar chart could be added here */}
//       </div>
//     </div>
//   );
// };

// export default Audit;

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";

interface Entity {
  id: number;
  name: string;
  type: string;
  industry: string;
  country: string;
  contact_email: string;
}

interface ESGData {
  id: number;
  entityId: number;
  category: string;
  value: string;
  unit: string;
  reportingPeriod: string;
  standard?: string;
  reviewed?: boolean;
}

interface AuditLog {
  id: number;
  entityName: string;
  action: string;
  timestamp: string;
  user: string;
}

const EntityConfig: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>([
    {
      id: 1,
      name: "Company A",
      type: "Corporate",
      industry: "Tech",
      country: "USA",
      contact_email: "contact@companya.com",
    },
  ]);
  const [esgData, setEsgData] = useState<ESGData[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<number>(0);
  const [selectedStandard, setSelectedStandard] = useState<string>("");
  const [filteredReports, setFilteredReports] = useState<ESGData[]>([]);

  const mockUser = "Admin User"; // Simulating a logged-in user

  const logAction = (entityName: string, action: string) => {
    setAuditLogs((prevLogs) => [
      ...prevLogs,
      {
        id: prevLogs.length + 1,
        entityName,
        action,
        timestamp: new Date().toLocaleString(),
        user: mockUser,
      },
    ]);
  };

  const handleAddESGData = () => {
    const newData: ESGData = {
      id: esgData.length + 1,
      entityId: 1, // Mock entity ID for now
      category: "Carbon Emissions",
      value: "100 tons",
      unit: "tons",
      reportingPeriod: "2024",
      standard: "CSRD",
      reviewed: false,
    };
    setEsgData([...esgData, newData]);
    logAction("Company A", "Added ESG Data: Carbon Emissions - 100 tons");
  };

  const handleGenerateReport = () => {
    const reports = esgData.filter(
      (data) =>
        (selectedEntity === 0 || data.entityId === selectedEntity) &&
        (selectedStandard === "" || data.standard === selectedStandard)
    );
    setFilteredReports(reports);
    logAction("System", "Generated ESG Report");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Auditing
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddESGData}
        sx={{ mt: 2 }}
      >
        Add ESG Data (Mock)
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGenerateReport}
        sx={{ mt: 2, ml: 2 }}
      >
        Generate Report (Mock)
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Audit Log
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Entity</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.entityName}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EntityConfig;
