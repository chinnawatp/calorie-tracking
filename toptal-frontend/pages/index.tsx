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
  Pagination as MuiPagination,
  Paper,
  Skeleton,
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
import { CalendarToday } from "@mui/icons-material";
import { Box } from "@mui/system";
import { formatPrice } from "../utils/Formatter";
import { format } from "date-fns";

export default function FoodEntries() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openAddFoodEntryModal, setOpenAddFoodEntryModal] =
    React.useState(false);

  const [loading, setLoading] = useState(false);
  const [foodEntryGroupPagination, setFoodEndtryPagination] =
    useState<Pagination<FoodEntryGroup>>();
  const [user, setUser] = useState<User>();

  const fetchData = async ({
    startDate,
    endDate,
    page,
  }: { startDate: string | null; endDate: string | null; page?: number }) => {
    try {
      setLoading(true);
      const data = await APIClient.getFoodEntryGroups({
        startDate,
        endDate,
        page,
      });
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
    fetchData({startDate, endDate});
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
    fetchData({ startDate, endDate });
  };

  return (
    <Layout>
      <AddFoodEntryModal
        open={openAddFoodEntryModal}
        fetchCreate={APIClient.createFoodEntry}
        onClose={() => {
          setOpenAddFoodEntryModal(false);
        }}
        onSuccess={() => {
          fetchData({ startDate, endDate });
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
        <div
          style={{ margin: "16px 0", display: "flex", alignItems: "center" }}
        >
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
          <Button
            onClick={onFilter}
            variant="contained"
            color="secondary"
            style={{ marginLeft: 16 }}
          >
            Filter
          </Button>
        </div>
        {loading && (
          <div>
            <Skeleton variant="text" />
            <Skeleton
              variant="rectangular"
              style={{ marginBottom: 32 }}
              width={"100%"}
              height={118}
            />
          </div>
        )}
        {foodEntryGroupPagination?.items.map((foodEntryGroup) => (
          <Paper
            style={{ padding: 8, marginBottom: 16 }}
            key={foodEntryGroup.id}
          >
            <CardContent>
              <Grid style={{ display: "flex", alignItems: "center" }}>
                <CalendarToday color="primary" style={{ marginRight: 8 }} />
                <Typography fontWeight="bold" variant="h5" color="primary">
                  {format(new Date(foodEntryGroup.takenAt), "yyyy-MM-dd")}
                </Typography>
              </Grid>
              <Typography
                fontWeight="bold"
                variant="h7"
                color="text.secondary"
                gutterBottom
              >
                {`Total Calorie: ${foodEntryGroup.calorie}/${
                  user?.calorieLimitPerDay
                } • Total Price: $${formatPrice(
                  foodEntryGroup.price
                )}/$${formatPrice(user?.priceLimitPerDay || 0)}`}
              </Typography>
              <WarningDailyLimit user={user} foodEntryGroup={foodEntryGroup} />
            </CardContent>
            <Divider />
            <Stack spacing={2}>
              {foodEntryGroup.foodEntries.map((foodEntry, index) => (
                <div key={foodEntry.id}>
                  <FoodEntryItem
                    foodEntry={foodEntry}
                    onDelete={() => onDelete(foodEntry.id)}
                  />
                  {index !== foodEntryGroup.foodEntries.length - 1 && (
                    <Divider />
                  )}
                </div>
              ))}
            </Stack>
          </Paper>
        ))}
        {foodEntryGroupPagination?.meta && (
          <MuiPagination
            count={foodEntryGroupPagination?.meta.totalPages}
            page={foodEntryGroupPagination?.meta.currentPage}
            onChange={(value, page) => {
              fetchData({ startDate, endDate, page });
            }}
          />
        )}
      </Container>
    </Layout>
  );
}
