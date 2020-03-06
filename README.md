# SimpleCreditCard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.
You can check it out over here: [link](https://simplecreditcard.site/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. You'll also need the back end Nodejs code to properly run this project, that can be found [here](https://github.com/Shobandeep/credit_card_app_API). You'll also want to change serverURL found in the environment file to 
reflect the location of your node server. 



## The main purpose of this site is to simulate parts of a e-commerce system that also issues credit cards




### Customer   
*    As a customer, the user can register for an account or log in if they already have one to view their credit cards. They may also apply for new credit cards if they wish. Once a customer has a card, they can head over to the vendors and buy items. When they are ready, they can checkout by clicking on the shopping cart on the top left of the screen. In the shopping cart, they can make adjustments to their order and checkout when ready. If someone tries to checkout without logging in, they'll be redirected to the login screen and brought back once they've logged then. The customer can also make payments to their card from the home screen (note: they don't have to be logged in to make a payment). In the client menu, in addition to viewing their cards, the customer can look at their transaction history for a particular card as well as order details for said transactions.
### Admin
 *   The admin, after logging in, is able to view every transaction by a vendor and it's order summary as well as who made the purchase. The admin can also see all registered users as well as their cards and transactions. Lastly the admin is able to activate or deactivate a customer's account which would prevent the customer from logging in or making any purchases.
    Additional information
        admins cannot go to user only routes like payment (you have to be logged out or signed in as a customer), checkout, login, or register and the customer cannot go to admin only routes. 



## Why make this project?

This project is an updated version of a project I had done for my software engineering class, the original project was done in Node.js (using pug as a templating engine) and a MySQL database. I initially set out to learn how to use angular and since I already had a template project to match my progress against, I could put everything I learned into practice and everything I couldn't, I would research until I could. Visually, there are some similarities but everything is different under the hood. An added bonus was that I was free to learn and implement everything I wanted without any deadlines.



## What's different about this project?

For starters, a majority of the presentation has been moved over to the client side (front end) and the Node.js server (back end) solely handles the business logic and database interaction. This also made the code neater and way easier to debug. The state management is also significantly better, as opposed to a giant object named 'state' that reset every time the server went down. Since this was my second go at it, I was also able to add some new features as well!

1.    There's now a shopping cart, previously, a customer would select what they wanted at a particular store and checkout right there, now they have the freedom to browse, mixing different items from various stores and are allowed to have a final look at their cart before they're ready to checkout.
2.    Both the admin and customer can look at their order summary to see which items they bought.
3.    Thanks to Rxjs, state management is much easier and the site can now actually handle more than one user at a time. The previous attempt at state management couldn't handle more than a single user. JSON Web Tokens also take a lot of the authentication pain away and free the server from keeping track of who is logged in.
4.    Trying to stuff variables into raw query string was extremely tedious, sequelize helped me not only make my queries simple, I can now setup the database by simply running my Node.js code instead of fiddling with MySQL. Designing new tables was breeze and I can now set them up in MSSQL or SQLLite without changing much.
5.    A register option to allow new users to sign up and start shopping, previously the admin would have to create a user manually. 




## So what did I learn?

*    Separation of business logic and presentation.
*    Angular framework
*    Rxjs Obervables
*    Sequelize
*    JSON Web Tokens 
