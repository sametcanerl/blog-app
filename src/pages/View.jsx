
import Typography from "@mui/material/Typography";


import { useLocation } from "react-router-dom";

import { Container } from "@mui/system";
import defaultImage from "../assets/defaultImage.jpg";
import { CardMedia } from "@mui/material";
export default function View() {
  const { state } = useLocation();

  return (
    <Container key={state.id} maxWidth="md">
      <CardMedia
        component="img"
        sx={{
          objectFit: "unset",

          pt: "20%",
        }}
        image={state.newImageUrl ? state.newImageUrl : defaultImage}
        alt="random"
        height="200"
      />
      <Typography variant="h2">{state.newTitle}</Typography>
      <Typography>{state.newContent}</Typography>
    </Container>
  );
}
