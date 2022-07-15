import { Box, Grid, Button } from "@mui/material";
import { SynInputText } from "../Reusable-lib/Components/SynInputText";
import { useForm } from "react-hook-form";
import { commonMsg } from "../utils/message";
import { useNavigate } from "react-router-dom";
import {
  getApiCall,
  postApiCall,
  putApiCall,
} from "../services/Authentication";
import { SynCheckbox } from "../Reusable-lib/Components/SynCheckbox";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTodo = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  let { id } = useParams();

  const [isCompleted, setisCompleted] = useState<boolean>(false);
  const [compnonetMount, setcompnonetMount] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getTodoItembyid();
    } else {
      setcompnonetMount(true);
    }
  }, []);

  const getTodoItembyid = () => {
    getApiCall(`/api/Todo/GetTodoItemById/${id}`, "").then((res) => {
      if (res) {
        setValue("name", res.result.name);
        setisCompleted(res.result.isComplete);
        setcompnonetMount(true);
      }
    });
  };

  const handleFormSubmit = (data: any) => {
    if (id) {
      const parms = { id: id, name: data.name, isComplete: data.isComplete };
      putApiCall(`/api/Todo/UpdateTodoItem/${id}`, parms).then((res) => {
        console.log("res", res);
        if (res.status) {
          toast.success(res.message, { autoClose: 1000 });
          getTodoItembyid();
          navigate("/");
        } else {
          toast.error(res.message, { autoClose: 1000 });
        }
      });
    } else {
      const postData = { name: data.name, isComplete: data.isComplete };
      console.log("saf", postData);
      postApiCall(`/api/Todo/AddTodoItem`, postData).then((res) => {
        if (res.status) {
          toast.success(res.message, { autoClose: 1000 });
          navigate("/");
        } else {
          toast.error(res.message, { autoClose: 1000 });
        }
      });
    }
  };

  if (!compnonetMount) return <></>;
  else
    return (
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
              className="input-1"
              register={register}
              label="Todo name"
              setValue={setValue}
              name="name"
              validation="AlphabetOnly"
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

          <Grid className="text-center" item xs={12}>
            <Button
              variant="contained"
              onClick={handleSubmit(handleFormSubmit)}
              size="large"
              className="button"
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
};
export default AddTodo;
