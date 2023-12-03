import { Box, Button, CircularProgress, FormControl, Stack, TextField, Typography } from "@mui/material";
import { useApi } from "./api/api";
import { venuesURL } from "./api/constants";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { postBookingFormEventListener } from "./handlers/bookings";

export const MUIBooking = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const venueId = urlParams.get("venueId");

  const { data, isLoading, isError } = useApi(`${venuesURL}/${venueId}`);
  // console.log(data);
  const isoDateTime = new Date().toISOString();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  };

  postBookingFormEventListener(selectedDate, selectedToDate, venueId);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error loading venue</div>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1">
        {"Create a booking for "}
        <Typography component="span" variant="h4" sx={{ fontStyle: "italic" }}>
          {data.name}
        </Typography>
      </Typography>
      <Stack component="form" id="postBookingForm" spacing={3} marginY={5}>
        <FormControl required>
          <label htmlFor="dateFrom">
            From date
            <Typography color="error" component="span">
              *
            </Typography>
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimeField"]}>
              <DemoItem>
                <DateTimePicker id="dateFrom" name="dateFrom" defaultValue={dayjs(isoDateTime)} selectedDate={selectedDate} onDateChange={handleDateChange} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>
        <FormControl required>
          <label htmlFor="dateTo">
            To date
            <Typography color="error" component="span">
              *
            </Typography>
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimeField"]}>
              <DemoItem>
                <DateTimePicker id="dateTo" name="dateTo" defaultValue={dayjs(isoDateTime)} selectedToDate={selectedToDate} onDateChange={handleToDateChange} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>
        <FormControl required>
          <label htmlFor="guests">
            Guests
            <Typography color="error" component="span">
              *
            </Typography>
          </label>
          <TextField size="small" defaultValue={1} type="number" id="guests" name="guests" />
        </FormControl>
        {/* <FormControl required>
          <label htmlFor="venueId">
            Id
            <Typography color="error" component="span">
              *
            </Typography>
          </label>
          <TextField size="small" type="text" id="venueId" name="venueId" />
        </FormControl> */}
        <Button variant="contained" type="submit">
          Book
        </Button>
      </Stack>
    </Box>
  );
};
