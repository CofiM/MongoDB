import React from "react";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import classes from "./Product.module.css";
//import WarningModal from "../Components/Domacinstvo/WarningModal.js";

const ViewProductsName = () => {
  const [value, setValue] = useState(1);

  const name = localStorage.getItem("Name");
  console.log(name);
  const [allProducts, setAllProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();
  const [openWarning, setOpenWarning] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const onClickCommentHandler = (ID) => {
    setProduct(allProducts.find((el) => el.ID == ID));
    console.log(product);
    setOpen(true);
  };
  
  const onClickCartHandler = (ID) => {
    if (localStorage.getItem("Korisnik") == null) {
      setOpenWarning(true);
    } else {
      const p = allProducts.find((el) => el.ID == ID);
      localStorage.setItem("DomacinstvoID", p.IDDomacinstva);
      navigate({ pathname: "/Proizvod", product: p });
      localStorage.setItem("CenaProizvoda", p.Cena);
      localStorage.setItem("IdProizvoda", p.ID);
      localStorage.setItem("KategorijaProizvoda", p.Kategorija);
      localStorage.setItem("KolicinaProizvoda", p.Kolicina);
      localStorage.setItem("NazivProizvoda", p.Naziv);
      localStorage.setItem("OpisProizvoda", p.Opis);
    }
  };
  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  useEffect(() => {
    async function fetchProductsHandler() {
      const response = await fetch(
        "https://localhost:44326/Product/GetAllProductsWithName/" + name,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );
      
      const data = await response.json();
      console.log(data);
      //let comments = [];
      const products = data.map(function (item) {

        //OVO NAM NE TREBA SIGURNO ZA KOMENTARE

       /*  let pros = 0;
        prod.recenzije.forEach((el) => {
          pros += el.ocena;
          comments.push(el.komentar);
        });
        console.log(comments);
        let kom = comments;
        comments = [];
        pros = pros / prod.recenzije.length; */
        return {
          ID: item.id,
          Cena: item.price,
          Kategorija: item.category,
          Kolicina: item.amount,
          Naziv: item.name,
          Opis: item.description,
          Ocena: 2,
          Komentari: "",
          IDDomacinstva: item.houseHold.id,
        };
      });

      setAllProducts(products);
      console.log(products);
    }
    fetchProductsHandler();
  }, []);

  const sortArray = [
    {
      value: 1,
      label: "Po abecedi",
    },
    {
      value: 2,
      label: "Po ceni u rastućem",
    },
    {
      value: 3,
      label: "Po ceni u opadajućem",
    },
    {
      value: 4,
      label: "Po oceni",
    },
  ];

  const arrayProducts = (e) => {
    let newState = [...allProducts];
    setValue(e.target.value);

    if (e.target.value == 1) {
      console.log(newState);
      {
        newState
          .sort((a, b) => (a.Naziv > b.Naziv ? 1 : -1))
          .map((prod) => (
            <ProductCard
              className={classes.Product}
              idProizvoda={prod.ID}
              naziv={prod.Naziv}
              kolicina={prod.Kolicina}
              cena={prod.Cena}
              opis={prod.Opis}
              ocena={prod.Ocena}
              onClickComment={() => onClickCommentHandler(prod.ID)}
              onClickCart={() => onClickCartHandler(prod.ID)}
            />
          ));
      }
    } else if (e.target.value == 2) {
      {
        newState
          .sort((a, b) => (a.Cena > b.Cena ? 1 : -1))
          .map((prod) => (
            <ProductCard
              idProizvoda={prod.ID}
              className={classes.Product}
              naziv={prod.Naziv}
              kolicina={prod.Kolicina}
              cena={prod.Cena}
              opis={prod.Opis}
              ocena={prod.Ocena}
              onClickComment={() => onClickCommentHandler(prod.ID)}
              onClickCart={() => onClickCartHandler(prod.ID)}
            />
          ));
      }
    } else if (e.target.value == 3) {
      {
        newState
          .sort((a, b) => (a.Cena < b.Cena ? 1 : -1))
          .map((prod) => (
            <ProductCard
              idProizvoda={prod.ID}
              className={classes.Product}
              naziv={prod.Naziv}
              kolicina={prod.Kolicina}
              cena={prod.Cena}
              opis={prod.Opis}
              ocena={prod.Ocena}
              onClickComment={() => onClickCommentHandler(prod.ID)}
              onClickCart={() => onClickCartHandler(prod.ID)}
            />
          ));
      }
    } else if (e.target.value == 4) {
      {
        newState
          .sort((a, b) => (a.Ocena < b.Ocena ? 1 : -1))
          .map((prod) => (
            <ProductCard
              idProizvoda={prod.ID}
              className={classes.Product}
              naziv={prod.Naziv}
              kolicina={prod.Kolicina}
              cena={prod.Cena}
              opis={prod.Opis}
              ocena={prod.Ocena}
              onClickComment={() => onClickCommentHandler(prod.ID)}
              onClickCart={() => onClickCartHandler(prod.ID)}
            />
          ));
      }
    }
    //setValue(true);
    setAllProducts(newState);
    console.log(newState);
  };

  return (
    <div>
      <div className={classes.positionSelect}>
        <select
          defaultValue={1}
          className={classes.sortSelect}
          onChange={arrayProducts}
        >
          {sortArray.map((option) => (
            <option value={option.value}>{option.label} </option>
          ))}
        </select>
      </div>

      <div className={classes.allProducts}>
        {allProducts.map((prod) => (
          <ProductCard
            idProizvoda={prod.ID}
            className={classes.Product}
            naziv={prod.Naziv}
            kolicina={prod.Kolicina}
            cena={prod.Cena}
            opis={prod.Opis}
            ocena={prod.Ocena}
            onClickComment={() => onClickCommentHandler(prod.ID)}
            onClickCart={() => onClickCartHandler(prod.ID)}
          />
        ))}
        {/* <div>
          {openWarning && (
            <WarningModal show={openWarning} onClose={handleCloseWarning} />
          )}
        </div> */}
      </div>
    </div>
  );
};

export default ViewProductsName;
