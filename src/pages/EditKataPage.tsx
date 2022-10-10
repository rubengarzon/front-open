import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import React, { useEffect } from "react";
// Theme personalization of Material UI
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

// CSS & Drawer
import { CssBaseline, FormControl } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

// Nav bar
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Rating from "@mui/material/Rating";

// Material list
import List from "@mui/material/List";

// Icons
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Material Grids & Box
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// List for the menu
import MenuItems from "../components/dashboard/MenuItems";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import {
  createKata,
  getUserByEmail,
  updateKata,
  updateUser,
} from "../services/katasService";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { IKata } from "../utils/types/IKata.type";
import { getKataById } from "../services/katasService";
// With for the drawer
const drawerWidth: number = 240;

// Props form AppBar
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// App Bar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Drawer Menu
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    whiteSpace: "nowrap",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// Define Theme
const theme = createTheme();
export const EditKataPage = () => {
  const token = useSessionStorage("token");
  const email = useSessionStorage("email");
  const [open, setOpen] = useState(true);
  const [rol, setRol] = useState("");
  const [kata, setKata] = useState<any>({
    name: "",
    description: "",
    intents: "",
    level: "",
    stars: 0,
    solution: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserByEmail(token, email).then((res) => {
      setRol(res.data.rol);
    });
    if (id !== undefined) {
      getKataById(token, id).then((kata: any) => {
        setKata(kata.data);
      });
    }
  }, [id, token, email]);

  // Show / HIde the drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateKata(kata, kata._id, token)
      .then((response) => {
        alert("Kata actualizada");
      })
      .catch((error) => {
        alert("Error al actualizar la kata");
      });
  };
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
    alert("Has cerrado sesión");
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && {
                  display: "none",
                }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Code Verification Katas
            </Typography>
            <Typography component="p" color="inherit" noWrap sx={{}}>
              {rol === "usuario" ? "Usuario" : "Admin"}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={10} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {token !== null ? (
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            ) : null}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton color="inherit" onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{MenuItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mg: 4 }}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 610,
                }}
              >
                <Box
                  sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Editar Kata
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Nombre"
                      name="name"
                      value={kata?.name}
                      onChange={(e) =>
                        setKata({ ...kata, name: e.target.value })
                      }
                      autoComplete="name"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="description"
                      label="Descripción"
                      type="description"
                      id="description"
                      value={kata?.description}
                      onChange={(e) =>
                        setKata({ ...kata, description: e.target.value })
                      }
                      autoComplete="current-description"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="intents"
                      label="Intentos"
                      type="number"
                      id="intents"
                      value={kata?.intents}
                      onChange={(e) =>
                        setKata({ ...kata, intents: e.target.value })
                      }
                      autoComplete="current-intents"
                    />
                    <FormControl fullWidth>
                      <InputLabel id="nivelLabel">Nivel</InputLabel>
                      <Select
                        labelId="nivelLabel"
                        id="level"
                        value={kata?.level}
                        label="Nivel"
                        onChange={(e) => {
                          setKata({ ...kata, nivel: e.target.value });
                        }}
                      >
                        <MenuItem value="Basic">Básico</MenuItem>
                        <MenuItem value="Medium">Medio</MenuItem>
                        <MenuItem value="High">Avanzado</MenuItem>
                      </Select>
                    </FormControl>
                    <Box>
                      <Rating
                        name="stars"
                        id="stars"
                        value={kata?.stars}
                        onChange={(e) => {
                          setKata({
                            ...kata,
                            stars: e.currentTarget.getAttribute("value"),
                          });
                        }}
                      />
                    </Box>
                    <TextField
                      id="solution"
                      name="solution"
                      label="Solución"
                      multiline
                      rows={4}
                      value={kata?.solution}
                      onChange={(e) =>
                        setKata({ ...kata, solution: e.target.value })
                      }
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Editar
                    </Button>
                  </Box>
                </Box>
                {/* { <NewEditor /> } */}
                {/* <TipTapEditor /> */}
                {/* <FileUploader /> */}
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EditKataPage;
