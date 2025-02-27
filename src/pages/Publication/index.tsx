import React, { useState } from "react";
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

interface PublishedReport {
  id: number;
  entityName: string;
  category: string;
  value: string;
  reportingPeriod: string;
  standard: string;
  publishedUrl: string;
  timestamp: string;
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
  const [publishedReports, setPublishedReports] = useState<PublishedReport[]>(
    []
  );
  const [selectedReport, setSelectedReport] = useState<number>(0);

  const handlePublishReport = () => {
    const reportToPublish = esgData.find((data) => data.id === selectedReport);
    if (!reportToPublish) return;

    const newPublishedReport: PublishedReport = {
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

    setPublishedReports([...publishedReports, newPublishedReport]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Publication
      </Typography>
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
          <MenuItem
            key={data.id}
            value={data.id}
          >{`${data.category} - ${data.reportingPeriod}`}</MenuItem>
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

      <Typography variant="h6" sx={{ mt: 4 }}>
        Published Reports
      </Typography>
      <TableContainer component={Paper}>
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
    </Container>
  );
};

export default EntityConfig;
