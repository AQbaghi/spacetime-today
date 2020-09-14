const express = require('express');
const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3000;
//listening to server port
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
