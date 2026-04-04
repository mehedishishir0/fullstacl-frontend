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

export async function commentReply(token: string, text: string, commentId: string) {
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