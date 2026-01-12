import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .trim()
    .refine((val) => !/^\d+$/.test(val), {
      message: "Title cannot contain only numbers",
    })
    .refine((val) => /[a-zA-Z]/.test(val), {
      message: "Title must contain at least one letter",
    }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .trim()
    .refine((val) => !/^\d+$/.test(val), {
      message: "Description cannot contain only numbers",
    })
    .refine((val) => /[a-zA-Z]/.test(val), {
      message: "Description must contain at least one letter",
    }),
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