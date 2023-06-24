const getCategorys = async () => {
  const res: any = await fetch("http://localhost:4000/category", {
    next: { revalidate: 60 },
  });
  const { data } = await res.json();
  return data;
};
export default getCategorys;
