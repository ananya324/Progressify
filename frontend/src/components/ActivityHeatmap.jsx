import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const ActivityHeatmap = ({ data }) => {
  return (
    <div>
      <h3 style={{ marginBottom: "10px" }}>Your Activity</h3>

      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={data}
        classForValue={(value) => {
          if (!value) return "color-empty";
          if (value.count >= 4) return "color-github-4";
          if (value.count >= 3) return "color-github-3";
          if (value.count >= 2) return "color-github-2";
          return "color-github-1";
        }}
      />
    </div>
  );
};

export default ActivityHeatmap;