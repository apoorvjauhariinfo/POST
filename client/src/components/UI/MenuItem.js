import { Button, Checkbox, FormControlLabel, Menu } from "@mui/material";
import { useState } from "react";

export default function MenuItem({ filters, selectedFiltersState, onChange }) {
  const [anchorEl, setColumnAnchorEl] = useState(null);

  const onClose = () => {
    setColumnAnchorEl(null);
  };

  const onClick = (event) => {
    setColumnAnchorEl(event.currentTarget);
  };

  console.log(filters);
  return (
    <>
      <Button
        style={{
          backgroundColor: "#2E718A",
          color: "#fff", // Ensure the text is readable
        }}
        variant="contained"
        onClick={onClick}
      >
        Filter Columns
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {filters.map((filter) => (
          <MenuItem key={filter.field}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFiltersState[filter.field]}
                  onChange={() => onChange(filter.field)}
                  color="primary"
                />
              }
              label={filter.label}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
