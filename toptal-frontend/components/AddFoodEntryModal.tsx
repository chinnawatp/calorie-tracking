import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MobileDateTimePicker } from "@mui/lab";
import { Grid, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import APIClient from "../utils/APIClient";

export default function AddFoodEntryModal({ open, onClose, onSuccess }) {
  const { control, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    const { takenAt } = data;
    const submitValues = {
      ...data,
      takenAt: takenAt.toISOString(),
    };

    console.log({ submitValues });

    try {
      await APIClient.createFoodEntry(submitValues);
      toast.success('Created food entry successfully');
      onSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Food Entry</DialogTitle>
      <DialogContent dividers>
        <Controller
          name="menuName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              autoFocus
              label="Food/Product Name"
              fullWidth
              variant="standard"
              {...field}
            />
          )}
        />
        <Controller
          name="calorie"
          control={control}
          render={({ field }) => (
            <TextField
              autoFocus
              type="number"
              label="Calorie"
              fullWidth
              variant="standard"
              {...field}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              autoFocus
              type="number"
              label="Price"
              fullWidth
              variant="standard"
              {...field}
            />
          )}
        />
        <Controller
          name="takenAt"
          control={control}
          defaultValue={new Date()}
          rules={{ required: true }}
          render={({ field }) => (
            <MobileDateTimePicker
              value={field.value}
              onChange={(dateTime) => {
                setValue("takenAt", dateTime);
              }}
              renderInput={(params) => <TextField {...params} {...field} />}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
