import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { addIssue } from "../redux/Slices/issuesSlice";
import { issueSchema, type IssueFormData } from "../schemas/issueSchema";
import type { AppDispatch } from "../redux/store";
import type { Issue } from "../types/types";
import Toast from "./Toast";

export default function IssueForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      status: "Open",
    },
  });

  const onSubmit = (data: IssueFormData) => {
    const issue: Omit<Issue, "id"> = {
      title: data.title,
      body: data.description,
      priority: data.priority,
      status: data.status,
      createdAt: new Date().toISOString(),
      isLocal: true,
    };

    dispatch(addIssue(issue));

    setShowToast(true);
    reset();

    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <>
      {showToast && (
        <Toast
          message="Issue created successfully!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            {...register("title")}
            className={`border p-2 w-full rounded ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            rows={5}
            {...register("description")}
            className={`border p-2 w-full rounded ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-1">Priority *</label>
          <select
            {...register("priority")}
            className="border p-2 w-full rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status *</label>
          <select
            {...register("status")}
            className="border p-2 w-full rounded"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Creating..." : "Create Issue"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
