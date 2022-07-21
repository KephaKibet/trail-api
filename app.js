const { fail } = require('assert');
const express = require('express');
const fs = require('fs')

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({message:'Hello from the server side', app:'natours'})
// });

// app.post('/', (req, res) => {
//   res.send('You can Post to this endpoint') 
// });
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);


  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }
  const tour = tours.find(el => el.id === id)
  
  res.status(200).json({
    status: 'success',
    data: {
      tours
    }
  });
  
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour:newTour
      }
    })

  })
    
  
})

const port = 3000
app.listen(port, () => {
  console.log(`RUNNING ON PORT ${port}...`);

}); 