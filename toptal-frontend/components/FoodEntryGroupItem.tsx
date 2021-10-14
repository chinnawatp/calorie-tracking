import { CalendarToday } from "@mui/icons-material";
import {
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React from "react";
import FoodEntryItem from "../components/FoodEntryItem";
import WarningDailyLimit from "../components/WarningDailyLimit";
import { FoodEntryGroup, User } from "../utils/types";

type Props = {
  foodEntryGroup: FoodEntryGroup;
  onDelete: (id: number) => Promise<void>;
  user: User | undefined;
};

export default function FoodEntryGroupItem({ foodEntryGroup, onDelete, user }: Props) {
  if (foodEntryGroup.foodEntries.length <= 0) {
    return null;
  }

  return (
    <Paper style={{ padding: 8, marginBottom: 16 }} key={foodEntryGroup.id}>
      <CardContent>
        <Grid style={{ display: "flex", alignItems: "center" }}>
          <CalendarToday color="primary" style={{ marginRight: 8 }} />
          <Typography fontWeight="bold" variant="h5" color="primary">
            {format(new Date(foodEntryGroup.takenAt), "yyyy-MM-dd")}
          </Typography>
        </Grid>
        <Typography
          fontWeight="bold"
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {`Total Calorie: ${foodEntryGroup.calorie}/${user?.calorieLimitPerDay}`}
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
            {index !== foodEntryGroup.foodEntries.length - 1 && <Divider />}
          </div>
        ))}
      </Stack>
    </Paper>
  );
}
