import {
  Button,
  CardActions,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FoodEntry() {
  return (
      <CardContent style={{ position: "relative" }}>
        <Typography align="left" variant="h5" component="div">
          Hamburger
        </Typography>
        <CalorieTypography
          align="right"
          variant="h4"
          color="primary"
          gutterBottom
        >
          2000 kj
        </CalorieTypography>
        <Typography
          align="left"
          color="text.secondary"
        >
          $2000 USD
        </Typography>
        <Typography
          align="left"
          color="text.secondary"
          gutterBottom
        >
          10 Oct 2021 - 10:00 am
        </Typography>
        <CardActions disableSpacing>
          <Button color="error" startIcon={<DeleteIcon />}>Delete</Button>
        </CardActions>
      </CardContent>
  );
}

const CalorieTypography = styled(Typography)`
  position: absolute;
  top: 24px;
  right: 32px;
`
