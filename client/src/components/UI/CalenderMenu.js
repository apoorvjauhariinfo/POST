import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function CalenderMenu({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  onReset,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRanges, setSelectedRanges] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (startDate === "" && endDate === "") {
      setSelectedRanges(null);
    }
  }, [startDate, endDate]);

  function handleChange(e) {
    const checkboxValue = e.target.value;
    const today = dayjs();
    let startDate;

    if (checkboxValue === "7") {
      startDate = dayjs().subtract(7, "days");
    } else if (checkboxValue === "14") {
      startDate = dayjs().subtract(14, "days");
    } else if (checkboxValue === "30") {
      startDate = dayjs().subtract(30, "days");
    } else if (checkboxValue === "90") {
      startDate = dayjs().subtract(90, "days");
    }

    if (startDate) {
      setSelectedRanges(checkboxValue);
      setStartDate(startDate);
      setEndDate(today);
    }
  }

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
          color: "#fff",
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
          <Stack direction="column">
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedRanges === "7"}
                  onChange={handleChange}
                  name="last7Days"
                  value={7}
                />
              }
              label="Last 7 days"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedRanges === "14"}
                  onChange={handleChange}
                  name="last14Days"
                  value={14}
                />
              }
              label="Last 14 days"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedRanges === "30"}
                  onChange={handleChange}
                  name="last30Days"
                  value={30}
                />
              }
              label="Last 30 days"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedRanges === "90"}
                  onChange={handleChange}
                  name="last90Days"
                  value={90}
                />
              }
              label="Last 90 days"
            />
          </Stack>
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
