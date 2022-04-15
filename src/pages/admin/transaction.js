import React, { useState, useEffect } from "react";
import { Table, Dropdown} from "react-bootstrap";
import { API } from "../../config/api";
import NavbarComponent from "../../pages/components/navbarAdmin";
import '../../style/transaction.css'

function Transaction() {
  const [path, setPath] = useState([]);
  const [transaction, setTransaction] = useState([]);
  // get transactions
  const getTransaction = async () => {
    try {
      const response = await API.get("/transactions");
      setTransaction(response.data.data.transactionExist);
      setPath(response.data.data.path);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  // state approve
  const [aprove] = useState({
    paymentStatus: "Approved",
    userStatus: "Active",
  });

  // handling approve transaction
  const approvedTrans = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const respone = await API.patch(`/transaction/${id}`, aprove, config);
      getTransaction();
    } catch (error) {
      console.log(error);
    }
  };

   //  state cancel
   const [cancel] = useState({
    paymentStatus: "Cancel",
    userStatus: "No Active",
  });

  // handling cancel transaction
  const cancelTrans = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const respone = await API.patch(`/transaction/${id}`, cancel, config);
      getTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  var months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  var date = new Date();
  let Tanggal = new Date().getDate();
  var month = date.getMonth();
  let Tahun = new Date().getFullYear();
  var setStartDate = Tahun + "-" + months[month] + "-" + Tanggal;

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  const today = new Date(setStartDate).getTime()

  return (
    <div>
      <div>
        <NavbarComponent />
      </div>
      <div className="container mt-3">
        <h3 className="py-3">Incoming Transaction</h3>
        <Table striped hover>
          <thead>
            <tr className="text-danger">
              <th className="text-center fw-bold">No</th>
              <th>Users</th>
              <th>Account Number</th>
              <th>Remaining Active</th>
              <th>Status User</th>
              <th>State Payment</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {transaction.map((item, index) => {
              
              const remainingActive = Math.round(`${new Date(item.endDate).getTime()}`- today) / oneDay - 1

              // console.log(remainingActive);
              
              return (
                <tr item={item} key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{item.user.fullName}</td>
                  <td>
                    <a
                      href={path + `${item.transferProof}`}
                      target="_blank"
                    >
                      {item.accountNumber}
                    </a>
                  </td>
                  {remainingActive <= 0 ? (
                    <td> 0 / Hari</td>
                    //  cancelTrans(item.id)               
                  ) : (
                    <td><span>{remainingActive}</span> / Hari</td>
                  )}
                  
                  {item.userStatus === "Active" ? (
                    <td className="text-success fw-bold">Active</td>
                  ) : (
                    <td className="text-danger fw-bold">No Active</td>
                  )}

                  {item.paymentStatus === "Approved" ? (
                    <td className="text-success fw-bold">Aprove</td>
                  ) : item.paymentStatus === "Pending" ? (
                    <td className="text-warning fw-bold">Pending</td>
                  ) : (
                    <td className="text-danger fw-bold">Cancel</td>
                  )}
                  <td className="text-center">
                    <Dropdown>
                      <Dropdown.Toggle variant="none shadow-none" />
                      <Dropdown.Menu variant="dropdown-menu-center">
                        <Dropdown.Item
                          className="fw-bold text-success"
                          onClick={() => {
                            approvedTrans(item.id);
                          }}
                        >
                          Approve
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="fw-bold text-danger"
                          onClick={() => {
                            cancelTrans(item.id);
                          }}
                        >
                          Cancel
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Transaction;
