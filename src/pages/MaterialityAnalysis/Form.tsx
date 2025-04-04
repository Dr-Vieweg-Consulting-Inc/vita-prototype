// src/components/MaterialityUploader.tsx
import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableContainer,
  Grid,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   ZAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Label,
// } from "recharts";

interface Props {
  form: any | null;
  onSubmit: (form: any) => void;
}

export function UpdateForm({ form, onSubmit }: Props) {
  //

  const [formUnderEditing, setFormUnderEditing] = useState<any | null>(null);

  const lastFormExists = useRef<boolean>(false);

  useEffect(() => {
    if (lastFormExists.current) {
      if (!form) {
        setFormUnderEditing(form);
        return () => {
          lastFormExists.current = false;
        };
      }

      return;
    }

    setFormUnderEditing(form);

    return () => {
      lastFormExists.current = true;
    };
  }, [lastFormExists, form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUnderEditing({
      ...formUnderEditing,
      [e.target.name]: e.target.value,
    });
  };

  //   const handleSubmit = () => {
  //     if (formUnderEditing.id !== undefined && formUnderEditing.id !== null) {
  //       //   setData((prev) =>
  //       //     prev.map((item) => (item.id === form.id ? { ...item, ...form } : item))
  //       //   );
  //     }
  //     setFormUnderEditing(null);
  //   };

  if (!formUnderEditing) return null;

  return (
    <Paper id="form-section" sx={{ p: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        {formUnderEditing.id !== null ? "Edit ESG Topic" : "Add ESG Topic"}
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        // onSubmit={() => {
        //   console.log("submitted!");
        // }}
      >
        {Object.keys(formUnderEditing).map((key) =>
          key !== "id" ? (
            <TextField
              key={key}
              name={key}
              label={key}
              fullWidth
              margin="normal"
              value={formUnderEditing[key] ?? ""}
              onChange={handleChange}
            />
          ) : null
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => onSubmit(formUnderEditing)}
        >
          Update
        </Button>
      </Box>
    </Paper>
  );
}
