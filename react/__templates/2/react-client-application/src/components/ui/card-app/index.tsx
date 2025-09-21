// import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useState } from "react";

// const Card = styled.div`
//   background-color: blue;
//   color: white;
//   padding: 10px;
//   border: 1px solid black;
//   border-radius: 5px;

//   &:hover {
//     background-color: darkblue;
//   }

//   .imageCss {
//     width: 400px;
//     height: 300px;
//   }
// `;

// const Image = styled.img`
//   width: 400px;
//   height: 300px;
// `;

const defaultImage = "https://elbitsystems.com/media/WP-PULS.jpg";
export default function CardApp() {
  const [url, setUrl] = useState(defaultImage);

  return (
    <Card style={{ width: "300px" }}>
      <CardContent>
        <TextField
          onChange={(event) => {
            setUrl(event.target.value);
          }}
          id="outlined-basic"
          label="image"
          variant="outlined"
        />

        <img height={150} width={150} src={url} />
      </CardContent>
      <CardActions>
        <LikeSection />
      </CardActions>
    </Card>
  );
}

export function LikeSection() {
  // console.log("Like section render");
  const [likes, setLikes] = useState(0);
  return (
    <div>
      <Button
        onClick={() => {
          setLikes(likes + 1);
        }}
        size="small"
      >
        Like
      </Button>
      👍 {likes}
    </div>
  );
}
