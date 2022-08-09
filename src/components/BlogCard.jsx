

import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";


import { deleteBlog } from "../utils/data";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../assets/defaultImage.jpg";


import  { toastErrorNotify, toastWarnNotify } from "../helpers/ToasNotify";


export default function BlogCard({
  id,
  uid,
  newImageUrl,
  newTitle,
  newContent,
  newBlogCreateTime,
  email,
}) {
  const view = {
    id,
    uid,
    newImageUrl,
    newTitle,
    newContent,
    newBlogCreateTime,
    email,
  };

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          sx={{
            pt: "50.20",
            objectFit:"unset"

          }}
          image={newImageUrl ? newImageUrl : defaultImage}
          alt="random"
        
        />
        <CardContent>
          <Typography>{newBlogCreateTime}</Typography>
          <Typography mt={2} gutterBottom variant="h5" component="h2" noWrap>
            {newTitle}
          </Typography>
          <Typography variant="body2" mt={4} noWrap>
            {newContent}
          </Typography>
          <Typography mt={5}>{email}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              navigate("/view", { state: view, replace: false });
              !currentUser && toastWarnNotify('Please Sing in  to see detail');
            }}
          >
            View
          </Button>

          {uid === currentUser.uid && (
            <>
              <Button
                size="small"
                onClick={() =>
                  navigate("/editblog", { state: view, replace: false })
                }
              >
                Edit
              </Button>
              <Button size="small" onClick={() => {
                toastErrorNotify("Blog Deleted")
                deleteBlog(id)}}>
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
