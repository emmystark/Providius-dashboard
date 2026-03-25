// import { CheckIcon } from "./Icons/CheckIcon";

const STEPS = [
  { n: 1, label: "Account" },
  { n: 2, label: "Workspace" },
  { n: 3, label: "Channels" },
  { n: 4, label: "Train AI" },
];

export default function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, i) => {
        const done = step.n < current;
        const active = step.n === current;
        return (
          <div key={step.n} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                  done || active
                    ? "bg-[#0D9488] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {/* {done ? <CheckIcon size={13} /> : step.n} */}
              </div>
              <span
                className={`text-sm font-medium ${
                  active ? "text-[#0D9488]" : done ? "text-[#0D9488]" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-3 h-px w-14 ${
                  done ? "bg-[#0D9488]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
