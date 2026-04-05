export async function getAllPosts(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/feed`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Failed to get posts");
  }
  return resData;
}

export async function postComment(token: string, text: string, postId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    },
  );

  const resData = await response.json();
  if (!response.ok)
    throw new Error(resData.message || "Failed to post comment");
  return resData;
}

export async function commentReply(
  token: string,
  text: string,
  commentId: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reply/${commentId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    },
  );

  const resData = await response.json();
  if (!response.ok)
    throw new Error(resData.message || "Failed to reply comment");
  return resData;
}

export async function createPost(token: string, text: string, image?: File, isPublic?:boolean) {
 
  const formData = new FormData();
  formData.append("text", text);
  formData.append("isPublic", String(isPublic))
  if (image) formData.append("image", image);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed/post`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to create post");
  return resData;
}

export async function postLike(token: string, postId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/feed/like/${postId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to post Like");
  return resData;
}

export async function commentLike(token: string, commentId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/like/${commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to Like comment");
  return resData;
}

export async function repliesLike(token: string, replyId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reply/like/${replyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to Like reply");
  return resData;
}

