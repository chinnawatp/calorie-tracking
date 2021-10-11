import { MobileDateTimePicker } from "@mui/lab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import APIClient from "../utils/APIClient";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    menuName: yup.string().required(),
    calorie: yup.number().positive().integer().required(),
    price: yup.number().positive().integer().required(),
    takenAt: yup.date().required(),
  })
  .required();

export default function AddFoodEntryModal({ open, onClose, onSuccess }) {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    reset();
    onClose();
  }

  const onSubmit = async (data) => {
    const { takenAt } = data;
    const submitValues = {
      ...data,
      takenAt: takenAt.toISOString(),
    };

    try {
      await APIClient.createFoodEntry(submitValues);
      toast.success("Created food entry successfully");
      handleClose();
      onSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Food Entry</DialogTitle>
      <StyledDialogContent dividers>
        <Controller
          name="menuName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              error={errors[field.name]}
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
              error={errors[field.name]}
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
              error={errors[field.name]}
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
              renderInput={(params) => <TextField
                error={errors[field.name]}
                {...params} {...field} />}
            />
          )}
        />
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const StyledDialogContent = styled(DialogContent)`
  > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;
