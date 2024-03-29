import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import CustomerModel from "../../../Models/CustomerModel";
import { LevelEnum } from "../../../Models/Enums";
import { removeAuthAction } from "../../../Redux/AuthState";
import store from "../../../Redux/Store";
import "./Header.css";

function Header(): JSX.Element {
  const history = useHistory();
  const [state, setState] = useState<CustomerModel>();
  const handleLogout = () => {
    store.dispatch(removeAuthAction());
    history.push("/login");
  };

  useEffect(()=>{
    setState(store.getState().AuthState.auth);
  },[])
  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      setState(store.getState().AuthState.auth);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  let hide = state?.level === undefined || state?.level === LevelEnum.NONE;
  console.log(state?.level);
  return (
    <div className="Header">
      <div>
        <h3>MENU SYSTEM</h3>
      </div>
      {!hide && (
        <div>
          <span>{state?.name}</span> {" "}<Button onClick={handleLogout}>LOGOUT</Button>
        </div>
      )}
    </div>
  );
}

export default Header;
