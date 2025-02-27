import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../reducer";
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

// Action Types
const ADD_ENTITY = "ADD_ENTITY";
const ADD_ESG_DATA = "ADD_ESG_DATA";
const PUBLISH_REPORT = "PUBLISH_REPORT";
const COMPLETE_TASK = "COMPLETE_TASK";

// Action Creators
const addEntity = (entity: any) => ({ type: ADD_ENTITY, payload: entity });
const addEsgData = (data: any) => ({ type: ADD_ESG_DATA, payload: data });
const publishReport = (report: any) => ({
  type: PUBLISH_REPORT,
  payload: report,
});
const completeTask = (taskId: number) => ({
  type: COMPLETE_TASK,
  payload: taskId,
});

const ESGReportingApp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const entities = useSelector((state: RootState) => state.entities);
  const esgData = useSelector((state: RootState) => state.esgData);
  const publishedReports = useSelector(
    (state: RootState) => state.publishedReports
  );
  const pendingTasks = useSelector((state: RootState) => state.pendingTasks);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const handleAddEntity = () => {
    const newEntity = {
      id: entities.length + 1,
      name: "New Company",
      type: "Corporate",
      industry: "Tech",
      country: "USA",
      contact_email: "new@company.com",
    };
    dispatch(addEntity(newEntity));
  };

  const handleAddEsgData = () => {
    const newData = {
      id: esgData.length + 1,
      entityId: 1,
      category: "Carbon Emissions",
      value: "200 tons",
      unit: "tons",
      reportingPeriod: "2025",
      standard: "CSRD",
      reviewed: false,
    };
    dispatch(addEsgData(newData));
  };

  const handlePublishReport = () => {
    if (esgData.length === 0) return;
    const reportToPublish = esgData[0];
    const publishedReport = {
      id: publishedReports.length + 1,
      entityName:
        entities.find((e) => e.id === reportToPublish.entityId)?.name ||
        "Unknown",
      category: reportToPublish.category,
      value: reportToPublish.value,
      reportingPeriod: reportToPublish.reportingPeriod,
      standard: reportToPublish.standard || "None",
      publishedUrl: `https://example.com/reports/${
        publishedReports.length + 1
      }`,
      timestamp: new Date().toLocaleString(),
    };
    dispatch(publishReport(publishedReport));
  };

  const handleCompleteTask = (taskId: number) => {
    dispatch(completeTask(taskId));
  };

  return (
    <Container>
      <Typography variant="h4">ESG Reporting System</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEntity}
        sx={{ mt: 2 }}
      >
        Add Entity
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAddEsgData}
        sx={{ mt: 2, ml: 2 }}
      >
        Add ESG Data
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={handlePublishReport}
        sx={{ mt: 2, ml: 2 }}
      >
        Publish Report
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Entities
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Industry</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Contact Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.map((entity) => (
              <TableRow key={entity.id}>
                <TableCell>{entity.name}</TableCell>
                <TableCell>{entity.type}</TableCell>
                <TableCell>{entity.industry}</TableCell>
                <TableCell>{entity.country}</TableCell>
                <TableCell>{entity.contact_email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Pending Tasks
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  {task.status === "Pending" && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleCompleteTask(task.id)}
                    >
                      Complete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ESGReportingApp;
