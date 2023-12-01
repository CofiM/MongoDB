import React, { useState, useEffect } from "react";
import ProductCard from "../../Product/ProductCard";
import classes from "./HouseHold.module.css";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { ExtractData } from "../../Helper/extract.js";

function Domacinstvo() {
  const Address = localStorage.getItem("HouseHoldAddress");
  const Name = localStorage.getItem("HouseHoldName");
  const HouseHoldId = localStorage.getItem("HouseHoldID");
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();
  const [ratingOfDomacinstvo, setRatingOfDomacinstvo] = useState(0.0);
  const [domacinstvo, setDomacinstvo] = useState([]);
  const [openWarning, setOpenWarning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);



  const token = localStorage.getItem("Token");

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  const onClickCommentHandler = (ID) => {
    setProduct(products.find((el) => el.ID == ID));
    console.log(product);
    setOpen(true);
  };

  const navigate = useNavigate();

  //Pogledaj za sta se koristi

  const onClickCartHandler = (ID) => {
    let token = localStorage.getItem("Token");
    let korisnik;
    if (token == null) {
      korisnik = null;
    } else {
      korisnik = ExtractData(token, "role");
    }
    if (korisnik != null) {
      const p = products.find((el) => el.ID == ID);
      console.log(p);
      navigate({ pathname: "/Proizvod", product: p });
      console.log(p.Cena);
      localStorage.setItem("CenaProizvoda", p.Cena);
      localStorage.setItem("IdProizvoda", p.ID);
      localStorage.setItem("KategorijaProizvoda", p.Kategorija);
      localStorage.setItem("KolicinaProizvoda", p.Kolicina);
      localStorage.setItem("NazivProizvoda", p.Naziv);
      localStorage.setItem("OpisProizvoda", p.Opis);
    } else {
      setOpenWarning(true);
    }
  };

  useEffect(() => {
    const fetchProductHandler = async () => {
      console.log("uslo");
      var token = localStorage.getItem("Token");
      const response = await fetch(
        "https://localhost:44326/Product/GetAllProductsFromHouseHold/" +
        HouseHoldId,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      console.log(data);
      let comments = [];
      let rating = 0;
      const transformedDataProduct = data.map( item => {
        return {
          ID: item.id,
          Price: item.price,
          Category: item.category,
          Amount: item.amount,
          Name: item.name,
          Description: item.description
        };
      })


      //OVO TREBA DORADITI DA BI SE PRIKAZALA OCENA AKO RADIMO TAKO

      /* const transformedDataProduct = data.map(function (prod) {
        let pros = 0;
        prod.recenzije.forEach((el) => {
          pros += el.ocena;
          comments.push(el.komentar);
        });
        console.log(comments);
        let kom = comments;
        comments = [];
        if (prod.recenzije.length > 0) {
          pros = pros / prod.recenzije.length;
        }
        console.log(pros);
        if (prod.recenzije.length > 0) {
          rating = rating + pros;
          console.log(rating);
        }
        return {
          ID: prod.id,
          Cena: prod.cena,
          Kategorija: prod.kategorija,
          Kolicina: prod.kolicina,
          Naziv: prod.naziv,
          Opis: prod.opis,
          Ocena: pros,
          Komentari: kom,
        };
      }); */
      
      
      setProducts(transformedDataProduct);
      rating = rating / transformedDataProduct.length;
      console.log(rating);
      setRatingOfDomacinstvo(rating);
      setIsLoaded(true);
    };
    fetchProductHandler();
  }, []);

 
  if (!isLoaded) {
    return <div className={classes.Loading}>Loading...</div>;
  }
  return (
    <div className={classes.container}>
      <div className={classes.RatingWrap}>
        <h1>{Name}</h1>
        <Rating
          name="read-only"
          value={ratingOfDomacinstvo}
          readOnly
          sx={{ fontSize: "40px" }}
        />
      </div>
      <div className={classes.allProducts}>
        {products.map((prod) => (
          <ProductCard
            key={prod.ID}
            className={classes.Product}
            idProizvoda={prod.ID}
            naziv={prod.Name}
            kolicina={prod.Amount}
            cena={prod.Price}
            opis={prod.Description}
            ocena={prod.Ocena}
            onClickComment={() => onClickCommentHandler(prod.ID)}
            onClickCart={() => onClickCartHandler(prod.ID)}
          />
        ))}
      </div>
      {/* OVO CE DA IZBACIMO SKROZ 
      <div>
        {open && (
          <ModalComment
            show={open}
            komentar={product.Komentari}
            onClose={handleClose}
          />
        )}
      </div> */}



      {/* OVO DA VIDIMO ZA STA JE 
       <div>
        {openWarning && (
          <WarningModal show={openWarning} onClose={handleCloseWarning} />
        )}
      </div> */}
    </div>
  );
}

export default Domacinstvo;
