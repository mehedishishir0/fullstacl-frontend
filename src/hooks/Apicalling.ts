import { commentReply, getAllPosts, postComment } from "@/lib/Feed";
import { FeedResponse } from "@/types/allPostDataType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAllPosts(token: string) {
  return useQuery<FeedResponse>({
    queryKey: ["feed"],
    queryFn: () => {
      if (!token) throw new Error("Token is missing");
      return getAllPosts(token);
    },
    enabled: !!token,
  });
}

export function usePostComment(token: string, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  
  return useMutation({

    mutationFn: (data: { text: string; postId: string }) => postComment(token, data.text, data.postId),
   
    onSuccess: (data) => {
      toast.success(data?.message || "Comment posted successfully");

      queryClient.invalidateQueries({ queryKey: ["feed"] });
      
      if (onSuccessCallback) onSuccessCallback();
    
    },
    onError: (error: unknown) => {
      if (error instanceof Error)
        toast.error(error.message || "Comment failed");
      else toast.error("Comment failed");
    },
  });
}


export function usePostReplyComment(token: string, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  
  return useMutation({

    mutationFn: (data: { text: string; commentId: string }) => commentReply(token, data.text, data.commentId),
   
    onSuccess: (data) => {
      toast.success(data?.message || "Reply successfully");

      queryClient.invalidateQueries({ queryKey: ["feed"] });
      
      if (onSuccessCallback) onSuccessCallback();
    
    },
    onError: (error: unknown) => {
      if (error instanceof Error)
        toast.error(error.message || "Reply failed");
      else toast.error("Reply failed");
    },
  });
}
