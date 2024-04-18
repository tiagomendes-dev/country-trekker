import Image from "next/image";
import { useState } from "react";

import { getCountries } from "@/app/api/country";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default async function Table() {
  const [page, setPage] = useState(1);
  const countries = await getCountries();

  const totalPages = Math.ceil(countries.length / 10);

  function goToFirstPage() {
    setPage(1);
  }
  function goToPreviousPage() {
    setPage(page - 1);
  }
  function goToNextPage() {
    setPage(page + 1);
  }
  function goToLastPage() {
    setPage(totalPages);
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>País</th>
            <th>Nome Oficial</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {countries.slice((page - 1) * 10, page * 10).map((country) => (
            <tr className="hover" key={country.name.common}>
              <th>{country.translations.por.common}</th>
              <td>{country.translations.por.official}</td>
              <td align="right">
                <Image
                  src={country.flags.svg}
                  alt={country.flags.alt}
                  width={20}
                  height={20}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th align="left">Mostrando 10 de {countries.length} itens</th>
            <th align="right" colSpan={2}>
              <div className="join">
                <button
                  className="join-item btn btn-xs"
                  onClick={goToFirstPage}
                  disabled={page === 1}
                >
                  <ChevronsLeft size={12} />
                </button>
                <button
                  className="join-item btn btn-xs"
                  onClick={goToPreviousPage}
                  disabled={page === 1}
                >
                  <ChevronLeft size={12} />
                </button>
                <button className="join-item btn btn-xs">Página {page}</button>
                <button
                  className="join-item btn btn-xs"
                  onClick={goToNextPage}
                  disabled={page === totalPages}
                >
                  <ChevronRight size={12} />
                </button>
                <button
                  className="join-item btn btn-xs"
                  onClick={goToLastPage}
                  disabled={page === totalPages}
                >
                  <ChevronsRight size={12} />
                </button>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
