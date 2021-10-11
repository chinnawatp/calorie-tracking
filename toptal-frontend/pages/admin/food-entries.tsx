import { Card, Grid, Paper, Container } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import Layout from "../../components/common/Layout";

export default function AdminFoodEntriesPage() {
  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Item>Number of added entries last 7 days</Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>Number of added entries last week</Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>Average number of calories per user last 7 days</Item>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
