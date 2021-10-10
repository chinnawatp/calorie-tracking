import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  CardActions,
  CardContent, Typography
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { FoodEntry } from "../utils/types";

type Props = {
  foodEntry: FoodEntry;
  onDelete: () => void;
};

export default function FoodEntryItem({ foodEntry, onDelete }: Props) {
  return (
    <CardContent style={{ position: "relative" }}>
      <Typography align="left" variant="h5" color="primary">
        {foodEntry.menuName}
      </Typography>
      <CalorieTypography
        align="right"
        variant="h4"
        color="secondary"
        gutterBottom
      >
        {`${foodEntry.calorie} Cal`}
      </CalorieTypography>
      <Typography align="left" color="text.secondary">
        {`$${foodEntry.price}`}
      </Typography>
      <Typography align="left" color="text.secondary" gutterBottom>
        {foodEntry.takenAt}
      </Typography>
      <CardActions disableSpacing>
        <Button onClick={onDelete} color="error" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>
    </CardContent>
  );
}

const CalorieTypography = styled(Typography)`
  position: absolute;
  top: 16px;
  right: 32px;
`;
