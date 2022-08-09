import {
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import BlogCard from "../components/BlogCard";
import image from "../assets/defaultImage.jpg";
import { Box, Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../utils/data";
import { AuthContext } from "../context/AuthContext";
import SearchIcon from "@mui/icons-material/SearchSharp";
export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const { blogCards } = useFetch();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
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
                WELCOME
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Share Your Experience And Knowledge With Us
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box component="form">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Blog"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>

      {currentUser && (
        <Box mt={4}>
          <Button variant="contained" onClick={() => navigate("/newblog")}>
            new blog add
          </Button>
          <Button
            sx={{ marginLeft: "1rem" }}
            variant="contained"
            onClick={() =>
              navigate("/myblogs", { state: blogCards, replace: false })
            }
          >
            My Blogs
          </Button>
        </Box>
      )}

      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {blogCards
            ?.filter((card) => {
              if (searchTerm === "") {
                return card;
              } else if (
                card.newTitle.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return card;
              }else{
                return false
              }
            })
            .map((card, index) => (
              <BlogCard key={index} {...card} />
            ))}
        </Grid>
      </Container>
    </Container>
  );
}
