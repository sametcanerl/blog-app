
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MyBlog from "./MyBlogs";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <MyBlog />
    // <Container maxWidth="md">
    //   <Box mt={10} >
    //     <Typography>
    //       {`Name : ${currentUser.displayName ? currentUser.displayName : "User"}`}
    //     </Typography>
    //     <Typography>
    //       {`Email : ${currentUser.email} `}
    //     </Typography>
    //   </Box>

  
    // </Container>
  );
}
