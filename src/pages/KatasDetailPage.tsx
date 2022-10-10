import react, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "../components/editor/editor";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { getKataById } from "../services/katasService";
import { AxiosResponse } from "axios";
import { IKata } from "../utils/types/IKata.type";

import {
  getKatasFromUser,
  getUserByEmail,
  getAllKatas,
  updateUser,
} from "../services/katasService";

// Theme personalization of Material UI
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

// CSS & Drawer
import { Alert, CssBaseline, Rating } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

// Nav bar
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// List for the menu
import MenuItems from "../components/dashboard/MenuItems";
import { Link, useNavigation } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { NewEditor } from "../components/editor/NewEditor";
import NuevoEditor from "../components/editor/NuevoEditor";

export const KatasDetailPage = () => {
  let token: any = useSessionStorage("token");
  let email: any = useSessionStorage("email");
  const [rol, setRol] = useState("");
  const theme = createTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const [kata, setKata] = useState<IKata | undefined>(undefined);
  const [showSolution, setShowSolution] = useState(true);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
    alert("Has cerrado sesión");
  };

  let loggedIn = useSessionStorage("token");
  // With for the drawer
  const drawerWidth: number = 240;

  // Props form AppBar
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      getUserByEmail(token, email).then((response: AxiosResponse) => {
        setRol(response.data.rol);
      });
      if (id) {
        getKataById(loggedIn, id)
          .then((response: AxiosResponse) => {
            if (response.status === 200 && response.data) {
              let kataResponse = {
                _id: response.data._id,
                name: response.data.name,
                description: response.data.description,
                stars: response.data.stars,
                level: response.data.level,
                intents: response.data.intents,
                creator: response.data.creator,
                solution: response.data.solution,
                participants: response.data.participants,
              };
              setKata(kataResponse);
            } else {
              throw new Error("Error getting kata" + response.data);
            }
          })
          .catch((error) => {
            console.log(`[Get kata by id] Error: ${error}`);
          });
      } else {
        navigate("/katas");
      }
    }
  }, [loggedIn, navigate, id]);

  return (
    <div>
      <h1>Katas Detail Page: {id}</h1>
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
              {kata ? (
                <div className="kata-data">
                  <h2>{kata.description}</h2>
                  <NuevoEditor />
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Enviar
                  </Button>
                  {/* <Button onClick={() => setShowSolution(!showSolution)}>
                    {showSolution ? "Show Solution" : "Hide Solution"}
                  </Button>
                  {showSolution ? null : <Editor code={kata?.solution} />} */}
                </div>
              ) : (
                <div>
                  <h2>Loading data...</h2>
                </div>
              )}
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default KatasDetailPage;
