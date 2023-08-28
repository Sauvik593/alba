import React from "react"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import Container from "@mui/material/Container"
import { depositProducts } from "./store/selectors"
import { selectProduct } from "src/scenes/Savings/OnBoarding/store"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"

export const FixedDeposit: React.FC = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(depositProducts)
  const navigate = useNavigate()

  const chooseProduct = (key: string) => {
    dispatch(selectProduct(key))
    navigate("/savings/deposit-details")
  }

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {products.map((card) => (
            <Grid item key={card.key} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Deposit
                  </Typography>
                  <Typography>{card.value}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => chooseProduct(card.key)}
                  >
                    Apply
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
