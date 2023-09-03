import { Table } from 'react-bootstrap';
import IExpenseItem from "../models/ExpenseModel";
import { getAllPayeeNames } from "../services/ExpenseService";

type ExpenseByPayeeModel = {
    expenseItems: IExpenseItem[];
}

const ExpenseByPayee = ( {expenseItems}: ExpenseByPayeeModel ) => {
    const getTotalExpensesByPayee = (payeeName: string) => {
        let totalExpense = 0;
        expenseItems.forEach( (localExpenseItem) => {
            let localPayeeName = localExpenseItem.payeeName;
            if(localPayeeName === payeeName){
                totalExpense = totalExpense + localExpenseItem.price;
            }
        });

        return totalExpense;
    }

    const getGrandTotal = () => {
        let totalExpense = 0;
        expenseItems.forEach( (localExpenseItem) => {
            totalExpense = totalExpense + localExpenseItem.price;
        })

        return totalExpense;
    }

    const getPendingAmount = ( payeeName: string) => {
        const totalExpense = getGrandTotal();
        const totalExpenseByPayee = getTotalExpensesByPayee(payeeName);

        const halfAmount = Math.abs(totalExpense/2);
        
        if(totalExpense >= halfAmount){
            return 0;
        }
        else{
            return (halfAmount - totalExpenseByPayee);
        }
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Payee Name</th>
                        <th>Amount Contributed</th>
                        <th>Amount Pending</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        getAllPayeeNames(expenseItems).map((payeeName, index) => {
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{payeeName}</td>
                                    <td>{getTotalExpensesByPayee(payeeName)}</td>
                                    <td>{getPendingAmount(payeeName)}</td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td></td>
                        <td>Grand Total</td>
                        <td>{getGrandTotal()}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export {
    ExpenseByPayee
}