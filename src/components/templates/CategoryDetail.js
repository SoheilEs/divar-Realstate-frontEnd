import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addOptions, categoryDetail } from "../../services/admin";
import Loader from "../modules/Loader";
import { Alert, Button, Divider } from "@mui/material";
import styles from "./CategoryDetail.module.css";
import { ICONS } from "../../utils/icons";
import TextList from "../modules/TextList";
import ListOptions from "../modules/ListOptions";
import { FaPlus,FaAngleLeft } from "react-icons/fa";

function CategoryDetail() {
  const queryClient = useQueryClient();
  const [options, setOptions] = useState([]);
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["CategoryDetail", id],
    queryFn: async ({ queryKey }) => await categoryDetail(queryKey[1]),
  });
  const { mutate } = useMutation({
    mutationFn: addOptions,
    onSuccess: () => queryClient.invalidateQueries("listOpByCategoryId"),
  });
  const clickHandler = () => {
    setOptions([
      {
        title: "",
        key: "",
        guid: "",
        type: "number",
        required: false,
        enum: [],
      },
    ]);
  };
  const changeHandler = (e, id) => {
    const { name, value } = e.target;
    if (name === "required") {
      options[id][name] = e.target.checked;
    } else {
      options[id][name] = value;
    }
    setOptions([...options]);
  };
  const deleteHandler = (id) => {
    options.splice(id, 1);
    setOptions([...options]);
  };
  const submitHandler = async (e, id) => {
    e.preventDefault();

    options[id]["category"] = data?.data?.category._id;

    mutate(...options);
  };

  return (
    <div className={styles.container}>
      <Link className={styles.backLink} to="/admin/category" ><FaAngleLeft /></Link>
      <ListOptions id={id} />
      <h3 className={styles.title}>ایجاد گزینه برای دسته</h3>
      <Divider
        sx={{ my: "10px", backgroundColor: "#be3737", width: "170px" }}
      />
      {isLoading && <Loader />}
      {data?.data?.category?.children.length !== 0 ? (
        data?.data?.category?.children.map((child) => (
          <div key={child._id} className={styles.categorySec}>
            <h3 className={styles.category}>
              {ICONS[child.icon]}
              {child.name}
            </h3>
            <Button
              onClick={clickHandler}
              sx={{
                minWidth:"30px",
                mr: "20px",
                p:"6px",
                backgroundColor: "#C70039",
                "&:hover": { backgroundColor: "#EA1179" },
              }}
              variant="contained"
            >
              <FaPlus />
            </Button>
          </div>
        ))
      ) : (
        <Alert severity="error" sx={{display:"flex",justifyContent:"center",direction:"ltr",mt:"30px"}}>ابتدا برای این دسته زیر دسته ایجاد کنید</Alert>
      )}

      {options.map((op, index) => (
        <div className={styles.formSection} key={index}>
          <form
            className={styles.form}
            onSubmit={(e) => submitHandler(e, index)}
          >
            <label htmlFor="title">عنوان</label>
            <input
              type="text"
              name="title"
              value={op.title}
              onChange={(e) => changeHandler(e, index)}
            />
            <label htmlFor="key">کلید</label>
            <input
              type="text"
              name="key"
              value={op.key}
              onChange={(e) => changeHandler(e, index)}
            />
            <label htmlFor="guid">راهنما</label>
            <input
              type="text"
              name="guid"
              value={op.guid}
              onChange={(e) => changeHandler(e, index)}
            />
            <div className={styles.check}>
              الزامی :
              <input
                type="checkbox"
                name="required"
                value={op.required}
                onChange={(e) => changeHandler(e, index)}
              />
            </div>
            <div>
              <div className={styles.opSelect}>
                <label htmlFor="type">نوع گزینه :</label>
                <select
                  className={styles.select}
                  name="type"
                  id="type"
                  onChange={(e) => changeHandler(e, index)}
                >
                  {["number", "boolean", "array", "string"].map((i, index) => (
                    <option key={index} value={i}>
                      {i === "number" ? "عدد" : ""}
                      {i === "string" ? "رشته" : ""}
                      {i === "boolean" ? "صحیح / نادرست" : ""}
                      {i === "array" ? "لیست" : ""}
                    </option>
                  ))}
                </select>
              </div>
              {options[index].type === "array" ||
              options[index].type === "boolean" ? (
                <TextList
                  name={options[index].type}
                  allOptions={options}
                  options={options[index]}
                  setOptions={setOptions}
                />
              ) : null}
            </div>
            <div className={styles.btnContainer}>
              <Button variant="contained" type="submit">
                ایجاد
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteHandler(index)}
              >
                حذف
              </Button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}

export default CategoryDetail;
