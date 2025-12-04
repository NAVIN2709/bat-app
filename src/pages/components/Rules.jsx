import React from 'react';

const Rules = () => {
  const rules = [
    'Maximum 8 members per court',
    'Non-marking shoes only',
    'Keep the court clean',
    'No food or drinks on the court',
    'Respect other players',
    'Use only shuttle provided',
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
