import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export const CopyRight = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/rubengarzon">
        Rubén Garzón
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};
