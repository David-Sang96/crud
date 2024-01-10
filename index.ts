import cors from "cors";
import express from "express";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

interface Menu {
  id: number;
  name: string;
  price: number;
  assetUrl: string;
  isArchived: boolean;
}

let menus: Menu[] = [];

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/menu", (req, res) => {
  res.send(menus);
});

app.post("/menu", (req, res) => {
  const menuId = menus.length === 0 ? 1 : menus[menus.length - 1].id + 1;
  const isArchived = false;
  const menu = {
    id: menuId,
    ...req.body,
    assetUrl:
      "https://img.freepik.com/free-photo/big-sandwich-hamburger-with-juicy-beef-burger-cheese-tomato-red-onion-wooden-table_2829-19631.jpg",
    isArchived,
  };
  menus.push(menu);
  res.send(menus);
});

app.put("/menu", (req, res) => {
  const newId = req.body;
  const checkId = menus.find((menu) => menu.id === newId.id);
  if (checkId) {
    const newMenu = menus.map((menu) => {
      if (menu.id === newId) {
        return {
          ...newId,
          assetUrl: "",
          isArchived: false,
        };
      } else {
        return menu;
      }
    });
    res.send(newMenu);
  } else {
    res.send(menus);
  }
});

app.delete("/menu/:id", (req, res) => {
  const deleteId = Number(req.params.id);
  const checkId = menus.find((menu) => menu.id === deleteId);
  if (checkId) {
    const remainingId = menus.filter((menu) => menu.id !== deleteId);
    res.send(remainingId);
  } else {
    res.send(menus);
  }
});

app.listen(port, () => console.log(`server is listening at ${port}`));
