import { useRouter } from "next/router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { User } from "../../utils/types";
import { isAdmin } from "../../utils/UserUtils";

export default function AdminList({ user }: { user: User }) {
  const router = useRouter();

  if (!isAdmin(user)) {
    return null;
  }

  return (
    <List>
      <ListItem>
        <ListItemText primary={"Admin Menus"} />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          router.push("/admin/dashboard");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={"Report"} />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          router.push("/admin/food-entries");
        }}
      >
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText primary={"Food Entries"} />
      </ListItem>
      <Divider />
    </List>
  );
}
