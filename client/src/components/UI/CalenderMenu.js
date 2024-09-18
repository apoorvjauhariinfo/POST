import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export default function CalenderMenu({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  onReset,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button
        variant="contained"
        onClick={handleClick}
        style={{
          backgroundColor: "#2E718A",
          color: "#fff", // Ensure the text is readable
        }}
      >
        Select Date Range
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "date-menu-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2, display: "flex", flexDirection: "row", gap: 2 }}>
          <div>
            <Typography variant="h6" align="center">
              Select Start Date
            </Typography>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={() => null}
            />
          </div>
          <div>
            <Typography variant="h6" align="center">
              Select End Date
            </Typography>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={() => null}
            />
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <MenuItem onClick={handleClose}>Close</MenuItem>
          <MenuItem>
            <Button
              variant="contained"
              onClick={onReset}
              sx={{ color: "#fff", backgroundColor: "#2E718A" }}
            >
              Reset
            </Button>
          </MenuItem>
        </Box>
      </Menu>
    </LocalizationProvider>
  );
}
