import React, { useEffect, useState } from 'react';
import UploadSubCategory from '../components/UploadSubCategory';
import AxiosTostError from "../utils/AxiosTosterror";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useSelector } from 'react-redux';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { IoClose } from "react-icons/io5";


const SubCategory = () => {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubcategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosTostError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const columns = [
    {
      header: "Image",
      accessorKey: "image",
      cell: (info) => {
        const imgUrl = info.getValue();
        return (
          <img
            src={imgUrl}
            alt="sub"
            className="w-10 h-10 object-cover rounded cursor-pointer"
            onClick={() => setSelectedImage(imgUrl)}
          />
        );
      },
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Category Name",
      accessorFn: (row) => row.category?.name || "N/A",
      id: "categoryName",
    },
    // {
    //   header: "Category Image",
    //   accessorFn: (row) => row.category?.image,
    //   id: "categoryImage",
    //   cell: (info) => {
    //     const imgUrl = info.getValue();
    //     return imgUrl ? (
    //       <img
    //         src={imgUrl}
    //         alt="cat"
    //         className="w-10 h-10 object-cover rounded cursor-pointer"
    //         onClick={() => setSelectedImage(imgUrl)}
    //       />
    //     ) : (
    //       "No Image"
    //     );
    //   },
    // },
    {
      header: "Actions",
      id: "actions",
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-xs md:text-sm">
            <button
              className="px-3 py-1 border border-green-500 text-green-600 rounded hover:bg-green-100"
              onClick={() => handleEdit(rowData)}
            >
              Edit
            </button>
            <button
              className="px-1.5 py-1 border border-red-500 text-red-600 rounded hover:bg-red-100"
              onClick={() => handleDelete(rowData._id)}
            >
              Delete
            </button>
          </div>
        );
      },
    }
  ];
  
  
  

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="flex flex-col">
      {/* Header */}
      <div className="text-xl font-bold bg-white shadow-md p-2 flex items-center justify-between mb-4">
        <h2 className="font-semibold">SubCategories</h2>
        <button
          onClick={() => setOpenUploadSubCategory(true)}
          className="px-3 py-2 border border-primary-200 hover:bg-primary-200 text-black font-bold text-sm rounded transition"
        >
          Add SubCategory
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-3 rounded shadow mb-3">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-2 border-b text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-2 border-b text-sm font-semibold">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr> 
            ))}
          </tbody>
        </table>
        {loading && <p className="text-center mt-4">Loading...</p>}
      </div>

      {/* Image Modal */}
      {selectedImage && (
  <div
    className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
    onClick={() => setSelectedImage(null)}
  >
    <div
      className="relative bg-white p-4 rounded shadow-lg max-w-sm w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={selectedImage}
        alt="Preview"
        className="w-[200px] h-[200px] object-contain mx-auto rounded"
      />

      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
      >
        <IoClose size={24} />
      </button>
    </div>
  </div>
)}


      {/* Upload Modal */}
      {openUploadSubCategory && (
        <UploadSubCategory
          close={() => setOpenUploadSubCategory(false)}
          onSuccess={fetchSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategory;
