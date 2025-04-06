import React, { SetStateAction, useState, Dispatch } from "react";
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
  styled,
  // Tabs,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { UpdateForm } from "./Form";
import { Tabs } from "../../components";
import { Matrix } from "./Matrix";

interface Props {
  data: any[];
  //   setData: Dispatch<SetStateAction<any[]>>;
}

export function Overview({ data }: Props) {
  return (
    <>
      <Grid container spacing={4} direction="column">
        <Grid item xs={12}>
          <Matrix data={data} />
        </Grid>
      </Grid>
    </>
  );
}
