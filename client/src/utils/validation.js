import { z } from "zod";

// User Sign Up Schema
export const signUpSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    avatar: z.url("Invalid Avatar URL").optional().or(z.literal("")),
});

// User Sign Up Schema
export const signInSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

// User Update Schema
export const userUpdateSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    avatar: z.url("Invalid Avatar URL").optional().or(z.literal("")),
})

// Channel Schema
export const channelSchema = z.object({
    channelName: z.string().min(1, "Channel Name is required"),
    handle: z
        .string()
        .min(3, "Handle must be atleast 3 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Handle can only contain letters, numbers, and underscores"),
    description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
    channelAvatar: z.url("Invalid Avatar URL").optional().or(z.literal("")),
    channelBanner: z.url("Invalid Banner URL").optional().or(z.literal("")),
});

// Video Schema
export const videoSchema = z.object({
    title: z.string().min(1, "Video Title is required").max(100, "Title too long (max 100 chars)"),
    description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
    thumbnailUrl: z.url("Invalid Thumbnail URL").min(1, "Thumbnail URL is required"),
    videoUrl: z.url("Invalid Video URL").optional().or(z.literal("")),
    tags: z.array(z.string()).optional(),
});

// Comment Schema
export const commentSchema = z.object({
    description: z.string()
        .min(1, "Comment cannot be empty")
        .max(500, "Comment is too long (max 500 chars)")
});