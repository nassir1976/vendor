# vendor

- CAPS Phase 2: Continue working on a multi-day build of our delivery tracking system, moving event management to socket.io

- In this phase, we’ll be moving away from using TCP for our event network and switching instead in to using socket.io, which takes on some of the complexity we had to manage ourselves, and also works equally well between servers and with websites.

- The intent here is to build the data services that would drive full dashboard where we can see pickups and deliveries as they happen.


### Phase 2 Requirements
- In Phase 2, we’ll be changing the underlying networking implementation of our CAPS system from using node events to using a library called socket.io so that we can do networked events. Socket.io manages the connection pool for us, makes broadcasting much easier to operate, and works well both on the terminal (between servers) and with web clients.

- The core functionality we’ve already built remains the same. The difference in this phase is that we’ll be creating a networking layer. As such, the user stories that speak to application functionality remain unchanged, but a new set theme emerges to get us through the refactoring.

- As a vendor, I want to alert the system when I have a package to be picked up
- As a driver, I want to be notified when there is a package to be delivered
- As a driver, I want to alert the system when I have picked up a package and it is in transit
- As a driver, I want to alert the system when a package has been delivered
- As a vendor, I want to be notified when my package has been delivered
And as developers, here are some of the development stories that are relevant to the above

- As a developer, I want to create network event driven system using Socket.io so that I can write code that responds to events originating from both servers and web applications


### Technical Requirements / Notes
- In order to switch from TCP to Socket.io, the refactoring process will involve changes to each application to use the core features of Socket.io

### Specifically, we’re going to use Socket.io namespaces to segment our events.

- We’ll use one namespace called caps where all of our clients (vendors and drivers) will connect
- By default, all vendors and drivers hear all of the messages…
- Ensure that each vendor only processes pickup and delivered events for it’s own packages!
Options
- As a vendor, send your vendor id with every pickup, and then when the broadcasted messages come back, ignore those that are not yours
- Setup a separate namespace for each vendor
- Each store will have it’s own “room” within the ‘caps’ namespace

#### CAPS Application Server Modifications
- Start a socket.io server on a designated port
- Create and accept connections on a namespace called caps
#### Within the namespace:
- Monitor the correct general events
- pickup, in-transit, delivered
- Broadcast the events and payload back out to the appropriate clients in the caps namespace
- pickup can go out to all sockets (broadcast it) so that the drivers can hear it
- in-transit and delivered are meant to be heard only by the right vendor


### Vendor Application
- Create a “store id” for the vendor, perhaps with a .env file
- Connects to the CAPS server as a socket.io client to the caps namespace
- Every .5 seconds, simulate a new customer order
- Create a payload object with your store id, order id, customer name, address
- Emit that message to the CAPS server with an event called pickup
- Listen for the delivered event coming in from the CAPS server
- Log “thank you for delivering payload.id” to the console

### Driver Application
- Connects to the CAPS server as a socket.io client to the caps namespace
- Listen for the pickup event coming in from the CAPS server
- Simulate picking up the package
- Wait 1.5 seconds
- Log “picking up payload.id” to the console
- emit an in-transit event to the CAPS server with the payload

#### Simulate delivering the package
- Wait 3 seconds
- emit a delivered event to the CAPS server with the payload



### Documentation
- Compose a UML or Process/Data Flow Diagram for every application

![WhiteBoard](../capss/assets/UML-LAB12.png)