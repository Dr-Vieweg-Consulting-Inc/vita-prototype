import { Tabs as MUITabs, Tab } from "@mui/material";

interface Props {
  value: number;
  onChange: (value: number) => void;
  labels: string[];
}

export function Tabs(props: Props) {
  return (
    <MUITabs
      value={props.value}
      onChange={(_, value) => props.onChange(value as number)}
      sx={{ mt: 2 }}
    >
      {props.labels.map((item, i) => (
        <Tab
          key={i}
          label={item}
          sx={{
            "&.Mui-selected": { outline: "none" },
            "&:focus": { outline: "none" },
          }}
        />
      ))}
    </MUITabs>
  );
}
