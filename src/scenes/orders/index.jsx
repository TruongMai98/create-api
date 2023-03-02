import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetOrderQuery, useUpdateOrderMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const Orders = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetOrderQuery();
  const [ saveOrder ] = useUpdateOrderMutation();


  const [selectedRow, setSelectedRow] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  
  const handleSubmit  = () => {
    saveOrder(selectedRow);
    setEditFormOpen(false);
  }

  const handleDeleteRow = (row) => {
    // Implement your logic to delete the row here
  };

  const columns = [
    {
      field: "orderId",
      headerName: "Order id",
      flex: 1,
    },
    {
      field: "customerId",
      headerName: "Customer id",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date of purchase",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total price",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Actions",
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleEditClick = () => {
          setSelectedRow(params.row);
          setEditFormOpen(true);
        };

        const handleDeleteClick = () => {
          handleDeleteRow(params.row);
        };
        return (
          <>
            <IconButton onClick={handleEditClick}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleDeleteClick}>
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ORDER" subtitle="List of Order" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.orderId}
          rows={data || []}
          columns={columns}
          checkboxSelection
        />

        <Modal
          open={editFormOpen}
          onClose={() => setEditFormOpen(false)}
          aria-labelledby="edit-form-title"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: theme.palette.background.default,
              color: theme.palette.secondary[100],
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2" id="edit-form-title">
              Edit Order #{selectedRow?.orderId}
            </Typography>

            <TextField
              disabled
              label="Customer ID"
              fullWidth
              value={selectedRow?.customerId || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  customerId: e.target.value,
                })
              }
              margin="normal"
               variant="outlined"
            />
            <TextField
              label="Date of Purchase"
              fullWidth
              value={selectedRow?.date || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  date: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Total Price"
              fullWidth
              value={selectedRow?.total || ""}
              onChange={(e) =>
                setSelectedRow({
                  ...selectedRow,
                  total: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                sx={{
                  color: theme.palette.secondary[100],
                }}
                color="inherit"
                onClick={() => setEditFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // Implement your logic to update the row here
                  handleSubmit()
      
                }}
                sx={{ ml: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Orders;
