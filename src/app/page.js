import prisma from "@/lib/prisma";
import BookList from "@/components/BookList";

const getData = async () => {
  try {
    const data = await prisma.book.findMany();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default async function Home() {
  const data = await getData();
  return (
    <>
      <BookList book={data} />
    </>
  );
}
