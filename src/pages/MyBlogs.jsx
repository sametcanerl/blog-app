import { Box, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../context/AuthContext";
import image from "../assets/myBlog.jpg";
export default function MyBlog() {
  const { state } = useLocation();
  const { currentUser } = useContext(AuthContext);
  console.log(state);
  const blogFiltered = useMemo(() =>
    state.filter((blog) => blog.uid === currentUser.uid),[state,currentUser.uid]
  );

  return (
    <>
      <Container>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          mt: 3,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${image})`,
          pt: "20%",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
               {`Hi ${currentUser.displayName ? currentUser.displayName : "User"}`}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {blogFiltered.length === 0 && "Looks Like You Don't Have Any Blog"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      </Container>
   
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {blogFiltered?.map((card, index) => (
            <BlogCard key={index} {...card} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
