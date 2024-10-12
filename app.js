const prompt = require('prompt-sync')();
const mongoose = require('mongoose');
require('dotenv').config();
const Customer = require('./customer');

console.log('Welcome to the Customer Management System');

const username = prompt('What is your name? ');
console.log(`Your name is ${username}`);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

    function displayMenu() {
        console.log('\nMenu:');
        console.log('1. Create Customer');
        console.log('2. View Customers');
        console.log('3. Update Customer');
        console.log('4. Delete Customer');
        console.log('5. Quit');
    }
    
    async function createCustomer() {
        const name = prompt('Customer name: ');
        const age = prompt('Customer age: ');
        const customer = new Customer({ name, age });
        try {
            await customer.save();
            console.log('Customer saved');
        } catch (err) {
            console.error('Error saving customer', err);
        }
    }
    
    async function viewCustomers() {
        try {
            const customers = await Customer.find();
            console.log('Customers:');
            customers.forEach(customer => {
                console.log(`ID: ${customer._id}, Name: ${customer.name}, Age: ${customer.age}`);
            });
        } catch (err) {
            console.error('Error retrieving customers', err);
        }
    }
    
    async function updateCustomer() {
        const id = prompt('Enter customer ID to update: ');
        const name = prompt('New customer name: ');
        const age = prompt('New customer age: ');
        try {
            await Customer.findByIdAndUpdate(id, { name, age });
            console.log('Customer updated');
        } catch (err) {
            console.error('Error updating customer', err);
        }
    }
    
    async function deleteCustomer() {
        const id = prompt('Enter customer ID to delete: ');
        try {
            await Customer.findByIdAndDelete(id);
            console.log('Customer deleted');
        } catch (err) {
            console.error('Error deleting customer', err);
        }
    }
    
    async function main() {
        let quit = false;
        while (!quit) {
            displayMenu();
            const choice = prompt('Choose an option: ');
            switch (choice) {
                case '1':
                    await createCustomer();
                    break;
                case '2':
                    await viewCustomers();
                    break;
                case '3':
                    await updateCustomer();
                    break;
                case '4':
                    await deleteCustomer();
                    break;
                case '5':
                    quit = true;
                    console.log('Goodbye!');
                    await mongoose.connection.close();
                    console.log('MongoDB connection closed');
                    process.exit(0);
                    break;
                default:
                    console.log('Invalid choice, please try again.');
            }
        }
    }

    main();


//const name = prompt('Customer name: ');
//const age = prompt('Customer age: ');  
    
//const customer = new Customer({ name, age });
    
//customer.save()
//.then(() => console.log('Customer saved'))
//.catch(err => console.error('Error saving customer', err));   