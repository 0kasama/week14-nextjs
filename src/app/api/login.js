import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
