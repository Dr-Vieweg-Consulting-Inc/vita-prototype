import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch, publishReport } from "../../reducer";
// import { publishReport } from "../redux/actions";
import {
  Container,
  Typography,
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
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const Publication: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const entities = useSelector((state: RootState) => state.entities);
  const esgData = useSelector((state: RootState) => state.esgData);
  const publishedReports = useSelector(
    (state: RootState) => state.publishedReports
  );
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [selectedReport, setSelectedReport] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handlePublishReport = () => {
    if (currentUser?.role !== "Admin") return;

    const reportToPublish = esgData.find((data) => data.id === selectedReport);
    if (!reportToPublish) return;

    const newPublishedReport = {
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

    dispatch(publishReport(newPublishedReport));
    setOpenSnackbar(true);
  };

  const doubleMaterialityData =
    esgData.length > 0
      ? esgData.map((data, index) => ({
          x: (index + 1) * 10, // Financial Materiality (Placeholder scale)
          y: (index + 1) * 15, // Impact Materiality (Placeholder scale)
          name: data.category,
        }))
      : [
          { x: 20, y: 40, name: "Carbon Emissions" },
          { x: 50, y: 80, name: "Water Usage" },
          { x: 30, y: 60, name: "Energy Efficiency" },
        ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Publication
      </Typography>
      {currentUser?.role === "Admin" && (
        <>
          <Typography variant="h6">Publish ESG Report</Typography>
          <Select
            fullWidth
            value={selectedReport}
            onChange={(e) => setSelectedReport(Number(e.target.value))}
          >
            <MenuItem value={0} disabled>
              Select Report to Publish
            </MenuItem>
            {esgData.map((data) => (
              <MenuItem key={data.id} value={data.id}>
                {`${data.category} - ${data.reportingPeriod}`}
              </MenuItem>
            ))}
          </Select>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePublishReport}
            sx={{ mt: 2 }}
          >
            Publish Report
          </Button>
        </>
      )}

      <Typography variant="h6" sx={{ mt: 4 }}>
        Double Materiality Analysis
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Paper elevation={3} sx={{ width: "100%", height: 400, padding: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                name="Financial Impact"
                unit="%"
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Social/Environmental Impact"
                unit="%"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter
                name="ESG Topics"
                data={doubleMaterialityData}
                fill="#8884d8"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Report published successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Publication;
