import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import Product from '../../graphql/interfaces/product';
import { ymdToShortString } from '../../utils/parse';

interface Props {
  products: Product[];
}

type LineType = {
  datakey: string;
  name?: string;
};
const ReChartTest: React.FC<Props> = (props) => {
  const lines = getLines(props.products);
  const datas: any[] = [];

  for (const p of props.products) {
    const emCode = p.cs?.em?.code?.toString()!;
    const amount = p.count * (p.productListSub?.danga ?? 0);
    const foundData = datas.find((d) => d.dataKey === p.sellYmd);

    if (foundData) {
      if (foundData.hasOwnProperty(emCode)) {
        foundData[emCode] = +foundData[emCode] + amount;
      } else {
        foundData[emCode] = amount;
      }
    } else {
      const data: { [key: string]: any } = {};
      lines.forEach((l) => (data[l.datakey] = 0));
      datas.push({
        ...data,
        dataKey: p.sellYmd,
        [emCode]: amount,
      });
    }
  }

  const lineComponents = lines.map((l) => {
    return (
      <Bar
        key={l.datakey}
        dataKey={l.datakey.toString()}
        name={l.name}
        type="monotone"
        stroke="#a91"
        fill={getRandomColor()}
        // activeDot={{ r: 8 }}
      />
    );
  });

  return (
    <BarChart
      width={500}
      height={300}
      data={datas}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dataKey" tickFormatter={(value) => ymdToShortString(value)} />
      <YAxis />
      <Tooltip
        labelFormatter={(value) => ymdToShortString(value)}
        formatter={(value) => {
          return value.toLocaleString();
        }}
      />
      <Legend />
      {lineComponents}
    </BarChart>
  );
};

function getLines(products: Product[]): LineType[] {
  const lines: LineType[] = [];

  for (const p of products) {
    const emCode = p.cs?.em?.code?.toString();
    const emName = p.cs?.em?.name;
    if (!emCode) continue;

    if (!lines.some((l) => l.datakey === emCode)) {
      lines.push({ datakey: emCode, name: emName });
    }
  }
  return lines;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export default ReChartTest;
