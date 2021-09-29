import { useState, useEffect } from "react";
import { config } from "../App";
import "./Dashboard.css";
import { FiEdit, FiSave } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Paginate from "./Paginate";

export default function Dashboard() {
  useEffect(() => {
    performApiCall();
  }, []);

  const DEBOUNCE_TIMEOUT = 300;

  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState({
    startIndex: 0,
    endIndex: 0,
  });
  const [allSelected, setAllSelected] = useState(false);
  const [savedUser, setSavedUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [refresh, setRefresh] = useState(0);

  const performApiCall = async () => {
    let responseData;
    try {
      const response = await fetch(config.endpoint);
      responseData = await response.json();
      responseData = responseData.map((user) => {
        return { ...user, editStatus: false, selected: false };
      });
    } catch (error) {
      return error;
    }
    setFilteredUsers(responseData);
    setUsersData(responseData);
  };

  const selectAllHandler = (event) => {
    setAllSelected(!allSelected);
    let data;
    if (event.target.checked) {
      data = filteredUsers.map((val) => {
        if (
          val.id > currentPageUsers.startIndex &&
          val.id <= currentPageUsers.endIndex + 1
        ) {
          return { ...val, selected: true };
        }
        return val;
      });
    } else {
      data = filteredUsers.map((val) => {
        if (
          val.id > currentPageUsers.startIndex &&
          val.id <= currentPageUsers.endIndex + 1
        ) {
          return { ...val, selected: false };
        }
        return val;
      });
    }
    setFilteredUsers(data);
  };

  const selectedChangeHandler = (id) => {
    let data = filteredUsers.map((user) => {
      if (user.id === id) {
        return { ...user, selected: !user.selected };
      }
      return user;
    });
    setAllSelected(false);
    setFilteredUsers(data);
  };

  const updateHandler = (key, value) => {
    setSavedUser({ ...savedUser, [key]: value });
  };

  const editHandler = (id) => {
    let data = filteredUsers.map((user) => {
      if (user.id === id) {
        return { ...user, editStatus: true };
      }
      return user;
    });
    setFilteredUsers(data);
  };

  const closeHandler = (id) => {
    let data = filteredUsers.map((user) => {
      if (user.id === id) {
        return { ...user, editStatus: false };
      }
      return user;
    });
    setSavedUser({ name: "", email: "", role: "" });
    setFilteredUsers(data);
  };

  const saveHandler = (id) => {
    let data = filteredUsers.map((user) => {
      if (user.id === id) {
        return {
          id: user.id,
          name: savedUser.name ? savedUser.name : user.name,
          email: savedUser.email ? savedUser.email : user.email,
          role: savedUser.role ? savedUser.role : user.role,
          editStatus: false,
        };
      }
      return user;
    });
    setSavedUser({ name: "", email: "", role: "" });
    setFilteredUsers(data);
  };

  const deleteHandler = (id) => {
    let data = filteredUsers.filter((user) => user.id !== id);
    setFilteredUsers(data);
  };

  const onPageChangeHandler = (start, end) => {
    setCurrentPageUsers({
      startIndex: start,
      endIndex: end,
    });
    setAllSelected(false);
    let data = filteredUsers.map((user) => {
      return { ...user, selected: false };
    });
    setFilteredUsers(data);
  };

  const deleteSelectedHandler = () => {
    let data = filteredUsers.filter((val) => !val.selected);
    setFilteredUsers(data);
  };

  const updateUsers = (args) => {
    const searchKey = args?.target.value.toLowerCase();
    let data = [...usersData];
    if (searchKey) {
      data = data.filter((obj) =>
        Object.keys(obj).some((key) => {
          if (typeof obj[key] === "string") {
            return obj[key].toLowerCase().includes(searchKey);
          }
          return false;
        })
      );
      setRefresh(!refresh);
    }
    setFilteredUsers(data);
  };

  const debounce = function (fn, d) {
    let timerId;
    return function () {
      const context = this,
        args = arguments;
      clearTimeout(timerId);
      timerId = setTimeout(function () {
        fn.apply(context, args);
      }, d);
    };
  };

  const debounceSearch = debounce(updateUsers, DEBOUNCE_TIMEOUT);

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Search for users by name, email or role"
          onKeyUp={debounceSearch}
        ></input>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="userTable">
          <thead>
            <tr>
              <th>
                <input
                  checked={allSelected}
                  onChange={(e) => {
                    selectAllHandler(e);
                  }}
                  type="checkbox"
                ></input>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers
              .slice(
                currentPageUsers.startIndex,
                currentPageUsers.startIndex + 10
              )
              .map((user) => (
                <tr
                  key={user.id}
                  style={
                    user.selected ? { backgroundColor: "lightgrey" } : null
                  }
                >
                  <td>
                    <input
                      checked={user.selected}
                      onChange={() => {
                        selectedChangeHandler(user.id);
                      }}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <div
                      style={
                        user.editStatus ? { border: "1px solid black" } : null
                      }
                      contentEditable={user.editStatus}
                      onInput={(e) => {
                        updateHandler("name", e.target.value);
                      }}
                    >
                      {user.name}
                    </div>
                  </td>
                  <td>
                    <div
                      style={
                        user.editStatus ? { border: "1px solid black" } : null
                      }
                      contentEditable={user.editStatus}
                      onInput={(e) => {
                        updateHandler("email", e.target.value);
                      }}
                    >
                      {user.email}
                    </div>
                  </td>
                  <td>
                    <select
                      disabled={user.editStatus ? false : true}
                      defaultValue={user.role}
                      onChange={(e) => {
                        updateHandler("role", e.target.value);
                      }}
                    >
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                    </select>
                  </td>
                  <td>
                    {user.editStatus ? (
                      <>
                        <button onClick={() => saveHandler(user.id)}>
                          <FiSave />
                        </button>
                        <button onClick={() => closeHandler(user.id)}>
                          <IoClose />
                        </button>
                      </>
                    ) : (
                      <button onClick={() => editHandler(user.id)}>
                        <FiEdit />
                      </button>
                    )}
                    <button onClick={() => deleteHandler(user.id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex" }}>
        <button className="deleteBtn" onClick={deleteSelectedHandler}>
          Delete Selected
        </button>
        {filteredUsers.length > 0 && (
          <Paginate
            totalItems={filteredUsers.length}
            onPageChange={onPageChangeHandler}
            refresh={refresh}
          />
        )}
      </div>
    </div>
  );
}
