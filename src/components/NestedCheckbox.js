import React, { useState, useEffect, useRef } from 'react';
import './NestedCheckbox.css';

export default function NestedCheckbox() {
  const [checkedItems, setCheckedItems] = useState({
    selectAll: false,
    fruits: {
      parent: false,
      children: {
        apple: false,
        banana: false,
        orange: false,
      },
    },
    vegetables: {
      parent: false,
      children: {
        carrot: false,
        broccoli: false,
        potato: false,
      },
    },
  });

  const fruitsRef = useRef();
  const vegetablesRef = useRef();
  const selectAllRef = useRef();

  useEffect(() => {
    const fruits = Object.values(checkedItems.fruits.children);
    const vegetables = Object.values(checkedItems.vegetables.children);

    fruitsRef.current.indeterminate = fruits.some(Boolean) && !fruits.every(Boolean);
    vegetablesRef.current.indeterminate = vegetables.some(Boolean) && !vegetables.every(Boolean);

    const allChecked = [...fruits, ...vegetables].every(Boolean);
    const someChecked = [...fruits, ...vegetables].some(Boolean);
    selectAllRef.current.indeterminate = someChecked && !allChecked;
  }, [checkedItems]);

  // ✅ Selected Items Logic
  const selectedItems = [
    ...Object.entries(checkedItems.fruits.children)
      .filter(([_, val]) => val)
      .map(([key]) => key),
    ...Object.entries(checkedItems.vegetables.children)
      .filter(([_, val]) => val)
      .map(([key]) => key),
  ];

  // ✅ Reset Button Logic
  const handleReset = () => {
    setCheckedItems({
      selectAll: false,
      fruits: {
        parent: false,
        children: {
          apple: false,
          banana: false,
          orange: false,
        },
      },
      vegetables: {
        parent: false,
        children: {
          carrot: false,
          broccoli: false,
          potato: false,
        },
      },
    });
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setCheckedItems({
      selectAll: checked,
      fruits: {
        parent: checked,
        children: {
          apple: checked,
          banana: checked,
          orange: checked,
        },
      },
      vegetables: {
        parent: checked,
        children: {
          carrot: checked,
          broccoli: checked,
          potato: checked,
        },
      },
    });
  };

  const handleParentChange = (category) => (e) => {
    const checked = e.target.checked;
    setCheckedItems((prev) => ({
      ...prev,
      [category]: {
        parent: checked,
        children: Object.fromEntries(
          Object.keys(prev[category].children).map((key) => [key, checked])
        ),
      },
    }));
  };

  const handleChildChange = (category, item) => (e) => {
    const checked = e.target.checked;
    setCheckedItems((prev) => {
      const updatedChildren = {
        ...prev[category].children,
        [item]: checked,
      };
      const allChecked = Object.values(updatedChildren).every(Boolean);
      return {
        ...prev,
        [category]: {
          parent: allChecked,
          children: updatedChildren,
        },
      };
    });
  };

  return (
    <div className="nested-container">
      <h2>Nested Checkbox</h2>

      <label>
        <input
          type="checkbox"
          ref={selectAllRef}
          checked={checkedItems.selectAll}
          onChange={handleSelectAll}
        />
        Select All
      </label>

      <div className="nested-group">
        <label>
          <input
            type="checkbox"
            ref={fruitsRef}
            checked={checkedItems.fruits.parent}
            onChange={handleParentChange('fruits')}
          />
          Fruits
        </label>
        <div className="nested-items">
          {Object.keys(checkedItems.fruits.children).map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={checkedItems.fruits.children[item]}
                onChange={handleChildChange('fruits', item)}
              />
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="nested-group">
        <label>
          <input
            type="checkbox"
            ref={vegetablesRef}
            checked={checkedItems.vegetables.parent}
            onChange={handleParentChange('vegetables')}
          />
          Vegetables
        </label>
        <div className="nested-items">
          {Object.keys(checkedItems.vegetables.children).map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={checkedItems.vegetables.children[item]}
                onChange={handleChildChange('vegetables', item)}
              />
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="selected-output">
          <strong>Selected:</strong> {selectedItems.join(', ')}
        </div>
      )}

      <button className="reset-button" onClick={handleReset}>
        Reset All
      </button>
    </div>
  );
}