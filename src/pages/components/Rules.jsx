import React from 'react';

const Rules = () => {
  const rules = [
    'Non-marking shoes only',
    'Keep the court clean',
    'Rackets/shuttlecocks shall be used with your own responsibility',
    'Lights and fans shall be turned off when not in use',
    'Maximum 8 players are allowed to play in a booked slot',
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-6">
      <h2 className="text-2xl font-bold mb-4">Rules & Regulations</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

export default Rules;
