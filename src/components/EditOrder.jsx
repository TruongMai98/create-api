import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const EditOrder = ({ 
  isOpen, 
  onClose, 
  rowData, 
  onSave }) => {
  const [editedRowData, setEditedRowData] = useState(rowData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRowData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedRowData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          maxWidth: 400,
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" mb={2}>
          Edit Order
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="orderId"
          label="Order Id"
          value={editedRowData.orderId}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="customerId"
          label="Customer Id"
          value={editedRowData.customerId}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="date"
          label="Date of purchase"
          value={editedRowData.date}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          name="total"
          label="Total price"
          value={editedRowData.total}
          onChange={handleInputChange}
        />
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditOrder;
