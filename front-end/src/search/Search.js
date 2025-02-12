import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationsList from "../components/ReservationsList";

function Search() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [mobile_number, setMobile_number] = useState("");

  const changeHandler = ({ target: { name, value } }) => {
    setMobile_number(value);
  };

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ mobile_number }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const submitHandler = (event) => {
    event.preventDefault();
    loadDashboard();
  };

  return (
    <main>
      <h1 className="mb-3">Find a reservation</h1>
      <ErrorAlert error={reservationsError} />
      <form onSubmit={submitHandler} className="mb-4">
        <div className="row mb-3">
          <div className="col-6 form-group">
            <label className="form-label" htmlFor="mobile_number">
              Phone Number
            </label>
            <input
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              type="string"
              value={mobile_number}
              onChange={changeHandler}
              required={true}
            />
            <small className="form-text text-muted">
              Enter a customer's phone number
            </small>
          </div>
        </div>
        <button
          type="submit"
          style={{ backgroundColor: "#211A1E" }}
          className="btn btn-primary btn-sm"
        >
          Find
        </button>
      </form>
      {reservations.length > 0 && (
        <ReservationsList
          reservations={reservations}
          reservationDone={() => {}}
          cancelHandler={() => {}}
          buttons={false}
        />
      )}
    </main>
  );
}

export default Search;
