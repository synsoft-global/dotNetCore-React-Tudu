import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  deleteApiCall,
  getApiCall,
  postApiCall,
  putApiCall,
} from "../services/Authentication";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import { SynCheckbox } from "../Reusable-lib/Components/SynCheckbox";
import { commonMsg } from "../utils/message";
import { SynInputText } from "../Reusable-lib/Components/SynInputText";
import { useForm } from "react-hook-form";

interface Column {
  id: "name" | "isComplete" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "isComplete", label: "Complete", minWidth: 170 },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function TodoList(props: any) {
  const [open, setopen] = React.useState(false);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  let { id } = useParams();
  const [isCompleted, setisCompleted] = React.useState<boolean>(false);
  const [isLoading, setisLoading] = React.useState<boolean>(false);

  //Onload hook to set data in case of edit record
  React.useEffect(() => {
    setopen(props.showPopUp);
    if (props.todoId) {
      getTodoItembyid();
    } else {
      setisLoading(true);
    }
  }, []);

  //Close popup
  const handleClosePopup = () => {
    props.onCloseHandler();
  };

  //Save or update todo data
  const handleFormSubmit = (data: any) => {
    if (props.todoId) {
      const parms = {
        id: props.todoId,
        name: data.name,
        isComplete: data.isComplete,
      };
      putApiCall(`/api/Todo/UpdateTodoItem/${props.todoId}`, parms).then(
        (res) => {
          if (res.status) {
            toast.success(res.message, { autoClose: 1000 });
            props.onCloseHandler();
          } else {
            toast.error(res.message, { autoClose: 1000 });
          }
        }
      );
    } else {
      const postData = { name: data.name, isComplete: data.isComplete };
      postApiCall(`/api/Todo/AddTodoItem`, postData).then((res) => {
        if (res.status) {
          toast.success(res.message, { autoClose: 1000 });
          props.onCloseHandler();
        } else {
          toast.error(res.message, { autoClose: 1000 });
        }
      });
    }
  };

  //Fetch todo item by id
  const getTodoItembyid = () => {
    getApiCall(`/api/Todo/GetTodoItemById/${props.todoId}`, "").then((res) => {
      if (res) {
        setValue("name", res.result.name);
        setisCompleted(res.result.isComplete);
        setisLoading(true);
      }
    });
  };

  return (
    <>
      {isLoading && (
        <div>
          <BootstrapDialog
            onClose={handleClosePopup}
            aria-labelledby="customized-dialog-title"
            open={open}
            className="add-dailog"
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClosePopup}
            >
              {props.dialogHeading}
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Box
                className="mt-8"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "30px",
                  marginLeft: "20px",
                }}
              >
                <Grid container spacing={2} className="mt-8">
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <SynInputText
                      control={control}
                      className="input-1 custom-input"
                      register={register}
                      label="Todo name"
                      setValue={setValue}
                      name="name"
                      validation="AlphanumericOnly"
                      maxLength={50}
                      required
                      reqMsg={commonMsg.FULLNAME_REQ}
                      validationMsg={commonMsg.FULLNAME_VALID}
                    />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <SynCheckbox
                      name="isComplete"
                      control={control}
                      label="IsComplete"
                      //required
                      selecteditems={isCompleted}
                      register={register}
                      style={{ width: "100%", marginBottom: "10px" }}
                      setValue={setValue}
                      setError={setError}
                      error={errors.isComplete as any}
                      errorMessage={
                        (errors.isComplete as any)
                          ? (errors.isComplete?.message as any)
                          : ""
                      }
                    />
                  </Grid>

                  {/* <Grid className="text-center" item xs={12}>
             <Button
               variant="contained"
               onClick={handleSubmit(handleFormSubmit)}
               size="large"
               className="button"
               type="submit"
             >
               Submit
             </Button>
           </Grid> */}
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleSubmit(handleFormSubmit)}>
                Save changes
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      )}
    </>
  );
}
