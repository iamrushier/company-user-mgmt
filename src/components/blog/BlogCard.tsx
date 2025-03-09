import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IBlog } from "../../../types";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const BlogCard = ({ blog }: { blog: IBlog }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <CardActionArea onClick={() => navigate(`/blogs/${blog.id}`)}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {blog.title}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <ChatBubbleOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {blog.comment_count} Comments
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
