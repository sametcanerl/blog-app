import Typography from "@mui/material/Typography";

import { useLocation, useNavigate } from "react-router-dom";

import { Container } from "@mui/system";
import defaultImage from "../assets/defaultImage.jpg";
import { Box, Button } from "@mui/material";
export default function View() {
  const { state } = useLocation();
  const navigate = useNavigate()

  return (
    <Container key={state.id} maxWidth="md">
      <Box sx={{ height: 400, pt: "5%" }}>
        <Box
          component="img"
          sx={{
            maxHeight: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          alt="The house from the offer."
          src={state.newImageUrl ? state.newImageUrl : defaultImage}
        />
      </Box>
      <Box sx={{mt:5}} >
        <Typography variant="h2">{state.newTitle}</Typography>
        <Typography>{state.newContent}</Typography>
        <Button
            type="submit"
        onClick={()=>navigate(-1)}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Go Back
          </Button>
      </Box>
    </Container>
  );
}
