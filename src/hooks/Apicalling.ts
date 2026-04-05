import { logout } from "@/lib/auth";
import { commentLike, commentReply, createPost, getAllPosts, postComment, postLike, repliesLike } from "@/lib/Feed";
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

export function useCreatePost(token: string, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  
  return useMutation({

    mutationFn: (data: { text: string; image?:File, isPublic:boolean}) => createPost(token, data.text, data.image, data.isPublic),
   
    onSuccess: (data) => {
      toast.success(data?.message || "Post created successfully!");

      queryClient.invalidateQueries({ queryKey: ["feed"] });
      
      if (onSuccessCallback) onSuccessCallback();
    
    },
    onError: (error: unknown) => {
      if (error instanceof Error)
        toast.error(error.message || "Post created failed");
      else toast.error("Post created failed");
    },
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


export function usePostLike(token: string, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  
  return useMutation({

    mutationFn: (data: {postId: string }) => postLike(token, data.postId),
   
    onSuccess: (data) => {
      toast.success(data?.message || "Like Update successfully");

      queryClient.invalidateQueries({ queryKey: ["feed"] });
      
      if (onSuccessCallback) onSuccessCallback();
    
    },
    onError: (error: unknown) => {
      if (error instanceof Error)
        toast.error(error.message || "Like failed");
      else toast.error("Like failed");
    },
  });
}


export function useCommentike(token: string, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  
  return useMutation({

    mutationFn: (data: {comment: string }) => commentLike(token, data.comment),
   
    onSuccess: (data) => {
      toast.success(data?.message || "Comment Like  successfully");

      queryClient.invalidateQueries({ queryKey: ["feed"] });
      
      if (onSuccessCallback) onSuccessCallback();
    
    },
    onError: (error: unknown) => {
      if (error instanceof Error)
        toast.error(error.message || "Like failed");
      else toast.error("Like failed");
    },
  });
}


export function useRepliesLike(token: string, onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();
  
  return useMutation({

    mutationFn: (data: {replyId: string }) => repliesLike(token, data.replyId),
   
    onSuccess: (data) => {
      toast.success(data?.message || "Reply Like  successfully");

      queryClient.invalidateQueries({ queryKey: ["feed"] });
      
      if (onSuccessCallback) onSuccessCallback();
    
    },
    onError: (error: unknown) => {
      if (error instanceof Error)
        toast.error(error.message || "Like failed");
      else toast.error("Like failed");
    },
  });
}

export function useLogout(token:string, onSuccessCallback?: () => void) {  
  return useMutation({ mutationFn: () => logout(token),
   
    onSuccess: (data) => {
      toast.success(data?.message || "Logout  successfully");
      
      if (onSuccessCallback) onSuccessCallback();
    
    },
    onError: (error: unknown) => {
      if (error instanceof Error)
        toast.error(error.message || "logout failed");
      else toast.error("logout failed");
    },
  });
}