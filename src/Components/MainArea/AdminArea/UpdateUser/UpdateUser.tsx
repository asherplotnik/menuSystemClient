import "./UpdateUser.css";
import CustomerModel from "../../../../Models/CustomerModel";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { errorAlert } from "../../../../Services/errorService";
import globals from "../../../../Services/Globals";
import { LevelEnum } from "../../../../Models/Enums";
import BranchModel from "../../../../Models/BranchModel";
import { ChangeEvent, useEffect, useState } from "react";
import UserModel from "../../../../Models/UserModel";
import jwtAxios from "../../../../Services/jwtAxios";
function UpdateUser(): JSX.Element {
    let [users, setUsers] = useState<UserModel[]>([]);
    let [branches, setBranches] = useState<BranchModel[]>([]);
    let [disableField, setDisableField] = useState("")
    const {
      register,
      handleSubmit,
      formState: { errors }, setValue
    } = useForm<CustomerModel>();
    const getBranches = () => {
      jwtAxios
        .get(globals.urls.localUrl + "admin/getBranches")
        .then((response) => {
          setBranches(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      getBranches();
    }, []);
    
  const handleLevel = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === LevelEnum.CUSTOMER){
      setDisableField("customer")
    } else if (e.target.value === LevelEnum.ADMIN) {
       setDisableField("admin");
    } else {
      setDisableField("");
    }
  }

  const handleUser = (e:ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value === "-1"){
      setValue("name","");
      setValue("address","");
      setValue("phone","");
      setValue("level",LevelEnum.NONE);
      setValue("email","");
      setValue("branchId",-1);
      setValue("password","");
      return
    }
    const user = users.find(currentUser => currentUser.id === parseInt(e.target.value))
    setValue("level",user.level);
    setValue("name",user.name);
    setValue("address",user.address);
    setValue("phone",user.phone);
    setValue("level",user.level);
    setValue("email",user.email);
    const branch = branches.find(currentBranch => currentBranch?.id === user.branch?.id)
    setValue("branchId",branch?.id);
    if (user.level === LevelEnum.CUSTOMER){
      setValue("address"," ");
      setValue("phone"," ");
      setDisableField("customer")
    } else if (user.level === LevelEnum.ADMIN) {
       setValue("address"," ");
       setValue("phone"," ");
       setValue("branchId",-1);
       setDisableField("admin");
    } else {
      setDisableField("");
    }
  }
  
  const getUsers = () => {
    jwtAxios
      .get(globals.urls.localUrl + "admin/getUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  useEffect(() => {
    getUsers();
  },[]);

    const onSubmit = (data: CustomerModel) => {
      if (data.level === LevelEnum.NONE){
        alert("Choose Level");
        return
      }
      console.log(data.id)
      if (data.id.toString() === "-1"){
        alert("Choose User");
        return
      }
      if (!data.branchId){
        data.branchId=-1
      }
      jwtAxios
        .put<CustomerModel>(globals.urls.localUrl + "admin/updateUser/"+data.branchId, data)
        .then((response) => {
          console.log(response.data);
          alert("User updated.");
        })
        .catch((err) => {
          errorAlert(err);
        });
    };
    return (
      <div className="NewUser">
        <h3>Update User</h3>
        <div className="FormBranch">
        <Form.Group>
          <Form.Label>Select user:</Form.Label>
          <Form.Control 
          {...register("id")}
          name="id" as="select" onChange={handleUser}>
            <option key={-1} value={-1}>--choose one--</option>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.id}) {user.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                {...register("name", {
                  required: { value: true, message: "please enter name" },
                  minLength: {
                    value: 5,
                    message: "please enter longer name",
                  }
                })}
              />
              <span>{errors.name?.message}</span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Address:</Form.Label>
              <Form.Control
                as="textarea"
                disabled={disableField !== "customer"}
                {...register("address", {
                  required: { value: disableField === "customer", message: "please enter address" },
                  minLength: {value: disableField === "customer"?20:0,message: "please enter longer address"},
                })}
              />
              <span>{errors.address?.message}</span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                disabled={disableField !== "customer"}
                {...register("phone", {
                  required: { value: disableField === "customer", message: "please enter phone" },
                  minLength: {value: disableField === "customer"?9:0,message: "please enter longer phone number"},
                })}
              />
              <span>{errors.phone?.message}</span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Level:</Form.Label>
              <Form.Control
                as="select"
                {...register("level", {
                  required: { value: true, message: "please enter level" },
                })}
                onChange={handleLevel}
              >
                <option value={LevelEnum.NONE}>--Choose one--</option>
                <option value={LevelEnum.TABLE}>Table</option>
                <option value={LevelEnum.CUSTOMER}>Customer</option>
                <option value={LevelEnum.KITCHEN}>Kitchen</option>
                <option value={LevelEnum.SERVICE}>Service</option>
                <option value={LevelEnum.ADMIN}>Admin</option>
              </Form.Control>
              <span>{errors.level?.message}</span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Branch:</Form.Label>
              <Form.Control name="branchId" as="select"
                 disabled={disableField === "admin"}
                 {...register("branchId", {
                 required: { value: disableField !== "admin", message: "please enter branch" },
                })}>
                <option key={-1} value={-1}>--choose one--</option>
                {branches.map((branch) => {
                  return (
                    <option key={branch.id} value={branch.id}>
                      {branch.id}) {branch.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                {...register("email", {
                  required: { value: true, message: "please enter email" },
                })}
              />
              <span>{errors.email?.message}</span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                {...register("password", {
                  required: { value: true, message: "please enter password" },
                })}
              />
              <span>{errors.password?.message}</span>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
          <br />
        </div>
      </div>
    );
}

export default UpdateUser;
