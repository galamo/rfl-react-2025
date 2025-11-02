import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import styles from "./expenses.module.css";
import SkeletonTable from "./tableSkeleton";
import { useAppSelector } from "../../../store/hooks";
const dummyExpense = {
  id: 90,
  amount: "196.00",
  date: "2025-10-10T02:35:19.000Z",
  category: "Training",
  description: "Auto seed #90",
};
type SingleExpense = typeof dummyExpense;
const ExpensesTable = ({ data }: { data: Array<SingleExpense> }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th className={styles.alignRight}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((expense, index) => (
            <tr
              key={expense.id}
              className={`${index % 2 === 0 ? styles.rowEven : styles.rowOdd}`}
            >
              <td>{expense.id}</td>
              <td>{expense.date}</td>
              <td>
                <span className={styles.categoryBadge}>{expense.category}</span>
              </td>
              <td>{expense.description}</td>
              <td className={styles.alignRight}>${expense?.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ExpensesPage = () => {
  const [expensesArray, setExpensesArray] = useState<Array<SingleExpense>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const settings = useAppSelector((state) => state.settings);

  // Apply the expense limit from settings
  const limitedExpenses = useMemo(() => {
    return expensesArray.slice(0, settings.expenseLimit);
  }, [expensesArray, settings.expenseLimit]);

  const result = useMemo(() => {
    return calcTotalExpenses(limitedExpenses);
  }, [limitedExpenses]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/expenses", {
          headers: {
            Accept: "application/json",
            Authorization: `${token}`,
          },
        });
        console.log("Expenses Data:", response.data.data);
        setExpensesArray(response.data.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Expenses Manager</h1>
          <p>Track and manage your expenses</p>
          <span> Total Expenses Amount : {result}$ </span>
        </div>
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <ExpensesTable data={limitedExpenses} />
        )}

        <div className={styles.summaryBox}>
          <div className={styles.summaryRow}>
            <span>
              Showing {limitedExpenses.length} of {expensesArray.length}{" "}
              expenses (Limit: {settings.expenseLimit})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function calcTotalExpenses(expensesArray: Array<SingleExpense>) {
  const result = expensesArray.reduce(
    (total: number, current: SingleExpense) => {
      if (current.amount) {
        const n = Number(current.amount);
        total += n;
      }
      return total;
    },
    0
  );

  return Math.ceil(result);
}

export default ExpensesPage;
