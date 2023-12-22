export const getSinglePost = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const res = await fetch(
    `${process.env.AUTH0_BASE_URL}/api/post/${params.slug}`
  , {cache: "no-store"});

  const data = await res.json();

  return data;
};
