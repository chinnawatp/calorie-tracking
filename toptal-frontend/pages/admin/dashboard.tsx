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
import useOnlyAdmin from "../../utils/hooks/useOnlyAdmin";

export default function ReportPage() {
  useOnlyAdmin();

  const [data, setData] = useState<{
    numberOfFoodEntriesLastSevenDay: number;
    numberOfFoodEntriesLastWeek: number;
    numberOfFoodEntriesToday: number;
    averageCaloriePerUserLastSevenDay: number;
  }>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await APIClient.getAdminReport();
      setData(res);
    } catch (error) {
      toast.error('Failed to get report')
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || !data) {
    return <Layout>
      Loading...
    </Layout>
  }

  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Number of added entries</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <div>Today</div>
              <Typography color="primary">{`${data?.numberOfFoodEntriesToday} Food Entries`}</Typography>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <div>Last 7 days</div>
              <Typography color="primary">{`${data?.numberOfFoodEntriesLastSevenDay} Food Entries`}</Typography>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              <div>Last week (Sun - Sat)</div>
              <Typography color="primary">{`${data?.numberOfFoodEntriesLastWeek} Food Entries`}</Typography>
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
              <div>Last 7 days</div>
              <Typography color="primary">{`${data?.averageCaloriePerUserLastSevenDay} Calorie`}</Typography>
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
