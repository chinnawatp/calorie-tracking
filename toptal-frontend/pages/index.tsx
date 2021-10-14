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
import FoodEntryItem from "../components/FoodEntryItem";
import FoodEntryGroupItem from "../components/FoodEntryGroupItem";
import APIClient from "../utils/APIClient";
import { FoodEntryGroup, Pagination, User } from "../utils/types";
import { CalendarToday } from "@mui/icons-material";
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
  }: {
    startDate: string | null;
    endDate: string | null;
    page?: number;
  }) => {
    if (startDate && endDate) {
      if (endDate < startDate) {
        return toast.error("Entry end date should be after start date");
      }
    }

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
    fetchData({ startDate, endDate });
  }, []);

  const onDelete = async (id: number) => {
    try {
      await APIClient.deleteFoodEntry(id);
      fetchData({ startDate, endDate });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onFilter = () => {
    fetchData({ startDate, endDate });
  };

  const onReset = () => {
    setStartDate(null);
    setEndDate(null);
    fetchData({ startDate: null, endDate: null });
  };

  return (
    <Layout>
      <AddFoodEntryModal
        open={openAddFoodEntryModal}
        fetchCreate={APIClient.createFoodEntry}
        fetchUpdate={APIClient.createFoodEntry}
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
            label="Entry Start Date"
            maxDate={endDate}
            value={startDate}
            onChange={(newValue) => {
              console.log({ newValue });
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
            label="Entry End Date"
            minDate={startDate}
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
          <div>
            <Button onClick={onReset} style={{ marginLeft: 16 }}>
              Reset
            </Button>
          </div>
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
          <FoodEntryGroupItem
            foodEntryGroup={foodEntryGroup}
            onDelete={onDelete}
            user={user}
            key={foodEntryGroup.id}
          />
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
