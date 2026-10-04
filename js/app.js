```javascript
document.addEventListener("DOMContentLoaded", function () {

    /*
       SEARCH FORM
    */

    const searchForm =
        document.getElementById("searchForm");


    if (searchForm) {

        searchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const checkIn =
                    document.getElementById("checkIn").value;

                const checkOut =
                    document.getElementById("checkOut").value;

                const guests =
                    document.getElementById("guests").value;


                if (!checkIn || !checkOut) {

                    alert(
                        "Please select check-in and check-out dates."
                    );

                    return;
                }


                if (checkOut <= checkIn) {

                    alert(
                        "Check-out must be after check-in."
                    );

                    return;
                }


                /*
                    Save search information.

                    Later this will be sent to
                    our FastAPI backend.
                */

                localStorage.setItem(
                    "hotelSearch",

                    JSON.stringify({

                        checkIn: checkIn,

                        checkOut: checkOut,

                        guests: guests

                    })
                );


                window.location.href =
                    "rooms.html";

            }
        );

    }



    /*
       BOOKING PAGE
    */

    const bookingForm =
        document.getElementById("bookingForm");


    if (bookingForm) {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const room =
            params.get("room");

        const price =
            params.get("price");


        if (room) {

            document.getElementById(
                "selectedRoom"
            ).textContent = room;

        }


        if (price) {

            document.getElementById(
                "selectedPrice"
            ).textContent =
                "₹" + Number(price).toLocaleString("en-IN")
                + " / night";

        }


        /*
           Load previous search dates
        */

        const savedSearch =
            localStorage.getItem(
                "hotelSearch"
            );


        if (savedSearch) {

            const search =
                JSON.parse(savedSearch);


            document.getElementById(
                "bookingCheckIn"
            ).value = search.checkIn;


            document.getElementById(
                "bookingCheckOut"
            ).value = search.checkOut;

        }


        bookingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const firstName =
                    document.getElementById(
                        "firstName"
                    ).value;

                const lastName =
                    document.getElementById(
                        "lastName"
                    ).value;

                const email =
                    document.getElementById(
                        "email"
                    ).value;


                /*
                   Generate demo booking ID.

                   Later this will be generated
                   by the backend/database.
                */

                const bookingId =
                    "SN-" +
                    Math.floor(
                        100000 +
                        Math.random() * 900000
                    );


                const booking = {

                    bookingId: bookingId,

                    firstName: firstName,

                    lastName: lastName,

                    email: email,

                    room: room,

                    price: price,

                    checkIn:
                        document.getElementById(
                            "bookingCheckIn"
                        ).value,

                    checkOut:
                        document.getElementById(
                            "bookingCheckOut"
                        ).value

                };


                localStorage.setItem(
                    "booking",

                    JSON.stringify(booking)
                );


                alert(
                    "Booking created successfully!"
                );


                /*
                   Temporary demo.

                   Later:
                   POST /api/bookings
                */

                window.location.href =
                    "index.html";

            }
        );

    }

});
```
