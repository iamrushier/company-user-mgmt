import React from "react";
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

interface CommentCardProps {
  comment: {
    id: number;
    name: string;
    email: string;
    body: string;
  };
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <ListItem sx={{ display: "block", width: "100%", mb: 2, p: 0 }}>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "#f8f9fa",
          border: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ bgcolor: "secondary.light", width: 40, height: 40 }}>
            {comment.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {comment.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <EmailIcon
                fontSize="small"
                color="action"
                sx={{ fontSize: 14 }}
              />
              <Typography variant="caption" color="text.secondary">
                {comment.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
          {comment.body}
        </Typography>
      </Paper>
    </ListItem>
  );
};

export default CommentCard;
