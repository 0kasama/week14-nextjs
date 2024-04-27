export default async function handler(req, res) {
    const {
      query: { id },
      method,
    } = req;
  
    if (method === "PUT") {
      try {
        const { title, author, publisher, year, image } = req.body;
        const updatedBook = await prisma.book.update({
          where: { id: parseInt(id) },
          data: { title, author, publisher, year, image },
        });
        res.status(200).json(updatedBook);
      } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }

export default async function handler(req, res) {
    const {
      query: { id },
      method,
    } = req;
  
    if (method === "DELETE") {
      try {
        await prisma.book.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: "Book deleted successfully" });
      } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  