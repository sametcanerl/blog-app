import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";


import ArticleIcon from "@mui/icons-material/Article";
import { newBlog } from "../utils/data";
import { AuthContext } from "../context/AuthContext";

import { toastSuccessNotify, toastWarnNotify } from "../helpers/ToasNotify";

export default function NewBlog() {
  const [newTitle, setNewTitle] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newContent, setNewContent] = useState("");
  const { currentUser } = useContext(AuthContext);
  const currentUserID = currentUser.uid;
  const currentUserEmail = currentUser.email;
  const navigate = useNavigate();

  const newDate = new Date();
  const newBlogCreateTime =
    newDate.getDate() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    newBlog(
      newTitle,
      newImageUrl,
      newContent,
      newBlogCreateTime,
      currentUserID,
      currentUserEmail
    );
    if(!newTitle){
      toastWarnNotify("Please Enter Title")
    }else if(!newContent){
      toastWarnNotify("Please Enter Content")
    }else{
      toastSuccessNotify("New Blog Successfully Added")
      navigate("/")
    }
  
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
          New Blog
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
           
            id="outlined-required"
            label="Title"
            name="newTitle"
            autoComplete="title"
            autoFocus
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          />
          <TextField
           required
            id="outlined-required"
            margin="normal"
            fullWidth
            name="newImageUrl"
            label="İmage Url"
            value={newImageUrl}
            autoComplete="imgUrl"
            onChange={(e) => setNewImageUrl(e.target.value)}
          />
          <TextField
           required
            id="outlined-multiline-flexible"
            label="Content"
            name="newContent"
            multiline
            fullWidth
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
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
