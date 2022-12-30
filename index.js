const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors()
);
const PORT = 5000;


app.use(express.json())


let halls = [
    {
      hall_name: "Rajaji Hall",
      hall_id: 1,
      seats: 250,
      amenities: "wifi,ambel swivel seat,AC,projector",
      price_per_hour: 5000,
      start_time: '05:00',
      end_time: '09:00'
    },
    {
      hall_name: "Famous Mini Hall",
      hall_id: 2,
      seats: 200,
      amenities: "projector,AC,",
      price_per_hour: 2000,
      start_time: '10:00',
      end_time: '11:00',

    },
  ];
  
  let bookingDetails = [
    {
      customerName: 'sathish',
      hall_name: 'Famous Mini Hall',
      booked_hall_id: 1,
      date: new Date('2022-12-30'),
      status: 'booked',
    },
    {
      customerName: 'ram',
      hallhall_name: 'Rajaji',
      booked_hall_id: 2,
      date: new Date('2022-11-04'),
      status: 'booked',
    },
  ];
  
 
  
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to hall booking app',
  
    });
  });
 
  
  app.post('/hall/create', (req, res) => {
    let id = halls.length + 1;
    req.body.hall_id = id;
    halls.push({
      hall_name: req.body.hall_name,
      hall_id: req.body.hall_id,
      seats: req.body.seats,
      amenities: req.body.amenities,
      price_per_day: req.body.price_per_day,
    });
    res.status(201).send(`The id ${id} with hall is created successfully`);
  });
  

  
  app.post('/hall/book', (req, res) => {
    let id = bookingDetails.length + 1;
    req.body.booked_hall_id = id;
    try {
      req.body.date = new Date(req.body.date);
      let booking_detail = {
        customerName: req.body.customerName,
        booked_hall_id: req.body.booked_hall_id,
        hall_name: req.body.hall_name,
        date: req.body.date,
        booked_room_id:req.body.booked_room_id,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        // status: 'booked',
      }
      for (const book of bookingDetails) {
        if (book.date.getTime() == req.body.date.getTime() && book.start_time === req.body.start_time) {
          console.log(book.date.getTime(), req.body.date.getTime());
         
          return res
            .status(400)
            .send({ error: 'The room is not available with this time slot' });
        } else {
          result = 1;
          bookingDetails.push(booking_detail);
          return res
            .status(201)
            .send(
              `Room is successfully booked with the id ${req.body.booked_room_id}`
            );
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({message:'internal error'});
    }
  });
  
 
  
  app.get('/hall/booked-details', (req, res) => {
    let hallArray = [];
  
    bookingDetails.forEach((customer) => {
      let hallBook = {};
  
      hallBook.hall_name = customer.hall_name;
      hallBook.status = customer.status;
      hallBook.customerName = customer.customerName;
      hallBook.date = customer.date;
      hallBook.start_time = customer.start_time;
      hallBook.end_time = customer.end_time;
      hallArray.push(hallBook);
    });
  
    res.status(200).send(hallArray);
  });
  

  
  app.get('/hall/customer-details', (req, res) => {
    let customerArray = [];
  
    bookingDetails.forEach((customer) => {
      let customerhall= {};
   customerhall.customerName = customer.customerName;
   customerhall.hall_name = customer.hall_name;
   customerhall.date = customer.date;
   customerhall.start_time = customer.start_time;
   customerhall.end_time = customer.end_time;
      customerArray.push(customerhall);
    });
  
    res.status(200).send(customerArray);
  });

app.listen(PORT, () => console.log(`The server started in ${PORT} `));
