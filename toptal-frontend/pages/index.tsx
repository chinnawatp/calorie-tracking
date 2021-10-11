import WarningDailyLimit from "../components/WarningDailyLimit";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, MobileDatePicker } from "@mui/lab";
import {
  Alert,
  Button,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddFoodEntryModal from "../components/AddFoodEntryModal";
import Layout from "../components/common/Layout";
import FoodEntryItem from "../components/FoodEntry";
import APIClient from "../utils/APIClient";
import { FoodEntryGroup, Pagination, User } from "../utils/types";
import {CalendarToday} from '@mui/icons-material';
import { Box } from "@mui/system";

export default function FoodEntries() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openAddFoodEntryModal, setOpenAddFoodEntryModal] =
    React.useState(false);

  const [loading, setLoading] = useState(false);
  const [foodEntryGroupPagination, setFoodEndtryPagination] =
    useState<Pagination<FoodEntryGroup>>();
  const [user, setUser] = useState<User>();

  const fetchData = async ({startDate, endDate} = {}) => {
    try {
      setLoading(true);
      const data = await APIClient.getFoodEntryGroups({startDate, endDate});
      setFoodEndtryPagination(data);

      const userData = await APIClient.getCurrentUser();
      setUser(userData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id) => {
    try {
      await APIClient.deleteFoodEntry(id);
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onFilter = () => {
    fetchData({startDate, endDate});
  }

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Layout>
      <AddFoodEntryModal
        open={openAddFoodEntryModal}
        onClose={() => setOpenAddFoodEntryModal(false)}
        onSuccess={() => {
          fetchData();
        }}
      />
      <Container maxWidth="sm">
        <Button
          style={{ margin: "16px 0" }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddFoodEntryModal(true)}
        >
          Add Food Entry
        </Button>
        <div style={{ margin: "16px 0", display: 'flex', alignItems: 'center' }}>
          <MobileDatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue: Dayjs) => {
              console.log({ newValue });
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button onClick={onFilter} variant="contained" color="secondary" style={{marginLeft: 16}}>Filter</Button>
        </div>
        {foodEntryGroupPagination?.items.map((foodEntryGroup) => (
          <Paper style={{ padding: 8, marginBottom: 16}} key={foodEntryGroup.id}>
            <CardContent>
              <Grid style={{ display: "flex", alignItems: 'center' }}>
              <CalendarToday color="primary" style={{marginRight: 8}} /> 
                <Typography
                  fontWeight="bold"
                  variant="h5"
                  color="primary"
                >
                 {foodEntryGroup.date}
                </Typography>
              </Grid>
              <Typography
                fontWeight="bold"
                variant="h6"
                color="secondary"
                gutterBottom
              >
                {`Total Calorie: ${foodEntryGroup.calorie}/${user?.calorieLimitPerDay} • Total Price: ${foodEntryGroup.price}/${user?.priceLimitPerDay}`}
              </Typography>
              <WarningDailyLimit user={user} foodEntryGroup={foodEntryGroup} />
            </CardContent>
            <Divider />
            <Stack spacing={2}>
              {foodEntryGroup.foodEntries.map((foodEntry) => (
                <div key={foodEntry.id}>
                  <FoodEntryItem
                    foodEntry={foodEntry}
                    onDelete={() => onDelete(foodEntry.id)}
                  />
                  <Divider />
                </div>
              ))}
            </Stack>
          </Paper>
        ))}
      </Container>
    </Layout>
  );
}
