import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, deleteMutation, updateTitleMutation }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div> Is Error</div>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>{" "}
        {deleteMutation.isPending && (
          <p className="loading">Deleteing the post</p>
        )}
        {deleteMutation.isError && (
          <p className="error">
            Error deleteing the post: {deleteMutation.error.toString()}
          </p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Post was (not) deleted</p>
        )}
      </div>

      <div>
        <button onClick={() => updateTitleMutation.mutate(post.id)}>
          Update title
        </button>
        {updateTitleMutation.isPending && (
          <p className="loading">Updating the post</p>
        )}
        {updateTitleMutation.isError && (
          <p className="error">
            Error updaing the post: {updateTitleMutation.error.toString()}
          </p>
        )}
        {updateTitleMutation.isSuccess && (
          <p className="success">Title was (not) updated</p>
        )}
      </div>

      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
