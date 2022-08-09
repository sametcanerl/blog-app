import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import ArticleIcon from "@mui/icons-material/Article";
import {updateBlogFnc} from "../utils/data";

import { toastSuccessNotify } from "../helpers/ToasNotify";

export default function NewBlog() {

  const navigate = useNavigate();
  const { state } = useLocation();

const  [updateBlog, setUpdateBlog] = useState(state)


  

    const handleChange = (e)=>{
e.preventDefault()
const {name,value} = e.target
  setUpdateBlog({...updateBlog,[name]:value})
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    toastSuccessNotify("Blog Successfully Edited")
      updateBlogFnc(updateBlog)
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ArticleIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
        Update
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="outlined-required"
            label="Title"
            name="newTitle"
            autoComplete="title"
            autoFocus
            onChange={handleChange}
            value={updateBlog.newTitle}
          />
          <TextField
            id="outlined-required"
            margin="normal"
            fullWidth
            name="newImageUrl"
            label="İmage Url"
            value={updateBlog.newImageUrl}
            autoComplete="imgUrl"
            onChange={handleChange}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Content"
            multiline
            fullWidth
            name="newContent"
            rows={4}
            value={updateBlog.newContent}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
