const transactionModel = require("../models/transactionModel");
const moment = require("moment");

/**
 * GET /api/v1/transactions
 * Retrieves all transactions based on frequency, type, and user ID.
 */
const getAllTransaction = async (req, res) => {
  try {
    const { frequency, type, userid } = req.query;

    const query = {
      userid,
      ...(frequency !== "" && {
        date: {
          $gte: moment().subtract(Number(frequency), "days").toDate(),
        },
      }),
      ...(type !== "all" && { type }),
    };

    const transactions = await transactionModel.find(query).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("❌ Get All Transaction Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * POST /api/v1/transactions
 * Adds a new transaction to the database.
 */
const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("✅ Transaction Created");
  } catch (error) {
    console.error("❌ Add Transaction Error:", error);
    res.status(500).json({ message: "Unable to add transaction", error });
  }
};

/**
 * PUT /api/v1/transactions?transactionId=...
 * Edits an existing transaction.
 */
const editTransaction = async (req, res) => {
  try {
    const { transactionId } = req.query;
    const { payload } = req.body;

    await transactionModel.findByIdAndUpdate(transactionId, payload, {
      new: true,
      runValidators: true,
    });

    res.status(200).send("✅ Transaction Updated");
  } catch (error) {
    console.error("❌ Edit Transaction Error:", error);
    res.status(500).json({ message: "Unable to edit transaction", error });
  }
};

/**
 * DELETE /api/v1/transactions?transactionId=...
 * Deletes a transaction from the database.
 */
const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.query;

    await transactionModel.findByIdAndDelete(transactionId);

    res.status(200).send("🗑️ Transaction Deleted");
  } catch (error) {
    console.error("❌ Delete Transaction Error:", error);
    res.status(500).json({ message: "Unable to delete transaction", error });
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
