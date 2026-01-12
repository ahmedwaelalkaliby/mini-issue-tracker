import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { addIssue } from "../redux/Slices/issuesSlice";
import { useNavigate } from "react-router-dom";
import { issueSchema, type IssueFormData } from "../schemas/issueSchema";
import { useState } from "react";
import Toast from "./Toast";

export default function IssueForm() {
  const dispatch = useDispatch();
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

  const onSubmit = async (data: IssueFormData) => {
    try {
      const newIssue = {
        id: `local-${Date.now()}`,
        title: data.title,
        body: data.description,
        priority: data.priority,
        status: data.status,
        createdAt: new Date().toISOString(),
        isLocal: true,
      };

      dispatch(addIssue(newIssue));
      
     
      setShowToast(true);
      
      
      reset();
      
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error creating issue:", error);
    }
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
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className={`border p-2 w-full rounded focus:outline-none focus:ring-2 ${
              errors.title 
                ? "border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter issue title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>⚠</span>
              <span>{errors.title.message}</span>
            </p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={5}
            {...register("description")}
            className={`border p-2 w-full rounded focus:outline-none focus:ring-2 resize-none ${
              errors.description 
                ? "border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Describe the issue in detail"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>⚠</span>
              <span>{errors.description.message}</span>
            </p>
          )}
        </div>

        {/* Priority Field */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-1 text-gray-700">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            id="priority"
            {...register("priority")}
            className={`border p-2 w-full rounded focus:outline-none focus:ring-2 ${
              errors.priority 
                ? "border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:ring-blue-500"
            }`}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>⚠</span>
              <span>{errors.priority.message}</span>
            </p>
          )}
        </div>

        {/* Status Field */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1 text-gray-700">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            {...register("status")}
            className={`border p-2 w-full rounded focus:outline-none focus:ring-2 ${
              errors.status 
                ? "border-red-500 focus:ring-red-500" 
                : "border-gray-300 focus:ring-blue-500"
            }`}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>⚠</span>
              <span>{errors.status.message}</span>
            </p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Creating..." : "Create Issue"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={isSubmitting}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}