import ArrowDown from "@/assets/arrow-down";
import FilterIcon from "@/assets/filter";
import Refresh from "@/assets/refresh";
import _ from "lodash";

interface Props {
    filter: string;
    changeFilter: (filter: "recent" | "popular") => void;
    refetch: () => void;
}

export default function SortDiv({ filter, changeFilter, refetch }: Props) {
  return (
    <div className="ml-2 flex items-center justify-between my-1">
      <div className="flex items-center">
        <FilterIcon />
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost mx-1">
            {_.capitalize(filter)}
            <ArrowDown />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52"
          >
            <li onClick={() => changeFilter("recent")}>
              <a>Recent</a>
            </li>
            <li onClick={() => changeFilter("popular")}>
              <a>Popular</a>
            </li>
          </ul>
        </div>
      </div>
      <button className="btn btn-sm" onClick={() => refetch()}>
        <Refresh />
      </button>
    </div>
  );
}
