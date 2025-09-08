"use client";

import { useState } from "react";

export default function ActionItems() {
    // items from admin projects page go here
  const [items, setItems] = useState([
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: false },
  ]);

  return (
    <>
      <div className="w-fit dashboard-card-container">
        <h2 className="dashboard-container-header">Action Items</h2>
        <div className="flex flex-col items-start justify-start w-full">
          {items.map((item) => (
            <label key={item.id} className="flex items-center gap-2 text-sm sm:text-lg md:text-xl lg:text-xl py-1">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={(e) => {
                  setItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id
                        ? { ...i, completed: e.target.checked }
                        : i
                    )
                  );
                }}
              />
              {item.text}
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
