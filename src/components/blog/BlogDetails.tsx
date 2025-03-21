import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  List,
  Avatar,
  Box,
  Divider,
  Paper,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useBlogsData } from "../../../store/context/BlogsDataContext";
import { useCommentsData } from "../../../store/context/CommentsDataContext";
import { useState } from "react";
import { useAuthUserStore } from "../../../store/zustand/AuthUserStore";
import CommentCard from "./CommentCard";
import useRoleStore from "../../../store/zustand/RolesActionsStore";

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blogs, dispatch: blogDispatch } = useBlogsData();
  const { data: comments, dispatch: commentDispatch } = useCommentsData();
  const { user } = useAuthUserStore();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === Number(id));
  const blogComments = comments.filter((c) => c.postId === Number(id));

  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { roles } = useRoleStore();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const userRole =
    user && typeof user === "object" && "role" in user ? user.role : null;

  if (!blog)
    return (
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography color="error" variant="h6">
          Blog not found.
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/blogs")}
          sx={{ mt: 2 }}
        >
          Back to Blogs
        </Button>
      </Box>
    );

  const handleAddComment = () => {
    if (!newComment.trim()) {
      setCommentError("Please enter a comment");
      return;
    }

    setCommentError("");
    const comment = {
      postId: Number(id),
      id: comments.length + 1,
      name: user?.name || "Anonymous",
      email: user?.email || "anonymous@example.com",
      body: newComment,
    };

    commentDispatch({ type: "SET_COMMENTS", payload: [comment, ...comments] });
    setNewComment("");
  };
  const handleDeleteBlog = () => {
    if (userRole && roles[userRole]?.blogs?.read_write) {
      setSnackbar({
        open: true,
        message: "Blog is being deleted",
        severity: "error",
      });
      setTimeout(() => {
        blogDispatch({ type: "DELETE_BLOG", id: blog.id });
        setDeleteDialogOpen(false);
        navigate("/blogs");
      }, 2000);
    } else {
      setSnackbar({
        open: true,
        message: "You are not authorized to perform this action!",
        severity: "error",
      });
      setTimeout(() => {
        setDeleteDialogOpen(false);
        return;
      }, 1000);
    }
  };
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 3, px: 2 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/blogs")}
        sx={{ mb: 3 }}
      >
        Back to Blogs
      </Button>

      <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 4 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "primary.main" }}>B</Avatar>}
          title={<Typography variant="h5">{blog.title}</Typography>}
          action={
            userRole &&
            roles[userRole]?.blogs?.read_write && (
              <Box>
                <Tooltip title="Edit Blog">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/blogs/edit/${id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Blog">
                  <IconButton
                    color="error"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )
          }
        />
        <Divider />
        <CardContent>
          <Typography variant="body1">{blog.body}</Typography>
        </CardContent>
      </Card>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Comments ({blogComments.length})
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
            if (commentError) setCommentError("");
          }}
          error={!!commentError}
          helperText={commentError}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleAddComment}
          disabled={!newComment.trim()}
        >
          Post Comment
        </Button>

        <Divider sx={{ my: 3 }} />

        {blogComments.length > 0 ? (
          <List>
            {blogComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </List>
        ) : (
          <Typography textAlign="center" color="text.secondary">
            No comments yet. Be the first to comment!
          </Typography>
        )}
      </Paper>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{blog.title}"? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteBlog} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BlogDetails;
