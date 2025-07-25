import Link from "next/link";

const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 && (
        <Link
          href={`/services?page=${page - 1}`}
          className="mr-2 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          Previous
        </Link>
      )}

      <span className="mx-2 text-gray-700 font-medium">
        Page {page} of {totalPages} results
      </span>

      {page < totalPages && (
        <Link
          href={`/services?page=${page + 1}`}
          className="ml-2 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
