import react, { useEffect, useState } from "react";
import { resolvePath, useNavigate } from "react-router-dom";

import {
  getKatasFromUser,
  getUserByEmail,
  getAllKatas,
} from "../services/katasService";
import { AxiosResponse } from "axios";
import { IKata } from "../utils/types/IKata.type";

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

import { useSessionStorage } from "../hooks/useSessionStorage";

import { deleteKata } from "../services/katasService";

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

export const KatasPage = () => {
  // Define Theme
  const theme = createTheme();
  let token: any = useSessionStorage("token");
  let email: any = useSessionStorage("email");

  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  // Show / HIde the drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
    alert("Has cerrado sesión");
  };
  let loggedIn = useSessionStorage("token");
  const [katas, setKatas] = useState<IKata[]>([]);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      getUserByEmail(token, email).then((response: AxiosResponse) => {
        if (response.data.rol === "usuario") {
          getKatasFromUser(token, response.data._id).then((response) => {
            setKatas(response.data.katas);
          });
        } else {
          getAllKatas(token).then((response) => {
            setKatas(response.data.katas);
          });
        }
      });
    }
  }, [loggedIn, navigate, token, email]);

  /**
   * Function to navigate to the kata detail page
   * @param _id  - id of the kata
   */
  const navigateToKataDetail = (_id: number) => {
    navigate(`/katas/${_id}`);
  };
  const getKatas = () => {
    getUserByEmail(token, email)
      .then((response: AxiosResponse) => {
        getKatasFromUser(token, response.data._id).then((response) => {
          setKatas(response.data.katas);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /**
   * Function navigate to edit kata
   * @param _id  - id of the kata
   */
  const editKata = (_id: any) => {
    navigate(`/editKata/${_id}`);
  };

  /**
   * Function to delete a kata
   * @param _id  - id of the kata
   */
  const borrarKata = (_id: any) => {
    deleteKata(_id, token)
      .then((response) => {
        alert("Kata borrada");
        getKatas();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const levelSpanish = (level: string) => {
    switch (level) {
      case "Basic":
        return "Básico";
      case "Medium":
        return "Intermedio";
      case "High":
        return "Avanzado";
    }
  };

  return (
    <div>
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
              <Button variant="contained" sx={{ mb: 4 }} href="/createKata">
                Crear kata
              </Button>
              <Grid container spacing={3}>
                {katas.map((kata) => (
                  <Grid item xs={12} md={4} lg={3} key={kata._id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {kata.name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {kata.description}
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Rating
                            name="read-only"
                            value={kata.stars}
                            readOnly
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {levelSpanish(kata.level)}
                        </Typography>
                      </CardContent>
                      <CardActions className="cardActionCenter">
                        <Button size="small" onClick={() => editKata(kata._id)}>
                          Editar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => borrarKata(kata._id)}
                        >
                          Borrar
                        </Button>
                        <Button
                          size="small"
                          color="success"
                          onClick={() => navigateToKataDetail(kata._id)}
                        >
                          Leer más
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default KatasPage;
