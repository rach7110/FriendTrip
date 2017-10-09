var tripsList = {
    trips: [],
    addTrip: function(destination, days, author) {
        this.trips.push({
            destination:    destination,
            days:           days,
            author:         author,
            votesUp:        0,
            votesDown:      0
        });
    },
    changeTrip: function(position, newDestination, newDays) {
        this.trips[position].destination    = newDestination;
        this.trips[position].days           = newDays;
    },
    deleteTrip: function(position) {
        this.trips.splice(position, 1);
    }
};

var handlers = {
    addTrip: function() {
        var tripDestination = document.getElementById('addTripDestinationInput');
        var tripDays        = document.getElementById('addTripDaysInput');
        var tripAuthor      = document.getElementById('addTripAuthorInput');

        tripsList.addTrip(tripDestination.value, tripDays.value, tripAuthor.value);
        // Empty input fields after a new trip is saved
        tripDestination.value = '';
        tripDays.value        = '';
        tripAuthor.value     = '';

        view.displayTrips();
    },
    changeTrip: function(position, destination, days) {
        tripsList.changeTrip(position, destination, days);
        view.displayTrips();
    },
    deleteTrip: function(position) {
        tripsList.deleteTrip(position);
        view.displayTrips();
    }
};

var view = {
    displayTrips: function() {
        var tripsUl = document.querySelector('ul');
        tripsUl.innerHTML = '';

        for(var i=0; i < tripsList.trips.length; i++) {
            debugger;
            var tripLi = document.createElement('li');
            var trip = tripsList.trips[i];

            tripLi.id = i;
            tripLi.textContent = trip.destination + ': ' + trip.days + ' days';
            tripLi.appendChild(this.createEditButton());
            tripLi.appendChild(this.createDeleteButton());
            tripLi.appendChild(this.createAuthorElement(trip.author));
            tripsUl.appendChild(tripLi); 

        }
    },
    createEditButton: function() {
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'editButton';
    
        return editButton;
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';

        return deleteButton;
    },
    createAuthorElement: function(author) {
        var authorElement = document.createElement('h6');
        authorElement.textContent = 'Created by:' + author;
        authorElement.className = 'tripAuthor'

        return authorElement;

    },
    createEditElements: function(position) {
        var oldEditElements = document.querySelector(".editTrip");
        var editElements = document.createElement('div');
        var editDestinationInput = document.createElement('input');
        var editDaysInput = document.createElement('input');
        var saveTripEditsButton = document.createElement('button');
        //set input values to old trip attributes
        var oldDestination = tripsList.trips[position].destination;
        var oldDays = tripsList.trips[position].days;
        
        //Only one edit group displays at a time.
        if(oldEditElements) {
            oldEditElements.remove();   
        }
        
        //Outer div for editing trip
        editElements.className = 'editTrip';
        //Destination input
        editDestinationInput.type = 'text';
        editDestinationInput.className = 'editDestinationInput';
        editDestinationInput.value = oldDestination;
        //Days input
        editDaysInput.type = 'number';
        editDaysInput.className = 'editDaysInput';
        editDaysInput.value = oldDays;
        //Save button
        saveTripEditsButton.className = 'saveButton';
        saveTripEditsButton.innerHTML = 'Save';
        saveTripEditsButton.className = 'saveChanges';

        editElements.appendChild(editDestinationInput);
        editElements.appendChild(editDaysInput);
        editElements.appendChild(saveTripEditsButton);

        return editElements;

    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function(event) {
            var elementClicked = event.target;

            //Get id of trip if a button is clicked
            if(elementClicked.nodeName === 'BUTTON') {
                var position = elementClicked.parentNode.id;
            }

            //Edit Button clicked, display edit elements.
            if(elementClicked.className === 'editButton') {
                elementClicked.parentNode.appendChild(view.createEditElements(position));
            }
            //Save changes button is clicked
            if(elementClicked.className === 'saveChanges') {
                var position = elementClicked.parentNode.parentNode.id;
                var destination = document.querySelector('.editDestinationInput').value;
                var days = document.querySelector('.editDaysInput').value;

                handlers.changeTrip(parseInt(position), destination, parseInt(days));
            }
            //Delete Button clicked
            if(elementClicked.className === 'deleteButton') {
                handlers.deleteTrip(position);
            }
        });
    }
};

view.setUpEventListeners();






