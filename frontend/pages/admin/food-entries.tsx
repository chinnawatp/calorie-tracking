import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Container,
  Paper,
  TableFooter,
  Pagination as MuiPagination,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddFoodEntryModal from "../../components/AddFoodEntryModal";
import DeleteConfirmationDialog from "../../components/common/DeleteConfirmationDiaglog";
import Layout from "../../components/common/Layout";
import APIClient from "../../utils/APIClient";
import { formatPrice } from "../../utils/Formatter";
import useOnlyAdmin from "../../utils/hooks/useOnlyAdmin";
import { FoodEntry, Pagination } from "../../utils/types";

export default function AdminFoodEntriesPage() {
  useOnlyAdmin();

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination<FoodEntry>>();
  const [openAddFoodEntryModal, setOpenAddFoodEntryModal] =
    React.useState(false);
  const [editingFoodEntry, setEditingFoodEntry] = useState<FoodEntry | null>(null);
  const [deletingFoodEntry, setDeletingFoodEntry] = useState<FoodEntry | null>(null);

  const fetchData = async ({ page }: { page: number | undefined }) => {
    try {
      const data = await APIClient.getAdminFoodEntries({ page });
      setPagination(data);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchData({ page: 1 });
  }, []);

  const onDelete = async () => {
    if (!deletingFoodEntry) {
      return;
    }

    try {
      await APIClient.adminRemoveFoodEntry(deletingFoodEntry.id);
      fetchData({ page: pagination?.meta.currentPage });
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <Layout>
      <Container>
        <AddFoodEntryModal
          open={openAddFoodEntryModal}
          editingFoodEntry={editingFoodEntry}
          fetchCreate={APIClient.adminCreateFoodEntry}
          fetchUpdate={APIClient.adminUpdateFoodEntry}
          onSuccess={() => {
            fetchData({ page: pagination?.meta.currentPage });
          }}
          onClose={() => {
            setEditingFoodEntry(null);
            setOpenAddFoodEntryModal(false);
          }}
        />
        <DeleteConfirmationDialog
          onDelete={onDelete}
          open={deletingFoodEntry ? true : false}
          onClose={() => {
            setDeletingFoodEntry(null);
          }}
        />
        <Button
          style={{ margin: "16px 0" }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddFoodEntryModal(true)}
        >
          Add Food Entry
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={1}>id</TableCell>
                <TableCell>Menu Name</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Taken At</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagination?.items.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell colSpan={1}>{row.id}</TableCell>
                  <TableCell>{row.menuName}</TableCell>
                  <TableCell align="right">{row.calorie}</TableCell>
                  <TableCell align="right">{`$${formatPrice(
                    row.price
                  )}`}</TableCell>
                  <TableCell align="right">
                    {new Date(row.takenAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{row.user.firstName}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        setEditingFoodEntry(row);
                        setOpenAddFoodEntryModal(true);
                      }}
                      variant="contained"
                      style={{ marginBottom: 8 }}
                    >
                      Edit
                    </Button>
                    <div>
                      <Button
                        onClick={() => setDeletingFoodEntry(row)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow style={{ height: 50 }}>
                <TableCell>
                  {pagination?.meta && (
                    <MuiPagination
                      count={pagination?.meta.totalPages}
                      page={pagination?.meta.currentPage}
                      onChange={(_, page) => {
                        fetchData({ page });
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
