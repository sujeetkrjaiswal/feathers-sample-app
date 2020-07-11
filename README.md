# Feathers Sample Application

## Setting up sample Data

`data/input` folder has two json file one for customers and one for orders.
These files are generated using online sample data generators.

Run `npm start` in order to pre-process the generated files in order to 
map the customer._id to orders randomly and
set the `createdAt` and `updatedAt` to same value

Execute the below commands to import the data to your db.
```shell script
mongoimport --db feather-sample --collection customers --file ./data/output/customers.txt
mongoimport --db feather-sample --collection orders --file ./data/output/orders.txt
```
