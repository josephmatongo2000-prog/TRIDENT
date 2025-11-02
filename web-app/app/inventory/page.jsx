"use client";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const res = await axios.get("http://localhost:4000/inventory"); // backend route
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchInventory();
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Inventory List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.sku}</td>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
