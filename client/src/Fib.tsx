import React, { FC, useState, useEffect } from 'react';
import fetch from 'cross-fetch';

const Fib: FC = () => {
  const [seenIndices, setSeenIndices] = useState<any>([]);
  const [values, setValues] = useState<any>({});
  const [index, setIndex] = useState<number | undefined>();

  const fetchValues = async () => {
    const values = await fetch('/api/values/current', {
      method: 'GET',
    });

    if (values) {
      setValues(await values.json());
    }
  };

  const fetchIndices = async () => {
    const seenIndices = await fetch('/api/values/all', {
      method: 'GET',
    });

    if (seenIndices) {
      setSeenIndices(await seenIndices.json());
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!index) {
      return;
    }

    await fetch('/api/values', {
      method: 'POST',
      body: JSON.stringify({
        index,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setIndex(undefined);
  };

  const renderSeenIndices = () => {
    return seenIndices.map(({ number }: any) => number).join(', ');
  };

  const renderCalculatedValues = () => {
    const entries: any[] = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  useEffect(() => {
    fetchValues();
    fetchIndices();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          name='index'
          value={index}
          onChange={(event) => setIndex(+event.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indices I have seen:</h3>
      {renderSeenIndices()}

      <h3>Calculated values:</h3>
      {renderCalculatedValues()}
    </div>
  );
};

export default Fib;
