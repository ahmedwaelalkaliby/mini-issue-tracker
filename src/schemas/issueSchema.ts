import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .trim(),
  priority: z
    .enum(["Low", "Medium", "High"])
    .refine((val) => val !== undefined, {
      message: "Priority is required",
    }),
  status: z
    .enum(["Open", "In Progress", "Closed"])
    .refine((val) => val !== undefined, {
      message: "Status is required",
    }),
});

export type IssueFormData = z.infer<typeof issueSchema>;