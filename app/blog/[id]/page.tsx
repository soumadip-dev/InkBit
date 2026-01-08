interface BlogProps {
  params: Promise<{ id: string }>;
}
export default async function BlogIdPage({ params }: BlogProps) {
  const { id } = await params;
  return (
    <div>
      <h1>Blog {id}</h1>
    </div>
  );
}
