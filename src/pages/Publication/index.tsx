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
} from "@mui/material";
import jsPDF from "jspdf";
// import "jspdf-autotable";
import autoTable from "jspdf-autotable";
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

  const handleExportCSV = () => {
    const csv = Papa.unparse(publishedReports);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Published_Reports.csv");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Published ESG Reports", 20, 10);
    // autoTable({
    //   head: [
    //     [
    //       "Entity",
    //       "Category",
    //       "Value",
    //       "Reporting Period",
    //       "Standard",
    //       "Timestamp",
    //     ],
    //   ],
    //   body: publishedReports.map((report) => [
    //     report.entityName,
    //     report.category,
    //     report.value,
    //     report.reportingPeriod,
    //     report.standard,
    //     report.timestamp,
    //   ]),
    // });

    autoTable(doc, {
      head: [
        [
          "Entity",
          "Category",
          "Value",
          "Reporting Period",
          "Standard",
          "Timestamp",
        ],
      ],
      body: publishedReports.map((report) => [
        report.entityName,
        report.category,
        report.value,
        report.reportingPeriod,
        report.standard,
        report.timestamp,
      ]),
    });

    doc.save("Published_Reports.pdf");
  };

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
        Published Reports
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleExportPDF}
        sx={{ mr: 2 }}
      >
        Export as PDF
      </Button>
      <Button variant="contained" color="success" onClick={handleExportCSV}>
        Export as CSV
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Entity</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Reporting Period</TableCell>
              <TableCell>Standard</TableCell>
              <TableCell>Published URL</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publishedReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.entityName}</TableCell>
                <TableCell>{report.category}</TableCell>
                <TableCell>{report.value}</TableCell>
                <TableCell>{report.reportingPeriod}</TableCell>
                <TableCell>{report.standard}</TableCell>
                <TableCell>
                  <a
                    href={report.publishedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Report
                  </a>
                </TableCell>
                <TableCell>{report.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
