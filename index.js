const port = process.env.PORT || 4000
import app from "./App.js"
import dotenv from 'dotenv'
dotenv.config()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

//git remote set-url origin https://github.com/Saumyaturaskar08/Mega_project.git 