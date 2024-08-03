import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./PieChartWithNeedle.scss";
import AnimatedNumber from "../AnimatedNumber";
import sumBy from "lodash/sumBy";
import { twMerge } from "tailwind-merge";

type Data = {
  name: string;
  value: number;
  color: string;
};

const score = (data: Data[], progress: number) => {
  const total = data.find((d, index, array) => {
    if (sumBy(array.slice(0, index + 1), "value") >= progress) {
      return d;
    }
  });
  return total;
};

const PieChartWithNeedle = ({
  data,
  value = 0,
}: {
  data: Data[];
  value: number;
}) => {
  const smallScreen = window.innerWidth < 640;
  return (
    <div className="  h-52 w-full relative flex align-bottom items-center flex-col mt-4">
      <div
        style={{ color: score(data, value)?.color }}
        className={twMerge(" flex flex-col items-center  text-2xl font-bold")}
      >
        <AnimatedNumber className="" value={value} duration={500} sign="%" />
        <p className="text-sm"> {score(data, value)?.name} </p>
      </div>
      <ResponsiveContainer minHeight={300} minWidth={300}>
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            stroke="none"
            innerRadius={"50%"}
            cornerRadius={5}
            gradientTransform="rotate(90)"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} style={{}} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 637 101"
        style={{
          position: "absolute",
          transformOrigin: "100%",
          height: "100px",
          width: "100px",
          left: "calc(50% - 100px)",
          bottom: "-40px",
          marginLeft: "auto",
          rotate: `${value * 1.8}deg`,
          transition: "rotate 1s ease-in-out",
        }}
      >
        <path
          fill="#000"
          id="Forme 1"
          className="fill-current "
          d="m587 101c-27.7 0-50-22.4-50-50 0-27.7 22.3-50 50-50 27.7 0 50 22.3 50 50 0 27.6-22.3 50-50 50z"
        />
        <path
          fill="#000"
          id="Forme 2"
          className="fill-current "
          d="m9.9 61.3c-12.5-0.7-12.5-19.3 0-20l577.1-33.3v86.6z"
        />
      </svg>
      {/* <div className=" h-24 w-24 bg-green-200 absolute bottom-0">mkkm</div> */}
    </div>
  );
};

export default PieChartWithNeedle;
