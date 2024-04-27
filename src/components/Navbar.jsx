import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="navbar bg-base-100"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div>
        <Link href="/">
          <span className="btn btn-ghost text-white normal-case text-xl">
            HOME
          </span>
        </Link>
      </div>
      <div>
        <Link href="/login">
          <span className="btn btn-ghost text-white normal-case text-xl">
            LOGIN
          </span>
        </Link>
      </div>
      <div>
        <Link href="/add">
          <span className="btn btn-ghost text-white normal-case text-xl">
            ADD BOOK
          </span>
        </Link>
      </div>
    </nav>
  );
}
