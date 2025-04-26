import { Box, FormControl, NativeSelect, Typography } from "@mui/material";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 9000,
    amt: 2100,
  },
  {
    name: "Aug",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Sep",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Oct",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Nov",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Dec",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
];

 function CustomLineChart() {
  return (
    <>
      <Box className='chart-wrapper' width={"100%"}>
        <Box className='payment-history'>
          <Typography>Payout history in</Typography>
          <FormControl className="graph-select" sx={{ minWidth: 173 }}>
            <NativeSelect
              defaultValue={10}
              inputProps={{
                name: 'year',
                id: 'year',
              }}
            >
              <option value={10}>This Year</option>
              <option value={20}>Last Year</option>
            </NativeSelect>
          </FormControl>
        </Box>
        <ResponsiveContainer width={"100%"} height={330}>
          <LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis tickFormatter={(value) => Math.abs(value) >= 1000 ? `${(value / 1000).toLocaleString()}K` : value} />
            <Tooltip />
            <Legend />
            <Line
              dataKey="pv"
              stroke="#6976EB"
              activeDot={{ r: 8 }}
            ></Line>
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}

export default CustomLineChart;