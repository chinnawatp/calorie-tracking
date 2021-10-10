import { Alert } from "@mui/material";
import {
  hasReachedCalorieLimitPerDay,
  hasReachedPriceLimitPerDay,
} from "../utils/FoodEntryUtils";
import { FoodEntryGroup, User } from "../utils/types";

type Props = {
  user: User | undefined;
  foodEntryGroup: FoodEntryGroup;
};

export default function WarningDailyLimit({ user, foodEntryGroup }: Props) {
  if (!user) {
    return null;
  }

  return (
    <div>
      {hasReachedCalorieLimitPerDay(user, foodEntryGroup.calorie) && (
        <Alert style={{ marginBottom: 4 }} severity="warning">
          You have reached daily calorie limit
        </Alert>
      )}
      {hasReachedPriceLimitPerDay(user, foodEntryGroup.price) && (
        <Alert severity="warning">You have reached daily price limit</Alert>
      )}
    </div>
  );
}
