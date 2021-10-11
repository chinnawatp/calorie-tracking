import {
  Card,
  Grid,
  Paper,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/common/Layout";
import APIClient from "../../utils/APIClient";

export default function ReportPage() {
  const [data, setData] = useState<{
    numberOfFoodEntriesLastSevenDay: number;
    numberOfFoodEntriesLastWeek: number;
    numberOfFoodEntriesToday: number;
    averageCaloriePerUserLastSevenDay: number;
  }>();

  const fetchData = async () => {
    try {
      const res = await APIClient.getAdminReport();
      setData(res);
    } catch (error) {
      toast.error('Failed to get report')
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Number of added entries</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <div>Number of added entries today</div>
              <Typography>{`${data?.numberOfFoodEntriesToday} Food Entries`}</Typography>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <div>Number of added entries last 7 days</div>
              <Typography>{`${data?.numberOfFoodEntriesLastSevenDay} Food Entries`}</Typography>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <div>Number of added entries last week</div>
              <Typography>{`${data?.numberOfFoodEntriesLastWeek} Food Entries`}</Typography>
            </Item>
          </Grid>
        </Grid>
        <Divider style={{ margin: "24px 8px " }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Average number of calories per user</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <div>Average number of calories per user last 7 days</div>
              <Typography>{`${data?.averageCaloriePerUserLastSevenDay} Calorie`}</Typography>
            </Item>
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
