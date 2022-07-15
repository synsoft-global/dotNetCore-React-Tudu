import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { deleteApiCall, getApiCall } from "../services/Authentication";
import { Button, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEditTodo from "./AddEditTodo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Column {
  id: "name" | "isComplete";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "isComplete", label: "Complete", minWidth: 170 },
];

export default function TodoList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = React.useState(0);
  const [rows, setRows] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [userDeletId, setUserDeletId] = React.useState<number>();
  const [showPopUp, setShowPopup] = React.useState(false);
  const [todoId, settodoId] = React.useState<number | null>();

  //Load data based on page number change
  React.useEffect(() => {
    getTodoList();
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Load edit popup
  const handleEdit = (id: number) => {
    setShowPopup(true);
    settodoId(id);
  };

  // delete todo record selected
  const handleDelete = () => {
    if (userDeletId) {
      deleteApiCall(`/api/Todo/DeleteTodoItem/${userDeletId}`, "").then(
        (res) => {
          if (res.status) {
            getTodoList();
            setOpen(false);
            toast.success(res.message, { autoClose: 1000 });
          } else {
            toast.error(res.message, { autoClose: 1000 });
            setOpen(false);
          }
        }
      );
    }
  };

  //Load todo list page wise
  const getTodoList = () => {
    getApiCall(`/api/Todo/GetAllTodoItemsPageWise`, `PageNo=${page}`).then(
      (res) => {
        if (res.status) {
          setTotalCount(res.result.totalCount);
          setRows(res.result.items);
        } else {
          setTotalCount(0);
          setRows([]);
        }
      }
    );
  };

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setUserDeletId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenForm = () => {
    settodoId(null);
    setShowPopup(true);
  };

  const onCloseHandler = () => {
    console.log("oncloseHandle");
    setShowPopup(false);
    getTodoList();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div className="button_wrapper">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleClickOpenForm()}
        >
          {" "}
          Add todo{" "}
        </Button>
      </div>

      <TableContainer className="table-container" sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead color="primary">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : typeof value === "boolean"
                          ? value.toString()
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <IconButton
                      size="small"
                      aria-label="edit"
                      onClick={() => handleEdit(row["id"])}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    &nbsp;
                    <IconButton
                      size="small"
                      aria-label="delete"
                      onClick={() => handleClickOpen(row["id"])}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this todo ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            yes
          </Button>
        </DialogActions>
      </Dialog>

      {showPopUp && (
        <AddEditTodo
          showPopUp={showPopUp}
          dialogHeading={todoId ? "Edit Todo" : "Add Todo"}
          todoId={todoId}
          onCloseHandler={onCloseHandler}
        />
      )}
    </Paper>
  );
}
