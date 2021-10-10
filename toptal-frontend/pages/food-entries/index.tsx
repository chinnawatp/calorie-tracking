import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/lab";
import {
  Button, CardContent,
  Container,
  Divider, Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddFoodEntryModal from "../../components/AddFoodEntryModal";
import Layout from "../../components/common/Layout";
import FoodEntryItem from "../../components/FoodEntry";
import APIClient from "../../utils/APIClient";
import { FoodEntryGroup, Pagination } from "../../utils/types";

export default function FoodEntries() {
  const [startDate, setStartDate] = useState(new Date());
  const [openAddFoodEntryModal, setOpenAddFoodEntryModal] = React.useState(false);
  
  const [loading, setLoading] = useState(false);
  const [foodEntryGroupPagination, setFoodEndtryPagination] =
    useState<Pagination<FoodEntryGroup>>();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await APIClient.getFoodEntryGroups();
      setFoodEndtryPagination(data);
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
      await APIClient.deleteFoodEntry(id)
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
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
          fetchData()
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
        <div style={{ margin: "16px 0" }}>
          {/* <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue: Dayjs) => {
              console.log({ newValue });
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          /> */}
        </div>
        {foodEntryGroupPagination?.items.map((foodEntryGroup) => (
          <Paper style={{ padding: 8 }} key={foodEntryGroup.id}>
            <CardContent>
              <Typography
                fontWeight="bold"
                variant="h5"
                color="primary"
                gutterBottom
              >
                {foodEntryGroup.date}
              </Typography>
              <Typography
                fontWeight="bold"
                variant="h6"
                color="secondary"
                gutterBottom
              >
                {`Total Calorie: ${foodEntryGroup.calorie} • Total Price: ${foodEntryGroup.price}`}
              </Typography>
            </CardContent>
            <Divider />
            <Stack spacing={2}>
              {foodEntryGroup.foodEntries.map((foodEntry) => (
                <div key={foodEntry.id}>
                  <FoodEntryItem foodEntry={foodEntry} onDelete={() => onDelete(foodEntry.id)} />
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
