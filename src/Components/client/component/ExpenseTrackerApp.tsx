import React, { useState, useEffect } from "react";
import { getAllExpenseItems } from "../services/ExpenseService";
import { ExpenseItems } from "./ExpenseItems";
import { Container } from "react-bootstrap";
import IExpenseItem from "../models/ExpenseModel";
import { ExpenseByPayee } from "./ExpenseByPayee";
import { ExpenseCreator } from "./ExpenseCreator";

const ExpenseTrackerApp = ()=> {
    const [ expenseItems, setExpenseItems ] = useState<IExpenseItem[]>([]);

    useEffect(() => {
        const getAllExpenseItemInvoker = async () => {
            const response = await getAllExpenseItems();

            console.log(`Response is: `, JSON.stringify(response));
            setExpenseItems(response);
        }
        getAllExpenseItemInvoker();
    }, []);

    return (
        <Container>
            <h2>
                Expense Tracker App
                <ExpenseCreator expenseItems={expenseItems}></ExpenseCreator>
                <br /><br />
            </h2>

            <ExpenseItems expenseItems={expenseItems}></ExpenseItems>
            <ExpenseByPayee expenseItems={expenseItems}></ExpenseByPayee>
        </Container>
    )
}

export {ExpenseTrackerApp};