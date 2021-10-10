import {
  Button,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import Layout from "../../components/common/Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FoodEntry from "../../components/FoodEntry";

export default function FoodEntries() {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Food Entry
        </Button>
        <Paper style={{ padding: 8,  }}>
          <CardContent>
          <Typography fontWeight='bold' variant="h5" color="primary" gutterBottom>
            20 Jan 2021 - Total Calorie: 2,000
          </Typography>
          </CardContent>
          <Divider />
          <Stack spacing={2}>
            <FoodEntry />
            <Divider />
            <FoodEntry />
          </Stack>
        </Paper>
      </Container>
    </Layout>
  );
}
