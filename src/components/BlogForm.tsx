import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useBlogsData } from "../../store/context/BlogsDataContext";

import { IBlog } from "../../types";
import { useAuthUserStore } from "../../store/zustand/AuthUserStore";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  link: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

const BlogForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { data: blogs, dispatch } = useBlogsData();
  const { user } = useAuthUserStore();
  const [isEditMode, setIsEditMode] = useState(!isEditing);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  useEffect(() => {
    if (isEditing) {
      const blog = blogs.find((b) => b.id === Number(id));
      if (blog) {
        Object.keys(blog).forEach((key) =>
          setValue(key as keyof BlogFormData, String(blog[key as keyof IBlog]))
        );
        setIsEditMode(false);
      } else {
        alert("Blog not found!");
        navigate("/blogs");
      }
    } else {
      reset();
      setIsEditMode(true);
    }
  }, [id, isEditing, blogs, setValue, reset]);

  const onSubmit = (data: BlogFormData) => {
    if (isEditing) {
      const existingBlog = blogs.find((b) => b.id === Number(id));
      if (!existingBlog) {
        alert("Blog not found!");
        return;
      }
      dispatch({
        type: "UPDATE_BLOG",
        payload: [
          {
            ...data,
            link: data.link || "",
            id: Number(id),
            userId: existingBlog.userId,
            comment_count: existingBlog.comment_count,
          },
        ],
      });
      alert("Blog updated successfully!");
    } else {
      const newBlog = {
        ...data,
        link: data.link || "",
        id: Date.now(),
        userId: user?.id ?? 0,
        comment_count: 0,
      };
      dispatch({ type: "ADD_BLOG", payload: [newBlog] });
      alert("Blog added successfully!");
    }
    navigate("/blogs");
  };

  return (
    <Container>
      <Paper sx={{ p: 3, mt: 4, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" mb={2}>
          {isEditing ? "Edit Blog" : "Add New Blog"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Body"
                {...register("body")}
                error={!!errors.body}
                helperText={errors.body?.message}
                disabled={!isEditMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Link"
                {...register("link")}
                error={!!errors.link}
                helperText={errors.link?.message}
                disabled={!isEditMode}
              />
            </Grid>
          </Grid>

          <Box
            sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "flex-end" }}
          >
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  {isEditMode ? "Cancel" : "Edit"}
                </Button>
                {isEditMode && (
                  <Button variant="contained" color="success" type="submit">
                    Update
                  </Button>
                )}
              </>
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Add Blog
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default BlogForm;
