import { Stack, Typography } from "@mui/material";
import { GridRowEditStopReasons } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ExportBtn from "../Admin/TotalHospital/ui/ExportBtn";
import CalenderMenu from "../UI/CalenderMenu";
import DataTable, { TableFilterBtn } from "../UI/DataTable";

export default function StockEntryTable() {
  const [rows, setRows] = useState([]);
  const gethistory = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}historywithproductdetails/${hospitalid}`;
      const { data } = await axios.get(url);
      const stockEntryData = data.historyWithProductDetails.filter(
        (el) => el.type === "Stock Entry",
      );

      const newRows = stockEntryData.map((stock) => {
        const dateArr = stock.date.split("/");
        const dateFormatted = dateArr[1] + "/" + dateArr[0] + "/" + dateArr[2];

        return {
          _id: stock._id,
          quantity: stock.quantity,
          productname: stock.productDetails.name,
          category: stock.productDetails.category,
          manufacturer: stock.productDetails.manufacturer,
          emergencytype: stock.productDetails.emergencytype,
          department: stock.productDetails.producttype,
          subdepartment: stock.productDetails.subcategory,
          date: dateFormatted,
        };
      });

      setRows(newRows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gethistory();
  }, []);

  const hospitalid = localStorage.getItem("hospitalid");
  const [visibleColumns, setVisibleColumns] = useState({
    // name: true,
    quantity: true,
    productname: true,
    category: true,
    manufacturer: true,
    emergencytype: true,
    date: true,
    department: true,
    subdepartment: true,
  });

  const columnDefinations = [
    { field: "date", headerName: "Date", width: 120 },
    { field: "productname", headerName: "Product Name", width: 150 },
    { field: "department", headerName: "Scope", width: 150 },
    { field: "subdepartment", headerName: "Department", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "manufacturer", headerName: "Manufacturer", width: 150 },
    { field: "emergencytype", headerName: "Emergency Type", width: 150 },
  ];

  const columns = columnDefinations
    .filter((col) => visibleColumns[col.field])
    .map((col) => ({
      ...col,
      headeralign: col.headeralign || "left",
      width: col.width || 150,
      align: col.align || "left",
      editable: col.editable !== undefined ? col.editable : true,
    }));

  const [rowModesModel, setRowModesModel] = useState({});
  const [count, setCount] = useState(0);
  const [columnAnchorEl, setColumnAnchorEl] = useState(null);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
    return updatedRow;
  };

  const onRowsSelectionHandler = (id) => {
    const selectedIDs = new Set(id);
    const selectedRowsData = id.map((id) => rows.find((row) => row._id === id));
    setCount(selectedIDs);
  };

  const handleColumnClose = () => {
    setColumnAnchorEl(null);
  };

  const handleColumnClick = (event) => {
    setColumnAnchorEl(event.currentTarget);
  };

  const toggleColumnVisibility = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const selectedData = [];
  if (count !== 0 && count.size !== 0) {
    for (const entry of count.values()) {
      const row = rows.find((r) => r._id === entry);
      if (row) {
        selectedData.push([
          row.quantity,
          row.productname,
          row.emergencytype,
          row.date,
          row.manufacturer,
          row.category,
          row.department,
          row.subdepartment,
        ]);
      }
    }
  }

  const headers = [
    "Date",
    "Product Name",
    "Scope",
    "Department",
    "Quantity",
    // "Product Name",
    "Category",
    "Manufacturer",
    "Emergency Type",
  ];

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);

  function filterByDateRange(rows, startDate, endDate) {
    if (!startDate || !endDate) return rows;

    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    return rows.filter((row) => {
      const [day, month, year] = row.date.split("/");
      const rowDate = new Date(year, month - 1, day).getTime();

      return rowDate >= start && rowDate <= end;
    });
  }

  function resetDateHandler() {
    setStartDate("");
    setEndDate("");
  }

  useEffect(() => {
    const result = filterByDateRange(rows, startDate, endDate);
    setFilteredRows(result);
  }, [startDate, endDate, rows]);

  return (
    <main className="main-container">
      <div>
        <section
          className="p-5 w-100"
          style={{
            backgroundColor: "#eeeee",
            borderRadius: ".5rem .5rem 0 0",
          }}
        >
          <div className="row">
            <div className="col">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-3">
                  <Typography
                    variant="h4"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "black",
                      padding: "10px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    Stock Entry
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <CalenderMenu
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      onReset={resetDateHandler}
                    />
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="flex-end"
                    >
                      <TableFilterBtn
                        anchorEl={columnAnchorEl}
                        onClose={handleColumnClose}
                        onClick={handleColumnClick}
                        columnDefinitions={columnDefinations}
                        visibleColumns={visibleColumns}
                        onChange={toggleColumnVisibility}
                      />
                      <ExportBtn
                        rows={selectedData}
                        isSelected={true}
                        headers={headers}
                        fileName="Stock_Issue_Report"
                      />
                    </Stack>
                  </Stack>
                  <DataTable
                    rows={filteredRows}
                    columns={columns}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onRowsSelectionHandler={onRowsSelectionHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
