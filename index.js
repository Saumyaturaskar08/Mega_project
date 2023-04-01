const port = process.env.PORT || 4000
import app from "./App.js"
import dotenv from 'dotenv'
dotenv.config()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
